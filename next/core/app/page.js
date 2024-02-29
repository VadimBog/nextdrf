
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://127.0.0.1:8000/api/", {
    next: {
      revalidate: 0
    }
  })
  if (!res.ok) throw new Error('failed to fetch products');
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="h-screen flex flex-col justify-start items-center py-6">
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full px-4">
        {products.map(el => (
          <div key={el.id} className="rounded-lg bg-white shadow-md p-4 mb-4">
            <div className="relative h-30">
              <div className="image-container">
                <Image
                  src={el.product_image[0].image}
                  alt={el.title}
                  layout="responsive"
                  objectFit="contain"
                  width={30} // Set your preferred width
                  height={20} // Set your preferred height
                />
              </div>
            </div>
            <p className="text-lg font-semibold">{el.title}</p>
            <p className="text-gray-600">${el.regular_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
