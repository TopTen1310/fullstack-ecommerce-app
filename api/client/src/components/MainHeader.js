import { Link, useNavigate } from "react-router-dom"
import {
  UserIcon,
  SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  MenuIcon,
} from "@heroicons/react/solid"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { wishProducts } from "../slices/wishSlice"
import { allProducts } from "../slices/productSlice"
import { allCategories } from "../slices/categorySlice"
import { cartProducts } from "../slices/cartSlice"
import { allOrders } from "../slices/orderSlice"

const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe"

export default function MainHeader({ user }) {
  const [showUser, setShowUser] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { wishlist } = useSelector((state) => state.wishList)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(wishProducts())
      dispatch(cartProducts())
      dispatch(allOrders())
    }
    dispatch(allProducts())
    dispatch(allCategories())
  }, [dispatch])

  function logoutUser() {
    dispatch(logout())
  }

  return (
    <header className="header py-6 px-10 bg-white shadow-md sticky top-0 left-0 z-50">
      <div className="wrapper relative max-w-screen-xl mx-auto flex justify-between flex-col gap-4 sm:gap-0 sm:flex-row items-center">
        <Link to="/">
          <h2 className="text-gray-600 text-3xl font-normal cursor-pointer">
            Groco<span className="text-green-500">.</span>
          </h2>
        </Link>

        <nav
          className={`nav__style ${
            showMenu ? "block sm:hidden" : "hidden sm:block"
          }`}
        >
          <button
            onPointerDown={() => navigate("/")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            home
          </button>
          <button
            onPointerDown={() => navigate("/shop")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            shop
          </button>
          <button
            onPointerDown={() => navigate("/orders")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            orders
          </button>
          <button
            onPointerDown={() => navigate("/about")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            about
          </button>
          <button
            onPointerDown={() => navigate("/contact")}
            className="navBtn__style"
          >
            contact
          </button>
        </nav>

        <div className="icons flex gap-4 items-center">
          <MenuIcon
            onBlur={() => setShowMenu(false)}
            tabIndex={1}
            onClick={() => setShowMenu((state) => !state)}
            className="w-9 h-9 fill-gray-500 cursor-pointer hover:fill-green-500 transition-colors sm:hidden"
          />

          <Link to="/search">
            <SearchIcon className="w-9 h-9 fill-gray-500 cursor-pointer hover:fill-green-500 transition-colors" />
          </Link>
          {user ? (
            <>
              <div className="relative">
                <UserIcon
                  onBlur={() => setShowUser(false)}
                  tabIndex={1}
                  onClick={() => setShowUser((state) => !state)}
                  className="w-9 h-9 fill-gray-500 cursor-pointer hover:fill-green-500 transition-colors"
                />
                <div
                  className={`${
                    showUser ? "block" : "hidden"
                  } userProfile w-[26rem] bg-white p-6 absolute top-full -right-10 border-2 border-gray-600 border-solid rounded-xl overflow-hidden`}
                >
                  <img
                    src={user.image ? user.image : defaultImage}
                    alt=""
                    className="userAvatar w-40 h-40 rounded-full object-cover mx-auto"
                  />
                  <h3 className="text-2xl text-gray-500 font-normal text-center py-4">
                    {user.name}
                  </h3>
                  <button
                    onPointerDown={() => navigate("/profile")}
                    className="w-full bg-green-500 btn__style mb-4"
                  >
                    Update Profile
                  </button>
                  <button
                    className="w-full bg-red-500 btn__style"
                    onPointerDown={logoutUser}
                  >
                    Log Out
                  </button>
                </div>
              </div>
              <Link to="/wishlist">
                <div className="flex text-xl text-gray-500 items-end group hover:text-green-500 transition-all cursor-pointer">
                  <HeartIcon className="w-9 h-9 fill-gray-500 group-hover:fill-green-500 transition-all" />
                  (
                  <span className="text-gray-500 group-hover:text-green-500 transition-all">
                    {wishlist.length}
                  </span>
                  )
                </div>
              </Link>
              <Link to="/cart">
                <div className="flex text-xl text-gray-500 items-end group hover:text-green-500 transition-all cursor-pointer">
                  <ShoppingCartIcon className="w-9 h-9 fill-gray-500 group-hover:fill-green-500 transition-all" />
                  (
                  <span className="text-gray-500 group-hover:text-green-500 transition-all">
                    {cartItems.length}
                  </span>
                  )
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="px-6 btn__style bg-green-500">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
