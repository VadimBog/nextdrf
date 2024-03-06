'use client'
import Link from "next/link";
import Image from "next/image";
import Category from "./category";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        // Check if token exists in cookies
        const authToken = Cookies.get("authToken");
        if (authToken) {
            // Token exists, user is logged in
            setIsLoggedIn(true);
            setToken(authToken);
            // Fetch user details or username from backend using the token
            fetchUserDetails(authToken);
        }
    }, []);

    // Function to fetch user details using the token
    const fetchUserDetails = (authToken) => {
        // Make API request to fetch user details using the token
        fetch("http://127.0.0.1:8000/api/auth/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Token ${authToken}`
            }
        })
            .then(response => {
                // Log JSON response from server
                return response.json();
            })
            .then(data => {
                // Log JSON response from server
                console.log("JSON response from server:", data);
                setUsername(data.username); // Assuming the response contains the username
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
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

                        <div className="flex items-center space-x-8 mt-8 text-gray-800 hover:text-gray-400">
                            {isLoggedIn ? (
                                // If user is logged in, show username
                                <span>{username}</span>
                            ) : (
                                // If user is not logged in, show login link
                                <Link href="/login">
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
