"use client";

import WaldoImage from "@/components/WaldoImage";
import GameHeader from "@/components/GameHeader";

export default function Home() {
  const id = "1"; // Hardcoded for now, could be dynamic later

  const handleCoordinateClick = async (
    x: number,
    y: number,
    dimensions: { width: number; height: number }
  ) => {
    console.log(`Clicked at original coordinates: X=${x}, Y=${y}`);
    // ask /waldo/:waldoId?x=...&y=... to check if Waldo is there
    const response = await fetch(`/api/waldo/${id}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y, ...dimensions }),
    });
    const data = await response.json();
    if (data.found) {
      console.log("Waldo found at:", data.found);
    } else {
      console.log("Waldo not found. Try again!");
    }
  };

  return (
    <div className="container flex w-full bg-rose-200 justify-center flex-col h-screen">
      <div className="flex w-full justify-center items-center">
        <GameHeader
          title="Welcome to Waldo"
          subtitle="Find Waldo in the image below!"
        />
      </div>
      <div className="flex bg-blue-300 w-full h-full justify-center items-center">
        <WaldoImage
          src="/waldo1.jpg"
          alt="Where's Waldo board"
          onCoordinateClick={handleCoordinateClick}
        />
      </div>
    </div>
  );
}
