import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "../axiosConfig"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import { orderReset, newOrder } from "../slices/orderSlice"

const options = {
  hidePostalCode: true,
  style: {
    base: {
      fontFamily: '"Rubik", sans-serif',
      fontSize: "12.5px",
    },
  },
}

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart)
  const { order_success, order_error, order_message } = useSelector(
    (state) => state.order
  )
  const { register, handleSubmit, reset } = useForm()
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  )

  useEffect(() => {
    if (order_success) {
      toast(order_message, { type: "success", autoClose: 2000 })
      reset()
      navigate("/orders")
    }
    if (order_error) toast(order_message, { type: "error", autoClose: 2000 })

    if (order_success || order_error) {
      dispatch(orderReset())
      setProcessing(false)
    }
  }, [
    order_message,
    order_success,
    order_error,
    dispatch,
    reset,
    navigate,
    setProcessing,
  ])

  async function paymentProcess(data) {
    if (!cartItems.length) return navigate("/cart")

    if (!stripe || !elements) return

    const billingDetails = {
      name: data.name,
      email: data.email,
      address: {
        city: data.city,
        line1: `${data.address1} ${data.address2}`,
        state: data.state,
        postal_code: data.post,
      },
    }

    try {
      setProcessing(true)
      const productIds = cartItems.map((item) => item._id)
      const { data: clientSecret } = await axios.post("/checkout", productIds)

      const cardElement = elements.getElement(CardElement)

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      })

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq.paymentMethod.id,
        })

      if (stripeError) {
        toast(stripeError.message, { type: "error", autoClose: 2000 })
        setProcessing(false)
      } else {
        if (paymentIntent.status === "succeeded") {
          const orderDetails = {
            paymentInfo: {
              paymentId: paymentIntent.id,
              paymentStatus: paymentIntent.status,
            },
            name: data.name,
            email: data.email,
            number: data.number,
            address: `flat no. ${data.address1}, street name ${data.address2} ${data.city} ${data.state} ${data.country} - ${data.post}`,
            orders: cartItems
              .map((item) => `${item.productName} (${item.quantity})`)
              .join(", "),
            cartProducts: cartItems,
            totalPrice,
            productIds,
          }

          dispatch(newOrder(orderDetails))
        } else {
          toast("Your payment was not successful, please try again.", {
            type: "error",
            autoClose: 2000,
          })
          setProcessing(false)
        }
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      toast(message, { type: "error", autoClose: 2000 })
      setProcessing(false)
    }
  }

  return (
    <section className="section p-10">
      <div className="wrapper max-w-screen-xl mx-auto">
        <div className="cartProducts flex flex-wrap gap-5 justify-center">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border-2 border-gray-800 border-solid rounded-lg py-2 px-5 font-medium text-gray-600 text-xl"
            >
              {item.productName}
              <span className="text-red-600">
                {" "}
                (${item.productPrice}/- x {item.quantity})
              </span>
            </div>
          ))}
        </div>

        <div className="total text-gray-600 font-medium text-3xl text-center py-8">
          grand total :<span className="text-red-500"> ${totalPrice}/ -</span>
        </div>

        <form
          className="bg-white w-[85rem] max-w-[100%] border-2 border-gray-700 border-solid rounded-lg p-4 mx-auto"
          onSubmit={handleSubmit(paymentProcess)}
        >
          <h1 className="rounded-lg py-4 bg-gray-800 uppercase text-white text-center text-3xl sm:text-4xl font-semibold">
            place your order
          </h1>

          <div className="fields grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="inputField">
              <label
                htmlFor="name"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                your name :
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                placeholder="enter your name"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="number"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                your number :
              </label>
              <input
                {...register("number", { required: true })}
                type="number"
                id="number"
                placeholder="enter your number"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="email"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                your email :
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="enter your email"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="address1"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                address line 01 :
              </label>
              <input
                {...register("address1", { required: true })}
                type="text"
                id="address1"
                placeholder="e.g. flat number"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="address2"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                address line 02 :
              </label>
              <input
                {...register("address2", { required: true })}
                type="text"
                id="address2"
                placeholder="e.g. street name"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="city"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                city :
              </label>
              <input
                {...register("city", { required: true })}
                type="text"
                id="city"
                placeholder="e.g. stockholm"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="state"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                state :
              </label>
              <input
                {...register("state", { required: true })}
                type="text"
                id="state"
                placeholder="e.g. tumba"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="country"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                country :
              </label>
              <input
                {...register("country", { required: true })}
                type="text"
                id="country"
                placeholder="e.g. Sweden"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div className="inputField">
              <label
                htmlFor="post"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                post address :
              </label>
              <input
                {...register("post", { required: true })}
                type="number"
                id="post"
                placeholder="e.g. 123456"
                className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="pay"
                className="text-gray-500 font-medium text-xl mb-2 inline-block"
              >
                payment :
              </label>
              <CardElement id="pay" options={options} />
            </div>
          </div>

          {processing ? (
            <Loader customCss="mb-4" />
          ) : (
            <input
              type="submit"
              value="Place Order"
              className="py-4 w-full bg-green-600 btn__style capitalize mt-4 cursor-pointer"
            />
          )}
        </form>
      </div>
    </section>
  )
}
