import Image from "next/image";

export default function Home() {
  return (
    <div className="container flex w-full bg-rose-200 justify-center flex-col h-screen">
      <h1 className="text-4xl font-bold">Welcome to Waldo</h1>
      <div className="flex bg-blue-300 w-full h-3/4 justify-center">
        <div className="relative w-full max-w-4xl lg:max-w-5xl aspect-[3/2] bg-neutral-100 justify-center">
          <Image
            src="/waldo1.jpg"
            alt="Where’s Waldo board"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
