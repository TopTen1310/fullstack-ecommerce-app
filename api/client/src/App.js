import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import { useSelector } from 'react-redux'
import Protected from './pages/Protected';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function App() {
  const { user } = useSelector(state => state.auth)

  return (
    <div className="app min-h-screen flex flex-col">
      <Router>

        <Routes>

          <Route path="register" element={<Register user={user} />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:slug" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<Search />} />
            <Route
              path="orders"
              element={
                <Protected user={user}>
                  <Orders />
                </Protected>
              }
            />
            <Route
              path="checkout"
              element={
                <Protected user={user}>
                  <Checkout />
                </Protected>
              }
            />
            <Route
              path="wishlist"
              element={
                <Protected user={user}>
                  <Wishlist />
                </Protected>
              }
            />
            <Route
              path="profile"
              element={
                <Protected user={user}>
                  <Profile user={user} />
                </Protected>
              }
            />
            <Route
              path="cart"
              element={
                <Protected user={user}>
                  <Cart user={user} />
                </Protected>
              }
            />
          </Route>

        </Routes>

      </Router>

      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}

export default App;
