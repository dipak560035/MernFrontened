import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly = false }) {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  if (!user || !token) return <Navigate to="/login" replace />;

  if (adminOnly && user?.role !== "admin") return <Navigate to="/" replace />;

  return children;
}