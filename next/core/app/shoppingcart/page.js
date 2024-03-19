'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from '../context';
import useCheckOutModal from "../hooks/ckeckOutModal";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function CartPage() {
    const CheckOutModal = useCheckOutModal();
    const [products, setProducts] = useState([]);
    const { token } = useUser();
    console.log("ToKeN from SC page:", token);

    const [promoCode, setPromoCode] = useState("");
    const [invalidPromoCode, setInvalidPromoCode] = useState("");
    const [promoCodeEntered, setPromoCodeEntered] = useState(false);
    const [windowWidth, windowHeight] = useWindowSize();

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

    // Calculate total price of items in the cart
    const total = products.reduce((acc, curr) => acc + curr.total_price, 0);
    // Calculate tax (9% of total price)
    const tax = total * 0.09;
    // Calculate estimated total (total price + tax)
    const estimatedTotal = total + tax;

    const handlePromoCodeSubmit = () => {
        // Check if the promo code is entered
        if (!promoCode.trim()) {
            // If promo code is not entered, set the status for the popup message
            setInvalidPromoCode("Please enter your promo code");
            return;
        }

        // Check the validity of the promo code
        if (promoCode === "VALID_CODE") {
            // If the promo code is valid, reset the status for invalid promo code and set the status for entered promo code
            setInvalidPromoCode("");
            setPromoCodeEntered(true);
        } else {
            // If the promo code is invalid, set the status for invalid promo code and reset the status for entered promo code
            setInvalidPromoCode("The code you entered is invalid");
            setPromoCodeEntered(false);
        }
    };

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useEffect(() => {
            const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return size;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`bg-white rounded-lg shadow-xl overflow-hidden md:col-span-2 ${windowWidth < 768 ? '' : 'order-2'}`}>
                    {/* Shopping Cart */}
                    <div className={`p-6 ${windowWidth < 768 ? 'md:animate-slide-up' : ''}`}>
                        <div className="mb-6 text-3xl font-semibold text-center">Shopping Cart</div>
                        <div className="border-b mb-6"></div>
                        <div className="flex flex-col md:flex-row mb-6 md:items-center space-y-2 md:space-y-0 md:space-x-2">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                className="border border-gray-300 px-4 py-2 md:flex-grow md:flex-shrink"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button
                                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-2 border border-gray-300 rounded shadow md:inline-block md:ml-2"
                                onClick={handlePromoCodeSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        {invalidPromoCode && <p className="text-red-500 mb-2">{invalidPromoCode}</p>}
                        <div className="flex justify-between mb-4">
                            <div>Shopping cost:</div>
                            <div>${total.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div>Discount:</div>
                            <div>-$0</div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div>Tax:</div>
                            <div>${tax.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="text-xl font-semibold">Estimated Total:</div>
                            <div className="text-xl font-semibold">${estimatedTotal.toFixed(2)}</div>
                        </div>
                        <button
                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow w-full"
                            onClick={CheckOutModal.open}
                        >
                            Checkout
                        </button>
                    </div>
                </div>

                <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${windowWidth < 768 ? 'md:order-first' : ''}`}>
                    {/* Products in your cart */}
                    <div className="p-6 space-y-4">
                        <h1 className="text-3xl font-semibold mb-4">Products in your cart</h1>
                        {products.map((product) => (
                            <div key={product.id} className="mb-4 shadow-md rounded-lg overflow-hidden p-4 flex">
                                <div className="relative w-1/3 h-full mr-4">
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
                                <div className="w-2/3">
                                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                                    <p className="text-gray-600 mb-2">${product.regular_price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
);
    
}
