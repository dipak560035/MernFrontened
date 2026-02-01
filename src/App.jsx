import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./index.css";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/common/ErrorBoundary";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <Toaster richColors />
    </div>
  );
}
