//En egengjord navbar som löper längs med sidan

import React from 'react'
import Link from 'next/link'


export default function Navbar() {
  return (

    <div className= {" p-2 h-screen bg-blue-400 "}>
        <h1 className= {"m-6 text-5xl"}>Dashboard</h1>
        <ul className={"flex-col space-y-8 m-4  text-3xl"}>
            <li className={"hover:text-gray-400"}><Link href="/products">Banner</Link></li>
            <li className={"hover:text-gray-400"}><Link href="/products">Products</Link></li>
            <li className={"m-1hover:text-gray-400 text-2xl"}><Link href="/products">Categories</Link></li>
            <li className={"m-1 hover:text-gray-400 text-2xl"}><Link href="/products">Sizes</Link></li>
            <li className={"m-1 hover:text-gray-400 text-2xl"}><Link href="/products">Colors</Link></li>
            <li className={"hover:text-gray-400"}><Link href="/products">Customers</Link></li>
            <li className={"hover:text-gray-400"}><Link href="/products">Orders</Link></li>
        </ul>
    </div>
    

  )
}