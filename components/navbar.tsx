//En egengjord navbar som löper längs med sidan
"use client";
import Link from "next/link";

import { useParams } from "next/navigation";

export default function Navbar() {
  const params = useParams();

  return (
    <div className={"sticky top-0 p-2 h-screen bg-blue-400 print:hidden "}>
      <h1 className={"m-6 text-5xl"}>
        <Link href={`/${params.storeID}`}>Dashboard</Link>
      </h1>
      <ul className={"flex-col space-y-8 m-4  text-3xl"}>
        <li className={"hover:text-gray-400"}>
          <Link href={`/${params.storeID}/billboards`}> Banner</Link>
        </li>
        <li className={"hover:text-gray-400"}>
          <Link href={`/${params.storeID}/products`}>Products</Link>
        </li>
        <li className={"m-1hover:text-gray-400 text-2xl"}>
          <Link href={`/${params.storeID}/categories`}>Categories</Link>
        </li>
        <li className={"m-1 hover:text-gray-400 text-2xl"}>
          <Link href={`/${params.storeID}/sizes`}>Sizes</Link>
        </li>
        <li className={"m-1 hover:text-gray-400 text-2xl"}>
          <Link href={`/${params.storeID}/colors`}>Colors</Link>
        </li>
        <li className={"hover:text-gray-400"}>
          <Link href={`/${params.storeID}/customers`}>Customers</Link>
        </li>
        <li className={"hover:text-gray-400"}>
          <Link href={`/${params.storeID}/orders`}>Orders</Link>
        </li>
      </ul>
    </div>
  );
}
