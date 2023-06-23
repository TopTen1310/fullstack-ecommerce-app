import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import axios from "./axiosConfig"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

;(async () => {
  const res = await axios.get("/publishableKey")
  const stripePromise = loadStripe(res.data.key)

  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
    // </React.StrictMode>
  )
})()
