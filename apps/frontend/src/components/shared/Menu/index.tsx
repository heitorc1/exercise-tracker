import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";

const Menu = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between w-full p-8 ">
      <div className="flex space-x-10 mt-1">
        <LinkMenu name="Dashboard" to="/dashboard" />
        <LinkMenu name="Exercises" to="/exercises" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

type LinkMenuProps = {
  name: string;
  to: string;
};

const LinkMenu = ({ name, to }: LinkMenuProps) => (
  <div className="text-gray-100 font-extrabold text-lg">
    <Link to={to}>{name}</Link>
  </div>
);

export default Menu;
