
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Search,
//   ShoppingCart,
//   Menu,
//   X,
//   LogIn,
//   UserPlus,
// } from "lucide-react";
// import { useState } from "react";
// import DropDownProfile from "@/components/DropDownProfile";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { removeUser } from "@/redux/slices/userSlice";

// export default function Header() {
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   // const handleSearch = (e) => {
//   //   e.preventDefault();
//   //   navigate(`/?search=${search}`);
//   // };
// const handleSearch = (e) => {
//   e.preventDefault();
//   if (!search.trim()) return;  // avoid empty search
//   navigate(`/products?search=${encodeURIComponent(search.trim())}`);
//   setSearch('');  // optional: clear input after submit
// };
//   // const handleLogout = () => {
//   //   dispatch(removeUser());
//   //   navigate("/");
//   // };



//   const handleLogout = () => {
//   // 1️⃣ Clear Redux
//   dispatch(removeUser());

//   // 2️⃣ Extra safeguard: remove user & token directly
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");

//   // 3️⃣ Redirect
//   navigate("/");
// };



  

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
          
//           {/* Brand */}
//           <NavLink to="/" className="flex items-center space-x-2 group">
//             <div className="flex flex-col">
//               <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//                 NepalStore
//               </h1>
//               <span className="text-xs text-muted-foreground hidden sm:block">
//                 Premium Online Shopping
//               </span>
//             </div>
//           </NavLink>

//           {/* Desktop Nav Links */}
//           <nav className="hidden lg:flex items-center space-x-6 ml-10">
//             <NavLink to="/" className="text-sm hover:text-primary transition">Home</NavLink>
//             <NavLink to="/products" className="text-sm hover:text-primary transition">Products</NavLink>
//             {user?.role === "admin" && (
//               <NavLink to="/admin/dashboard" className="text-sm hover:text-primary transition">
//                 Admin Dashboard
//               </NavLink>
//             )}
//             <NavLink to="/contact" className="text-sm hover:text-primary transition">Contact</NavLink>
//           </nav>

//           {/* Desktop Search */}
//           <form
//             onSubmit={handleSearch}
//             className="hidden md:flex flex-1 max-w-md mx-6"
//           >
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search for products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 h-10 rounded-full"
//               />
//             </div>
//           </form>

//           {/* Right Actions */}
//           <div className="flex items-center space-x-2">

//             {/* Cart */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate("/cart")}
//               className="relative"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               <span className="absolute -top-1 -right-1 text-[10px] h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
//                 0
//               </span>
//             </Button>


//             {user ? (
//   <>
//     {/* Admin Dashboard Button (Admin Only) */}
//     {user.role === "admin" && (
//       <Button
//         variant="ghost"
//         size="sm"
//         className="hidden sm:inline-flex"
//         onClick={() => navigate("/admin/dashboard")}
//       >
//         Admin Panel
//       </Button>
//     )}

//     {/* Profile Dropdown for both User & Admin */}
//     <DropDownProfile user={user} onLogout={handleLogout} />
//   </>
// ) : (
//   <div className="hidden sm:flex items-center gap-2">
//     <NavLink to="/login">
//       <Button variant="ghost" size="sm">Login</Button>
//     </NavLink>
//     <NavLink to="/signup">
//       <Button size="sm">Sign Up</Button>
//     </NavLink>
//   </div>
// )}


//             {/* Mobile Menu */}
//             <div className="flex items-center lg:hidden">
//               <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
                  
//                   <DropdownMenuItem onClick={() => navigate("/")}>Home</DropdownMenuItem>
                  
//                   <DropdownMenuItem onClick={() => navigate("/products")}>Products</DropdownMenuItem>
                  
//                   {user?.role === "admin" && (
//                     <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
//                       Admin Dashboard
//                     </DropdownMenuItem>
//                   )}
                  
//                   <DropdownMenuItem onClick={() => navigate("/contact")}>Contact</DropdownMenuItem>

//                   {!user ? (
//                     <>
//                       <DropdownMenuItem onClick={() => navigate("/login")}>
//                         <LogIn className="mr-2 h-4 w-4" /> Login
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => navigate("/signup")}>
//                         <UserPlus className="mr-2 h-4 w-4" /> Sign Up
//                       </DropdownMenuItem>
//                     </>
//                   ) : (
//                     <DropdownMenuItem onClick={handleLogout} className="text-red-600">
//                       Logout
//                     </DropdownMenuItem>
//                   )}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>

//             {/* Mobile Search */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
//             >
//               <Search className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Search Input */}
//         {mobileSearchOpen && (
//           <div className="pb-4 md:hidden">
//             <form onSubmit={handleSearch}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 <Input
//                   placeholder="Search..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-10 h-10 rounded-full"
//                 />
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

























































import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import DropDownProfile from "@/components/DropDownProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { removeUser } from "@/redux/slices/userSlice";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;  // ignore empty

    // Check if it's a MongoDB ObjectID format (24 hex chars) for exact product ID match
    if (/^[0-9a-fA-F]{24}$/.test(trimmed)) {
      navigate(`/product/${trimmed}`);  // Go directly to product details
    } else {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);  // Fuzzy/related search on products page
    }
    setSearch('');  // Clear input
  };

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                NepalStore
              </h1>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Premium Online Shopping
              </span>
            </div>
          </NavLink>
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 ml-10">
            <NavLink to="/" className="text-sm hover:text-primary transition">Home</NavLink>
            <NavLink to="/products" className="text-sm hover:text-primary transition">Products</NavLink>
            {user?.role === "admin" && (
              <NavLink to="/admin/dashboard" className="text-sm hover:text-primary transition">
                Admin Dashboard
              </NavLink>
            )}
            <NavLink to="/contact" className="text-sm hover:text-primary transition">Contact</NavLink>
          </nav>
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-full"
              />
            </div>
          </form>
          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 text-[10px] h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                0
              </span>
            </Button>
            {user ? (
              <>
                {/* Admin Dashboard Button (Admin Only) */}
                {user.role === "admin" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Admin Panel
                  </Button>
                )}
                {/* Profile Dropdown for both User & Admin */}
                <DropDownProfile user={user} onLogout={handleLogout} />
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button size="sm">Sign Up</Button>
                </NavLink>
              </div>
            )}
            {/* Mobile Menu */}
            <div className="flex items-center lg:hidden">
              <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/")}>Home</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/products")}>Products</DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/contact")}>Contact</DropdownMenuItem>
                  {!user ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/login")}>
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/signup")}>
                        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Mobile Search Input */}
        {mobileSearchOpen && (
          <div className="pb-4 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 rounded-full"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}















