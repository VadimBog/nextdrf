'use client'
import Image from "next/image";
import { useState } from "react";

// Sample product data (replace with actual product data)
const products = [
    {
        id: 1,
        title: "Product 1",
        regular_price: 10,
        product_image: [{ image: "/product1.jpg" }],
        description: "Description of Product 1",
    },
    {
        id: 2,
        title: "Product 2",
        regular_price: 20,
        product_image: [{ image: "/product2.jpg" }],
        description: "Description of Product 2",
    },
];

export default function ProductPage() {
    // Define a state to store selected products in the cart
    const [cart, setCart] = useState([]);

    // Function to add product to the cart
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden col-span-2">
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold mb-4">Products in your cart</h1>
                        {products.map((product) => (
                            <div key={product.id} className="mb-4 shadow-md rounded-lg overflow-hidden p-4">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={product.product_image[0].image}
                                        alt={product.title}
                                        width={400} // Set your preferred width
                                        height={400} // Set your preferred height
                                        objectFit="contain"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                                    <p className="text-gray-600 mb-2">${product.regular_price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Add to Cart
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
                                ${cart.reduce((acc, curr) => acc + curr.regular_price, 0)}
                            </p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
