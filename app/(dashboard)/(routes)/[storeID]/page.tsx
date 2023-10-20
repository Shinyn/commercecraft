"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const { storeID } = params;
  const { userId } = useAuth();
  const [store, setStore] = useState("");

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}/${storeID}`,
        {}
      )
      .then(function (response) {
        setStore(response.data.title);
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }, []);
  {
  }
  return (
    <>
      <div className="">
        <div className="container mx-auto py-10">
          <h1 className="text-2xl">
            Welcome to<span className="font-bold m-1">{store}</span> !
          </h1>{" "}
        </div>
        <div className="m-4 p-2 border-2 flex flex-row justify-between">
          <h2 className="pt-2 ">
            This is your StoreID :{" "}
            <span className="font-mono m-1 p-2 rounded bg-slate-200">
              {storeID}
            </span>
          </h2>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(`${storeID}`)}
          >
            Copy
          </Button>
        </div>

        <div className="m-10 text-justify">
          <p className="italic">
            When you want to fetch from this CMS, you can use the StoreID like
            this:{" "}
          </p>
          <p className=" m-1">https://commercecraft.vercel.app/api/{storeID}</p>
        </div>
      </div>
      <div className="p-5">
        <h2 className="font-bold">So, What can I do here?</h2>
        <p>
          You can create your own store, add products, and manage your
          inventory. Each section has its own API, listed at the bottom, so you
          can fetch the data.
        </p>
        <ul className="list-disc m-10 text-justify space-y-4 w-2/3">
          <li>
            <p>
              In the section
              <Link
                href={`/${params.storeID}/billboards`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                {" "}
                Banner
              </Link>
              , you can create your own banner and add it to your website. All
              you need to do is add an imageURL and a text, and you can fetch it
              from the database! In the actions column(the three dots), you can
              also edit and delete your banner.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/products`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Products
              </Link>
              , you can add your own products with alot of different attributes,
              for instance featured or archived. In the actions column you can
              and manage, edit, and delete the products.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/categories`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Categories
              </Link>
              , you can add your own categories. In the actions column you can
              also edit and delete your categories.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/sizes`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Sizes
              </Link>
              , you can add your own sizes. In the actions column you can also
              edit and delete your sizes.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/colors`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Colors
              </Link>
              , you can add your own colors. In the actions column you can also
              edit and delete your colors.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/customers`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Customers
              </Link>
              , your customers will be listed when they order something from
              your store. In the actions column you can also send an email to
              your customers, aswell as delete and edit them.
            </p>
          </li>
          <li>
            <p>
              In the section{" "}
              <Link
                href={`/${params.storeID}/orders`}
                className="m-2 bg-slate-200 p-2 rounded"
              >
                Orders
              </Link>
              , your orders will be listed when your customers order something
              from your store. In the actions column you can also get to the
              deliverynote, that you can print, aswell as edit and delete your
              orders.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
