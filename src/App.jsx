

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Settings from "./pages/Settings";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

// Components
import PrivateRoute from "./components/PrivateRoute";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      {/* Header always visible */}
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected routes for logged-in users */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        Admin routes
        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
   

        {/* Admin routes */}
<Route
  path="/admin/dashboard"
  element={
    <PrivateRoute adminOnly>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/admin/add"
  element={
    <PrivateRoute adminOnly>
      <AddProduct />
    </PrivateRoute>
  }
/>
<Route
  path="/admin/edit/:id"
  element={
    <PrivateRoute adminOnly>
      <EditProduct />
    </PrivateRoute>
  }
/>


        {/* Fallback for unknown routes */}
        <Route
          path="*"
          element={
            <div className="container mx-auto p-6 text-center">
              <h1 className="text-3xl font-bold">404 - Not Found</h1>
              <p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
















