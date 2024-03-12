'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from '../context';

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const { token } = useUser();
    console.log("ToKeN from SC page:", token);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!token) {
                    console.error("Authentication token not found.");
                    return;
                }
                console.log("current token:", token);
                const response = await fetch("http://127.0.0.1:8000/api/cart/items/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const data = await response.json();
                setProducts(data);
                console.log("JSON response:", data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Calculate total price of items in the cart
    const total = cart.reduce((acc, curr) => acc + parseFloat(curr.regular_price), 0);

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden col-span-2">
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold mb-4">Products in your cart</h1>
                        {products.map((product) => (
                            <div key={product.id} className="mb-4 shadow-md rounded-lg overflow-hidden p-4">
                                <div className="relative w-full h-full">
                                    <div className="image-container-shoppingcart">
                                        <Image
                                            src={product.product_image[0].image}
                                            alt={product.title}
                                            width={200}
                                            height={200}
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                                    <p className="text-gray-600 mb-2">${product.regular_price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
                        {cart.map((item) => (
                            <div key={item.id} className="mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-gray-600">Price: ${item.regular_price}</p>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <p className="text-xl font-semibold">Total:</p>
                            <p className="text-gray-600">
                                ${total.toFixed(2)}
                            </p>
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
