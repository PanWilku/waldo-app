"use client";

import { useState, MouseEvent } from "react";
import HowToPlayDialog from "./HowToPlayDialog";

export default function PlayHeader() {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
        🔍 Where&apos;s Waldo Game
      </h1>
      <p className="text-lg text-gray-300">
        Choose a puzzle and find Waldo hidden in the scene!
      </p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          className="rounded bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 cursor-pointer"
        >
          How to play
        </button>
      </div>
      {isHovering && <HowToPlayDialog position={position} />}
    </div>
  );
}
