"use client";
import Image from "next/image";

interface HowToPlayDialogProps {
  position: { x: number; y: number };
}

export default function HowToPlayDialog({ position }: HowToPlayDialogProps) {
  return (
    <div
      className="absolute bg-white rounded-lg p-4 shadow-2xl max-w-xs w-full z-50"
      style={{ left: position.x + 15, top: position.y + 15 }}
    >
      <h2 className="text-lg font-bold mb-2 text-gray-800">How to Play</h2>
      <div className="space-y-2 text-sm text-gray-600 flex flex-col items-center">
        <p className="text-center">
          Find Waldo hidden character in the image. Waldo looks like this:
        </p>
        <Image
          src="/waldoavatar.png"
          alt="How to Play Example"
          width={100}
          height={100}
          className="rounded-md border border-gray-300"
        />
        <ul className="list-disc list-inside space-y-1 self-start">
          <li>Choose your desired level</li>
          <li>After you click, a red circle will appear marking your guess.</li>
          <li>
            Use the zoom toggle for a closer look, but remember you cant click
            the image while zooming.
          </li>
          <li>Good luck!</li>
        </ul>
      </div>
    </div>
  );
}
