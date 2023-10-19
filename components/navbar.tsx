//En egengjord navbar som löper längs med sidan
'use client';
import Link from 'next/link';
import { Settings } from '@/components/stores/dashboard/settings';
import { useParams } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';

export default function Navbar() {
  const params = useParams();

  return (
    <div className={'sticky top-0 h-screen bg-blue-400 print:hidden '}>
      <div className="flex flex-row justify-left m-4 text-4xl">
        <Link href={`/`}>
          <AiFillHome className=" hover:text-white mr-4 rounded-full border border-slate p-1" />
        </Link>
        <div className={'flex flex-row justify-start'}>
          <Settings />
        </div>
      </div>
      <div>
        <h1 className={'my-6 text-4xl hover:text-white hover:bg-blue-500 rounded py-1'}>
          <Link className="flex-1 px-4 py-2" href={`/${params.storeID}`}>
            Dashboard
          </Link>
        </h1>
        <ul className={'flex-col text-2xl'}>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/billboards`}>
              Billboard
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/products`}>
              Products
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded text-xl'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/categories`}>
              - Categories
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded text-xl'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/sizes`}>
              - Sizes
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded text-xl'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/colors`}>
              - Colors
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/customers`}>
              Customers
            </Link>
          </li>
          <li className={'hover:text-white hover:bg-blue-500 flex rounded'}>
            <Link className="flex-1 px-4 py-2" href={`/${params.storeID}/orders`}>
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
