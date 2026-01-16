

// import { useNavigate } from 'react-router-dom';
// import { User, ShoppingCart, LayoutDashboard, LogOut, Settings, Package } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuGroup,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Button } from './ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { useDispatch } from 'react-redux';
// import { removeUser } from '@/redux/slices/userSlice'; // ✅ use userSlice

// export default function DropDownProfile({ user, onLogout }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAdmin = user?.role === 'admin';

//   // Use onLogout from Header if passed, otherwise fallback
//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//       return;
//     }

//     // Fallback: clear user slice & localStorage
//     dispatch(removeUser());
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const getInitials = (username) => {
//     return username?.charAt(0).toUpperCase() || 'U';
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//           <Avatar className="h-10 w-10">
//             <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt={user?.username} />
//             <AvatarFallback className="bg-primary text-primary-foreground">
//               {getInitials(user?.username)}
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
//             <p className="text-xs leading-none text-muted-foreground">
//               {user?.email || `${user?.username}@example.com`}
//             </p>
//           </div>
//         </DropdownMenuLabel>

//         <DropdownMenuSeparator />

//         <DropdownMenuGroup>
//           <DropdownMenuItem onClick={() => navigate('/profile')}>
//             <User className="mr-2 h-4 w-4" />
//             <span>Profile</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => navigate('/cart')}>
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             <span>My Cart</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => navigate('/orders')}>
//             <Package className="mr-2 h-4 w-4" />
//             <span>My Orders</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => navigate('/settings')}>
//             <Settings className="mr-2 h-4 w-4" />
//             <span>Settings</span>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>

//         {isAdmin && (
//           <>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => navigate('/admin')}>
//               <LayoutDashboard className="mr-2 h-4 w-4" />
//               <span>Admin Dashboard</span>
//             </DropdownMenuItem>
//           </>
//         )}

//         <DropdownMenuSeparator />

//         {/* Logout */}
//         <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
//           <LogOut className="mr-2 h-4 w-4" />
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }




import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart, LayoutDashboard, LogOut, Settings, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/redux/slices/userSlice'; // ✅ use userSlice

export default function DropDownProfile({ user, onLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    // Fallback: clear user slice & localStorage
    dispatch(removeUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const getInitials = (username) => {
    return username?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
              alt={user?.username}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user?.username)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* User Info */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || `${user?.username}@example.com`}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        {isAdmin ? (
          // Admin Menu Only
          <>
            <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </>
        ) : (
          // Normal User Menu
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/cart')}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Cart</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/orders')}>
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



