import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./index.css";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors />
    </div>
  );
}
