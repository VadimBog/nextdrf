import Image from "next/image";
import Link from "next/link";


async function fetchData() {
  const res = await fetch("http://127.0.0.1:8000/api/");
  const result = await res.json();
  return result;
}


export default async function Home() {
  const products = await fetchData();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {products.map(el => (
          <div key={el.id}>
          <p> {el.title} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to our website!</h1>
//         <Link href="/pages" className="text-blue-500 hover:underline">
//           Watch our product
//         </Link>
//       </div>
//     </div>
//   );
// }
