import { useState, useRef, useEffect } from "react";
import UserImage from "/profile-fallback.png";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, LogOut, User } from "lucide-react";
import { clearAllCookies } from "@/utils/cookie";
import { PATH } from "@/constant/path";
import { showSuccessMessage } from "@/utils/toast";
import useLogout from "../hooks/useLogout";

interface IProfileSectionProps {
  name: string;
  email: string;
}

const ProfileSection: React.FC<IProfileSectionProps> = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearAllCookies();
    logout();
    navigate(PATH.auth.login, { replace: true });
    showSuccessMessage("Logout Successfully");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 bg-white shadow-sm hover:shadow-md px-3 py-1.5 border border-gray-200 rounded-full transition-all duration-200 cursor-pointer select-none"
        onClick={toggleDropdown}
      >
        <div className="relative flex justify-center items-center bg-gray-100 rounded-xl w-8 h-8 overflow-hidden">
          <img
            src={UserImage}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col max-w-35 truncate">
          <span className="font-semibold text-gray-800 text-sm truncate">
            {name}
          </span>
          <span className="text-[9px] text-gray-400 truncate">{email}</span>
        </div>

        <div className="flex justify-center items-center hover:bg-gray-100 rounded-full w-8 h-8 transition-colors">
          <ChevronDownIcon
            size={16}
            className={`text-primary-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded-lg w-56 overflow-hidden animate-fade-in">
          <div className="bg-gray-50 px-4 py-3 border-gray-200 border-b">
            <p className="mb-1 text-gray-500 text-xs">Welcome,</p>
            <p className="font-semibold text-gray-800 text-sm truncate">
              {name}
            </p>
          </div>

          <div className="flex flex-col py-2">
            <Link
              to={PATH.auth.changePassword}
              className="flex items-center gap-3 hover:bg-gray-50 px-4 py-2.5 text-gray-700 text-sm transition-colors"
            >
              <User className="w-4 h-4 text-secondary-500" />
              Account Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 hover:bg-red-50 px-4 py-2.5 text-red-500 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
