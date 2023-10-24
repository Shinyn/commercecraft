"use client";
//Page for displaying helpful information about the functionality of the dashboard
//TODO: Create appropriate components for content 

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
        <div className="m-4 p-2 border rounded-lg flex flex-row justify-between">
          <h2 className="pt-2 ">
            This is your StoreID :{" "}
            <code className="rounded bg-muted p-2 font-mono text-sm">
              {storeID}
            </code>
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
              In
              <Link href={`/${params.storeID}/billboards`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Banner
                </Button>
              </Link>
              you can create your own banner and add it to your website. All
              you need to do is add an imageURL and a text, and you can fetch it
              from the database! In the actions column (the three dots), you can
              also edit and delete your banner.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/products`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Products
                </Button>
                Products
              </Link>
              you can add your own products with alot of different attributes,
              for instance featured or archived. In the actions column you can
              and manage, edit, and delete the products.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/categories`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Categories
                </Button>
              </Link>
              you can add your own categories. In the actions column you can
              also edit and delete your categories.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/sizes`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Sizes
                </Button>
              </Link>
              you can add your own sizes. In the actions column you can also
              edit and delete your sizes.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/colors`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Colors
                </Button>
              </Link>
              you can add your own colors. In the actions column you can also
              edit and delete your colors.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/customers`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Customers
                </Button>
              </Link>
              your customers will be listed when they order something from
              your store. In the actions column you can also send an email to
              your customers, aswell as delete and edit them.
            </p>
          </li>
          <li>
            <p>
              In
              <Link href={`/${params.storeID}/orders`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-2">
                    Orders
                </Button>
              </Link>
              your orders will be listed when your customers order something
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
