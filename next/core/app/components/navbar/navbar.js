'use client'
import React, { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'; 
import { useUser } from '../../context';

export default function Navbar() {
    const { isLoggedIn, username, handleLogout } = useUser();
    const router = useRouter(); 

    useEffect(() => {
        console.log('isLoggedIn state changed:', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogoutClick = () => {
        handleLogout(); 
        router.push('/'); 
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

                        <div className="flex items-center space-x-8 mt-8 text-gray-800">
                            {isLoggedIn ? (
                                <>
                                    <span>{username}</span>
                                    <Link href="/shoppingcart" className="hover:text-blue-500">
                                        Cart
                                    </Link>
                                    <button onClick={handleLogoutClick} className="hover:text-blue-500">
                                        Logout
                                    </button>
                                </>
                            ) : (
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

