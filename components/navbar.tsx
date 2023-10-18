//En egengjord navbar som löper längs med sidan
"use client";
import Link from "next/link";
import { Settings } from "@/components/stores/dashboard/settings";
import { useParams } from "next/navigation";
import { GiFastBackwardButton } from "react-icons/gi";

export default function Navbar() {
  const params = useParams();

  return (
    <div className={"sticky top-0 p-2 h-screen bg-blue-400 print:hidden "}>
      <div className={"flex flex-row justify-end"}>
      <Settings/>
      </div>
      <div>
      <h1 className={"m-4 my-6 text-5xl"}>
        {" "}
        <Link href={`/${params.storeID}`}>Dashboard</Link>
      </h1>
      <ul className={"flex-col space-y-6 m-4 text-3xl"}>
        <li className={"hover:text-white"}>
          <Link href={`/${params.storeID}/billboards`}> Banner</Link>
        </li>
        <li className={"hover:text-white"}>
          <Link href={`/${params.storeID}/products`}>Products</Link>
        </li>
        <li className={"m-1 hover:text-white text-2xl"}>
          <Link href={`/${params.storeID}/categories`}>- Categories</Link>
        </li>
        <li className={"m-1 hover:text-white text-2xl"}>
          <Link href={`/${params.storeID}/sizes`}>- Sizes</Link>
        </li>
        <li className={"m-1 hover:text-white text-2xl"}>
          <Link href={`/${params.storeID}/colors`}>- Colors</Link>
        </li>
        <li className={"hover:text-white"}>
          <Link href={`/${params.storeID}/customers`}>Customers</Link>
        </li>
        <li className={"hover:text-white"}>
          <Link href={`/${params.storeID}/orders`}>Orders</Link>
        </li>
      </ul></div>
      <div className="flex flex-row justify-end mt-20">
        <Link href={`/`}>
          <GiFastBackwardButton className="text-3xl" />
        </Link>
      </div>
    </div>
  );
}
