'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            fetchUserDetails(token);
        } else {
            setIsLoggedIn(false);
            setUsername(""); 
        }
    }, [token]);

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

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setToken("");
        Cookies.remove("authToken");
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, handleLogout, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
