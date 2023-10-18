//En egengjord navbar som löper längs med sidan
"use client";
import Link from "next/link";
import { Settings } from "@/components/stores/dashboard/settings";
import { useParams } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

export default function Navbar() {
  const params = useParams();

  return (
    <div
      className={"sticky top-0 h-screen bg-blue-400 border-r-2 print:hidden "}
    >
      <div className={"flex flex-row justify-start"}>
        <Settings />
      </div>
      <div>
        <h1
          className={
            " my-6 text-4xl hover:text-white hover:bg-blue-500 px-4 rounded py-1"
          }
        >
          {" "}
          <Link href={`/${params.storeID}`}>Dashboard</Link>
        </h1>
        <ul className={"flex-col space-y-6 text-2xl"}>
          <li
            className={"hover:text-white hover:bg-blue-500 px-4 py-1 rounded"}
          >
            <Link href={`/${params.storeID}/billboards`}> Banner</Link>
          </li>
          <li
            className={"hover:text-white hover:bg-blue-500 px-4 py-1 rounded"}
          >
            <Link href={`/${params.storeID}/products`}>Products</Link>
          </li>
          <li
            className={
              "m-1 hover:text-white hover:bg-blue-500 px-4 py-1 rounded text-xl"
            }
          >
            <Link href={`/${params.storeID}/categories`}>- Categories</Link>
          </li>
          <li
            className={
              "m-1 hover:text-white hover:bg-blue-500 px-4 py-1 rounded text-xl"
            }
          >
            <Link href={`/${params.storeID}/sizes`}>- Sizes</Link>
          </li>
          <li
            className={
              "m-1 hover:text-white hover:bg-blue-500 px-4 py-1 rounded text-xl"
            }
          >
            <Link href={`/${params.storeID}/colors`}>- Colors</Link>
          </li>
          <li
            className={"hover:text-white hover:bg-blue-500 px-4 py-1 rounded"}
          >
            <Link href={`/${params.storeID}/customers`}>Customers</Link>
          </li>
          <li
            className={"hover:text-white hover:bg-blue-500 px-4 py-1 rounded"}
          >
            <Link href={`/${params.storeID}/orders`}>Orders</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-end py-1 mt-20 mr-6">
        <Link href={`/`}>
          <MdArrowBackIos className="text-4xl hover:text-white" />
        </Link>
      </div>
    </div>
  );
}
