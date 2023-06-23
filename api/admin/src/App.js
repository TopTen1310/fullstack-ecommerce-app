import { useEffect } from "react"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import { useSelector, useDispatch } from "react-redux"
import Protected from "./pages/Protected"
import { allOrders } from "./slices/orderSlice"
import { allUsers } from "./slices/userSlice"
import { usersMessages } from "./slices/messageSlice"
import { allProducts } from "./slices/productSlice"
import { allCategories } from "./slices/categorySlice"
import Orders from "./pages/Orders"
import Users from "./pages/Users"
import Messages from "./pages/Messages"
import Products from "./pages/Products"
import Update from "./pages/Update"
import Profile from "./pages/Profile"

function App() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(allOrders())
      dispatch(allUsers())
      dispatch(usersMessages())
      dispatch(allProducts())
      dispatch(allCategories())
    }
  }, [user, dispatch])

  return (
    <div className="App">
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout user={user} />}>
            <Route
              index
              element={
                <Protected user={user}>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="orders"
              element={
                <Protected user={user}>
                  <Orders />
                </Protected>
              }
            />
            <Route
              path="users"
              element={
                <Protected user={user}>
                  <Users />
                </Protected>
              }
            />
            <Route
              path="messages"
              element={
                <Protected user={user}>
                  <Messages />
                </Protected>
              }
            />
            <Route
              path="products"
              element={
                <Protected user={user}>
                  <Products />
                </Protected>
              }
            />
            <Route
              path="products/:slug"
              element={
                <Protected user={user}>
                  <Update />
                </Protected>
              }
            />
            <Route
              path="profile"
              element={
                <Protected user={user}>
                  <Profile />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </Router>

      <ToastContainer position="top-right" newestOnTop />
    </div>
  )
}

export default App
