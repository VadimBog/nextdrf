'use client'
import React, { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useUser } from '../../context';

export default function Navbar() {
    const { isLoggedIn, username, handleLogout } = useUser();

    useEffect(() => {
        console.log('isLoggedIn state changed:', isLoggedIn);
    }, [isLoggedIn]);

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
                                    <button onClick={handleLogout} className="hover:text-blue-500">
                                        Logout
                                    </button>
                                    <span>{username}</span>
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


