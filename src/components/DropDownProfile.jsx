// import { UserIcon,  LogOutIcon,  LayoutDashboard, ShoppingCart } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu'
// import { useDispatch } from 'react-redux'
// import { removeUser } from '@/user/userSlice'
// import { useNavigate } from 'react-router'



// const UserItems = [
//   {
//     icon: UserIcon,
//     property: 'Profile'
//   },
//   {
//     icon : ShoppingCart,
//     property : 'cart'
//   },
  
 
//   {
//     icon: LogOutIcon,
//     property: 'Sign Out'
//   }
// ]

// const adminItems = [
//   {
//     icon: UserIcon,
//     property: 'Profile'
//   },
 
//   {
//     icon: LayoutDashboard,
//     property:'admin-panel'
//   },
  
//   {
//     icon: LogOutIcon,
//     property: 'Sign Out'
//   }
// ]
// export default function DropDownProfile({user}) {
//   const dispatch = useDispatch();
//   const nav = useNavigate();
  
//   const listItems = user.role === 'user' ? UserItems : adminItems;

//   return (
//     <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
//             <img src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className='w-56'>
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuGroup>
//             {listItems.map((item, index) => {
//               const IconComponent = item.icon;
//               return (
//                 <DropdownMenuItem 
//                 onClick= {() => {
//                  switch(item.property){
//                   case 'Sign Out':
//                     dispatch(removeUser());
//                     break;
//                     case 'cart':
//                       nav('/checkout');
//                       break;
//                       case 'Profile':
//                       nav('profile/');
//                       break;
//                     case  'admin-panel':
//                       nav('/admin-panel');
//                       break;
//                  }

//                 }}
//                 key={index}>
//                   <IconComponent />
                  
//                   <span className='text-popover-foreground'>{item.property}</span>
//                 </DropdownMenuItem>
//               );
//             })}
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//   )
// } 






import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart, LayoutDashboard, LogOut, Settings, Package } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function DropDownProfile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
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
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt={user?.username} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user?.username)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || user?.username}@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
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
        <DropdownMenuSeparator />
        {isAdmin && (
          <>
            <DropdownMenuItem onClick={() => navigate('/admin')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}