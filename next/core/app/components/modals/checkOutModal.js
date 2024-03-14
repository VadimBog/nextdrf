'use client'

import Modal from "./modal";
import useCheckOutModal from "@/app/hooks/ckeckOutModal";

const CheckOutModal = () => {
    const CheckOutModal = useCheckOutModal();

    const content = (
        <div>
            <h1 className="mb-6 text-2xl">CheckOutModal</h1>
        </div>
    )
    return (
        <Modal
            isOpen={CheckOutModal.isOpen}
            close={CheckOutModal.close}
            label={"CheckOutModal"}
            content={content}
        />
    )
}

export default CheckOutModal;