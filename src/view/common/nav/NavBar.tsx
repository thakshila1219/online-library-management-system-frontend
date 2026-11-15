import {Link, useNavigate} from "react-router-dom";
import navLogo from "../../../assets/logo/icon-library.png"
import {useEffect, useState} from "react";

export function NavBar() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, [])

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, [])

    const userNavigation = [
        {name: 'Books', to: '/products'},
        {name: 'Borrowed Items', to: '/borrowed'},
        {name: 'About us', to: '/about'},
        {name: 'Contact us', to: '/contact'},
    ]

    const adminNavigation = [
        {name: 'All Products', to: '/products'},
        {name: 'Add Products', to: '/admin/products'},
        {name: 'Borrowed List', to: '/admin/all_borrowed'},
        {name: 'System users', to: '/admin/users'},
        {name: 'Requests', to: '/admin/requests'},
    ]

    const navigation = role === "ADMIN" ? adminNavigation : userNavigation;

    return (
        <header className="relative inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5 flex flex-row items-center">
                        <img
                            alt="logo"
                            src={navLogo}
                            className="h-12 w-12 bg-zinc-500 p-2 rounded-full"
                        />
                        <span className="ml-3 text-xl font-semibold text-gray-900">Online Library</span>
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.to} className="text-sm/6 font-semibold text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {
                        username ? (
                            <div className="flex items-center gap-x-3">
                                <Link to="/profile" className="text-sm/6 font-semibold text-gray-900 uppercase">{username}</Link>
                                <button
                                    className="rounded-3xl py-1.5 text-sm font-medium bg-red-500 px-5 text-white hover:bg-red-400 cursor-pointer"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('refreshToken');
                                        localStorage.removeItem('username');
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        )
                    }

                </div>
            </nav>
        </header>
    );
}