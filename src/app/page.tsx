"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container flex w-full bg-rose-200 justify-center flex-col h-screen">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/waldo/1">Waldo Challenge</Link>
        </nav>
      </div>
    </>
  );
}
