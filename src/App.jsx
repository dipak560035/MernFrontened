import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./index.css";
import { Toaster } from "sonner";
import FeatureStrip from "./components/common/FeatureStrip";



export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <FeatureStrip />
      <Footer />
      <Toaster richColors />
    </div>
  );
}
