"use client";

import WaldoImage from "@/components/WaldoImage";
import GameHeader from "@/components/GameHeader";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function WaldoChallenge() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const title = searchParams.get("title") || "Waldo Challenge";
  const imageUrl = searchParams.get("url") || "/waldo1.jpg";

  console.log("Received data:", { id, title, imageUrl });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center py-6 px-6">
        <Link
          href="/"
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-400 rounded-lg shadow-lg hover:shadow-xl hover:from-rose-400 hover:to-rose-300 transition-all duration-200 text-white font-medium flex-shrink-0"
        >
          ← Back to Home
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <GameHeader
            title="Welcome to Waldo"
            subtitle="Find Waldo in the image below!"
          />
        </div>
        <div className="w-32 flex-shrink-0"></div>{" "}
        {/* Spacer to balance the back button */}
      </div>

      {/* Game Area */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-2xl shadow-rose-500/10 max-w-6xl max-h-full">
          <WaldoImage src={imageUrl} alt={title} waldoId={id} />
        </div>
      </div>
    </div>
  );
}
