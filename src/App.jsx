// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "./components/ui/RootLayout";
// import Home from "./features/home/Home";

// import Login from "./features/authentication/Login";
// import Register from "./features/authentication/Register";

// import AdminPanel from "./features/admin/AdminPanel";
// import ProductAddForm from "./features/admin/ProductAddForm";
// import ProductEdit from "./features/admin/ProductEdit";
// import ProductDetail from "./features/products/ProductDetail";
// import CheckOut from "./features/carts/CheckOut";

// import UserProfile from "./features/profile/UserProfile";
// import Order from "./features/orders/Order";

// export default function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       children: [
//         {
//           index: true,
//           element: <Home />,
//         },
//         {
//           path: 'login',
//           element:<Login />
//         },
//         {
//           path:'signup',
//           element:<Register />
//         },
//         {
//           path:'profile',
//           element:<UserProfile />
//         },
//         {
//           path:'order/:id',
//           element:<Order />
//         },
//         {
//           path:'admin-panel',
//           element:<AdminPanel />
//         },
        
//         {
//           path:'products/:id',
//           element: <ProductDetail/>
//         },
//         {
//           path:'product-edit/:id',
//           element:<ProductEdit />
//         },
//         {
//           path:'product-add',
//           element:<ProductAddForm />
//         },
//          {
//           path:'checkout',
//           element:<CheckOut />
//         }

//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;