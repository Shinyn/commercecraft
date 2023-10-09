"use client";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <p>Under contruction</p>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
