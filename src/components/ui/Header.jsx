
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import DropDownProfile from './DropDownProfile';

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  console.log(user);

  return (
    <div className="bg-gray-200 px-5 flex justify-between items-center py-2">
      
      {/* Brand */}
      <h1 className="text-[30px] font-bold">Shopal</h1>

      {/* Right Side: Show Dropdown OR Login/Signup */}
      {user ? (<DropDownProfile user={user} />) : (
        <div className="space-x-5">
          <NavLink to="/login">
            <Button variant="link" className="text-[16px]">Login</Button>
          </NavLink>

          <NavLink to="/signup">
            <Button>Sign Up</Button>
          </NavLink>
        </div>
      )}

    </div>
  );
}


