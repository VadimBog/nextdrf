'use client'

import Modal from "./modal";
import useCheckOutModal from "@/app/hooks/ckeckOutModal";

const CheckOutModal = () => {
    const CheckOutModal = useCheckOutModal();

    const content = (
        <div className="max-w-sm mx-auto mt-0 bg-white rounded-md shadow-md overflow-hidden">
            <div className="px-6 py-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="card-number">
                        Card Number
                    </label>
                    <input
                        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="card-number" type="text" placeholder="**** **** **** ****" />
                </div>

                <div claclassNamess="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="expiration-date">
                        Expiration Date
                    </label>
                    <input
                        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="expiration-date" type="text" placeholder="MM/YY" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                        CVV
                    </label>
                    <input
                        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cvv" type="text" placeholder="***" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                        Cardholder Name
                    </label>
                    <input
                        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Full Name" />
                </div>

                <button className="bg-white hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow w-full">
                    Pay Now
                </button>
            </div>
        </div>
    )
    return (
        <Modal
            isOpen={CheckOutModal.isOpen}
            close={CheckOutModal.close}
            label={"Credit Card"}
            content={content}
        />
    )
}

export default CheckOutModal;