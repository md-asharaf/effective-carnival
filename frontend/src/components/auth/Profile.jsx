import { useRef, useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, LayoutDashboard } from "lucide-react"
import useAuthStore from "@/store/authSlice.js" // Assuming this is your store import

function Profile() {
    const [open, setOpen] = useState(false)
    const popoverRef = useRef(null)
    const buttonRef = useRef(null)

    const { user, logout } = useAuthStore()

    const togglePopup = () => {
        setOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popoverRef.current && !popoverRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Return null or a login button if the user is not authenticated
    if (!user) {
        return null;
    }

    const getInitials = (name = "") => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                onClick={togglePopup}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <Avatar>
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
            </button>

            <div
                ref={popoverRef}
                className={`absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out
                            ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="truncate">
                        <div className="font-semibold text-gray-800 truncate">{user.fullName}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                    </div>
                </div>

                <div className="border-t border-gray-100">
                    <ul className="py-2 text-gray-700">
                        <li>
                            <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                <User className="mr-3 h-5 w-5 text-gray-400" />
                                <span>Manage Account</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400" />
                                <span>Host Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="border-t border-gray-100">
                    <ul className="py-2 text-gray-700">
                        <li>
                            <button onClick={logout} className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                                <span>Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;