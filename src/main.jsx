
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Account from "./pages/Account.jsx";
import Checkout from "./pages/Checkout.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Blog from "./pages/Blog.jsx";
import Protected from "./routes/Protected.jsx";
import store from "./store";
import "./index.css";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import { Scroll } from "lucide-react";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route element={<App />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            
<Route path="admin" element={<Protected admin><Admin /></Protected>} />
<Route path="admin/add" element={<Protected admin><AddProduct /></Protected>} />
<Route path="admin/edit/:id" element={<Protected admin><EditProduct /></Protected>} />
<Route path="admin/orders" element={<Protected admin><AdminOrders /></Protected>} />

            {/* user protected routes */}
            <Route
              path="cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
            <Route
              path="checkout"
              element={
                <Protected>
                  <Checkout />
                </Protected>
              }
            />
            <Route
              path="orders"
              element={
                <Protected>
                  <Orders />
                </Protected>
              }
            />

            <Route
              path="orders/:id"
              element={
                <Protected>
                  <OrderDetails />
                </Protected>
              }
            />
            <Route
              path="wishlist"
              element={
                <Protected>
                  <Wishlist />
                </Protected>
              }
            />

            {/* admin protected routes */}
            <Route
              path="admin/*"
              element={
                <Protected admin>
                  <Admin />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
