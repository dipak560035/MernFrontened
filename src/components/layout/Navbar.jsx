
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useCartQuery } from "../../services/api";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { clearCart } from "../../store/slices/cartSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm ${
          isActive ? "font-semibold" : "font-medium"
        } text-neutral-700 hover:text-black`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  const user = useSelector((s) => s.auth.user);

  const localCount = useSelector((s) =>
    s.cart.items.reduce((n, i) => n + (i.qty || 1), 0)
  );

  const { data: remoteCart } = useCartQuery(undefined, { skip: !token });

  const cartCount =
    token && remoteCart?.data?.items
      ? remoteCart.data.items.reduce((n, i) => n + (i.qty || 1), 0)
      : localCount;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQ, setNavQ] = useState("");

  const dropdownRef = useRef();

  // ✅ CLOSE MENU ON ROUTE CHANGE
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // ✅ LOCK BODY SCROLL WHEN MOBILE MENU OPEN
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  // ✅ CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/account");
  };

  const submitSearch = () => {
    const q = navQ.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}&page=1`);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-light backdrop-blur border-b">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-4 shrink-0">
            <div className="h-9 w-9 rounded-sm bg-brand-dark" />
            <span className="text-xl font-bold tracking-[0.15em] uppercase">
              HEAVEN <span className="font-light">CRAFT</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem to="/" label="Home" />
            <NavItem to="/shop" label="Shop" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />
            {token && role === "admin" && <NavItem to="/admin" label="Admin" />}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* SEARCH DESKTOP */}
            <div className="hidden md:flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1">
              <Search className="h-5 w-5 text-neutral-600" />
              <input
                value={navQ}
                onChange={(e) => setNavQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search…"
                className="h-8 w-40 bg-transparent text-sm outline-none"
              />
            </div>

            {/* WISHLIST */}
            <Link to="/wishlist" className="rounded-full p-3 md:p-2 hover:bg-neutral-100">
              <Heart className="h-6 w-6" />
            </Link>

            {/* CART */}
            <Link to="/cart" className="relative rounded-full p-3 md:p-2 hover:bg-neutral-100">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-full p-3 md:p-2 hover:bg-neutral-100"
                >
                  {user?.avatar ? (
                    <img
                      src={`${BASE_URL}${user.avatar}`}
                      className="h-8 w-8 rounded-full object-cover border"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg py-2">
                    <Link to="/account" className="block px-4 py-2 hover:bg-neutral-100">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-neutral-100">Orders</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-neutral-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/account" className="rounded-full p-2 hover:bg-neutral-100">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden rounded-full p-3 hover:bg-neutral-100"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen
              ? "max-h-[420px] opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="pb-4">
            <div className="grid gap-3 rounded-lg border bg-white p-4 shadow-lg">

              <NavLink to="/" className="font-medium">Home</NavLink>
              <NavLink to="/shop" className="font-medium">Shop</NavLink>
              <NavLink to="/about" className="font-medium">About</NavLink>
              <NavLink to="/contact" className="font-medium">Contact</NavLink>

              {/* SEARCH MOBILE */}
              <div className="flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-2">
                <Search className="h-5 w-5 text-neutral-600" />
                <input
                  value={navQ}
                  onChange={(e) => setNavQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
