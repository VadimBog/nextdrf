'use client'
import Link from "next/link";
import Image from "next/image";
import Category from "./category";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(Cookies.get("authToken")); // Initialize token state with token from cookies
    const router = useRouter();

    useEffect(() => {
        console.log('useEffect called with token:', token);
        // Check if token exists
        if (token) {
            // Token exists, user is logged in
            setIsLoggedIn(true);
            // Fetch user details or username from backend using the token
            fetchUserDetails(token);
        } else {
            // Token does not exist, user is not logged in
            setIsLoggedIn(false);
            setUsername("");
        }
    }, [token]); // Add dependency on token state

    // Function to fetch user details using the token
    const fetchUserDetails = async (authToken) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/users/me", {
                method: "GET",
                headers: {
                    "Authorization": `Token ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const data = await response.json();
            setUsername(data.username); // Assuming the response contains the username 
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        // Clear the token and username from state
        setIsLoggedIn(false);
        setUsername("");
        setToken("");
        // Remove the token from cookies
        Cookies.remove("authToken");

        try {
            // Make a request to logout endpoint
            const response = await fetch("http://127.0.0.1:8000/api/auth/token/logout/", {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            if (response.ok) {
                console.log("Logout successful");
                // Redirect to main page
                router.push('/');
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <main>
            <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
                <div className="max-w-[1500px] mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <Image
                                src='/logo.png'
                                alt="logo"
                                width={120}
                                height={38}
                            />
                        </Link>

                        <Category />

                        <div className="flex items-center space-x-8 mt-8 text-gray-800">
                            {isLoggedIn ? (
                                // If user is logged in, show username and logout link
                                <>
                                    <Link href="/logout" onClick={handleLogout} className="hover:text-blue-500">
                                        Logout
                                    </Link>
                                    <span>{username}</span>
                                </>
                            ) : (
                                // If user is not logged in, show login link
                                <Link href="/login" className="hover:text-blue-500">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </main>
    );
}

