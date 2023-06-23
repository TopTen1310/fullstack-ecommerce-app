import { Link, useNavigate } from "react-router-dom"
import { UserIcon, MenuIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"

const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe"

export default function MainHeader({ user }) {
  const [showUser, setShowUser] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function logoutUser() {
    dispatch(logout())
  }

  return (
    <header className="header py-6 px-10 bg-white shadow-md sticky top-0 left-0 z-50">
      <div className="wrapper relative max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/">
          <h2 className="text-gray-600 text-3xl font-normal cursor-pointer">
            Admin<span className="text-green-500">Panel</span>
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
            onPointerDown={() => navigate("/products")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            products
          </button>
          <button
            onPointerDown={() => navigate("/orders")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            orders
          </button>
          <button
            onPointerDown={() => navigate("/users")}
            className="navBtn__style sm:mb-0 mb-3"
          >
            users
          </button>
          <button
            onPointerDown={() => navigate("/messages")}
            className="navBtn__style"
          >
            messages
          </button>
        </nav>

        <div className="icons flex gap-4 items-center">
          {user && (
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
                  className="w-full bg-green-500 btn__style py-4 mb-4"
                >
                  Update Profile
                </button>
                <button
                  className="w-full bg-red-500 btn__style py-4"
                  onPointerDown={logoutUser}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          <MenuIcon
            onBlur={() => setShowMenu(false)}
            tabIndex={1}
            onClick={() => setShowMenu((state) => !state)}
            className="w-9 h-9 fill-gray-500 cursor-pointer hover:fill-green-500 transition-colors sm:hidden"
          />
        </div>
      </div>
    </header>
  )
}
