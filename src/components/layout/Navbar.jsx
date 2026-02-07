import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useCartQuery } from "../../services/api";

import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm ${isActive ? "font-semibold" : "font-medium"} text-neutral-700 hover:text-black`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  const user = useSelector((s) => s.auth.user);
  const localCount = useSelector((s) =>
    s.cart.items.reduce((n, i) => n + (i.qty || 1), 0)
  );
  const { data: remoteCart } = useCartQuery(undefined, { skip: !token });
  const cartCount = token && remoteCart?.data?.items
    ? remoteCart.data.items.reduce((n, i) => n + (i.qty || 1), 0)
    : localCount;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/account");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-dark" />
            <span className="text-lg font-semibold">HEAVEN CRAFT</span>
          </Link>

          {/* Main Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavItem to="/" label="Home" />
            <NavItem to="/shop" label="Shop" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />

            {/* Admin link */}
            {token && role === "admin" && <NavItem to="/admin" label="Admin" />}
          </nav>

          {/* Icons + Account */}
          <div className="flex items-center gap-4 relative">
            <button className="rounded-full p-2 hover:bg-neutral-100">
               <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" aria-label="Wishlist" className="rounded-full p-2 hover:bg-neutral-100">
              <Heart className="h-6 w-6" />
            </Link>

            {/* Cart */}
            <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-neutral-100">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 rounded-full p-2 hover:bg-neutral-100"
                >
                  {user?.avatar ? (
                      <img 
                          src={`${BASE_URL}${user.avatar}`} 
                          alt="Avatar" 
                          className="h-8 w-8 rounded-full object-cover border" 
                      />
                  ) : (
                      <User className="h-6 w-6" />
                  )}
                  <span className="hidden md:inline text-sm font-medium ml-1">{user?.name || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg py-2 z-50">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                     
                    {role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {role === "admin" && (
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Manage Orders
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/account" aria-label="Account" className="rounded-full p-2 hover:bg-neutral-100">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
