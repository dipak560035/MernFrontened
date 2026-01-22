import { Link, NavLink } from "react-router-dom";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

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
  const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + (i.qty || 1), 0));
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-dark" />
            <span className="text-lg font-semibold">Meubel House</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <NavItem to="/" label="Home" />
            <NavItem to="/shop" label="Shop" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />
          </nav>
          <div className="flex items-center gap-4">
            <Search className="h-20 w-20 p-5 rounded-full hover:bg-neutral-100" />
            <Link to="/account" aria-label="Account">
              <User className="h-20 w-20 p-5 rounded-full hover:bg-neutral-100" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart className="h-20 w-20 p-5 rounded-full hover:bg-neutral-100" />
            </Link>
            <Link to="/cart" aria-label="Cart">
              <ShoppingCart className="h-20 w-20 p-5 rounded-full hover:bg-neutral-100" />
              {cartCount > 0 && (
                <span className="absolute right-2 top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
