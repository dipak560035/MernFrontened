import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, admin = false }) {
  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  if (!token) return <Navigate to="/account" replace />;
  if (admin && role !== "admin") return <Navigate to="/" replace />;
  return children;
}
