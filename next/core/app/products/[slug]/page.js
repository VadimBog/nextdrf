'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useUser } from '../../context';

async function getProducts(slug) {
    const res = await fetch('http://127.0.0.1:8000/api/' + slug + "/", {
        next: {
            revalidate: 0
        }
    })
    if (!res.ok) throw new Error('failed to fetch products');
    return res.json();
}

async function addToCart(productId, quantity, token) {
    const res = await fetch('http://127.0.0.1:8000/api/cart/items/', {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: productId,
            quantity: quantity
        })
    });
    if (!res.ok) throw new Error('failed to add item to cart');
}

export default function ProductPage({ params: { slug } }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { isLoggedIn, token } = useUser();
    console.log("ToKeN333:", token);

    useEffect(() => {
        getProducts(slug).then(data => setProduct(data));
    }, [slug]);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleAddToCart = () => {
        addToCart(product.id, quantity, token)
            .then(() => alert('Item added to cart successfully'))
            .catch(error => console.error('Failed to add item to cart:', error));
    }

    if (!product) return 'Loading...';

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex p-6 flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 lg:mb-0">
                    <div className="relative w-full h-full">
                        {product && (
                            <Image
                                src={product.product_image[0].image}
                                alt={product.title}
                                width={400} // Set your preferred width
                                height={400} // Set your preferred height
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-6">
                    <div className="p-4">
                        {product && (
                            <>
                                <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
                                <p className="text-gray-600 mb-4">${product.regular_price}</p>
                                <div className="flex justify-start mb-4">
                                    {product.product_specifications.map(spec => (
                                        <p key={spec.specification} className="mr-8 mb-2">{spec.specification}: {spec.value}</p>
                                    ))}
                                </div>
                                {isLoggedIn && (
                                <div className="flex items-center justify-start mb-4">
                                    <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-x-1.5">
                                            <button
                                                type="button"
                                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                onClick={handleDecrease}
                                            >
                                                -
                                            </button>
                                            <input
                                                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                                                type="text"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                onClick={handleIncrease}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                            className="size-10 w-auto py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ml-4" onClick={handleAddToCart}>
                                        Add to cart
                                    </button>
                                </div>
                                )}
                                <p className="text-lg mb-4">{product.description}</p>
                                <Link href="/">
                                    <p className="text-blue-500">Back to products</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

