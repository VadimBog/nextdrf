import Link from "next/link";
import Image from "next/image";
import Category from "./category";

export default function Navbar() {
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
                            <Link href="/login/">
                                Login
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
        </main>
    );
}