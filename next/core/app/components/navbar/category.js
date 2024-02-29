import Link from "next/link";
import Image from "next/image";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Category() {
    return (
        <>
            <div className="flex items-center space-x-8 mt-8 text-gray-800 hover:text-gray-400">
                <Link href="/">
                    Category
                </Link>
            </div>
        </>

    );
}