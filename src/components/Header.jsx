
// import { Button } from '@/components/ui/button'
// import { NavLink } from 'react-router'
// import { useSelector } from 'react-redux'
// import DropDownProfile from './DropDownProfile';

// export default function Header() {
//   const { user } = useSelector((state) => state.userSlice);
//   console.log(user);

//   return (
//     <div className="bg-gray-200 px-5 flex justify-between items-center py-2">
      
//       {/* Brand */}
//       <h1 className="text-[30px] font-bold">Shopal</h1>

//       {/* Right Side: Show Dropdown OR Login/Signup */}
//       {user ? (<DropDownProfile user={user} />) : (
//         <div className="space-x-5">
//           <NavLink to="/login">
//             <Button variant="link" className="text-[16px]">Login</Button>
//           </NavLink>

//           <NavLink to="/signup">
//             <Button>Sign Up</Button>
//           </NavLink>
//         </div>
//       )}

//     </div>
//   );
// }





import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingCart, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { fetchProducts } from '../redux/slices/productSlice';
import { useState } from 'react';
import DropDownProfile from '@/components/DropDownProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ search }));
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Shopal
              </h1>
              <span className="text-xs text-muted-foreground hidden sm:block">Premium Shopping</span>
            </div>
          </NavLink>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products, brands, and more..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-10 pr-4 h-10 w-full rounded-full border-border focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            {user && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  0
                </span>
                <span className="sr-only">Shopping cart</span>
              </Button>
            )}

            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => {/* Mobile search modal */}}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* User Dropdown or Login/Signup */}
            {user ? (
              <DropDownProfile user={user} />
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button className="hidden sm:inline-flex">
                    Sign Up
                  </Button>
                </NavLink>
                {/* Mobile Menu */}
                <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="sm:hidden">
                      {mobileMenuOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 sm:hidden">
                    <DropdownMenuItem onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-10 h-10 rounded-full"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}