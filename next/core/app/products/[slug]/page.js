
import Image from "next/image";
import Link from "next/link";

async function getProducts(slug) {
    const res = await fetch('http://127.0.0.1:8000/api/' + slug + "/", {
        next: {
            revalidate: 0
        }
    })
    if (!res.ok) throw new Error('failed to fetch products');
    return res.json();
}

export default async function ProductPage({ params: { slug } }) {
    const product = await getProducts(slug);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex">
                <div className="w-1/2 flex justify-center items-center">
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
                </div>
                <div className="w-1/2 p-6">
                    <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-2">${product.regular_price}</p>
                    <p className="text-lg mb-4">{product.description}</p>
                    <Link href="/">
                        <p className="text-blue-500">Back to products</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
