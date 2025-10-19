"use client";

import WaldoImage from "@/components/WaldoImage";
import GameHeader from "@/components/GameHeader";
import TemporaryMessage from "@/components/TemporaryMessage";
import SuccessDialog from "@/components/SuccessDialog";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { WaldoGameProvider } from "@/contexts/WaldoGameContext";

function WaldoGameContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id as string;
  const title = searchParams.get("title") || "Waldo Challenge";
  const imageUrl = searchParams.get("url") || "/waldo1.jpg";
  const level = parseInt(searchParams.get("level") || "1", 10);

  console.log("Received data:", { id, title, imageUrl });

  const handleRetry = () => {
    // Refresh the current page to restart the game
    router.refresh();
  };

  const handleMenu = () => {
    // Navigate back to home
    router.push("/");
  };

  return (
    <div className="container flex flex-col h-screen">
      {/* Temporary Message Display */}
      <TemporaryMessage />

      {/* Header with Back Button */}
      <div className="flex px-6 py-6 items-center justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 rounded-lg shadow-lg hover:shadow-xl hover:from-rose-400 hover:to-rose-300 transition-all duration-200 text-white font-medium flex-shrink-0"
        >
          ← Back to Home
        </Link>
        <div className="flex-1 flex justify-center">
          <GameHeader title={title} subtitle="Find Waldo in the image below!" />
        </div>
        <div className="w-32 flex-shrink-0"></div>
      </div>

      {/* Game Area with Success Dialog Overlay */}
      <div className="flex-1 flex justify-center items-center p-6 relative">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-2xl shadow-rose-500/10 max-w-6xl max-h-full">
          <WaldoImage src={imageUrl} alt={title} waldoId={id} level={level} />
        </div>

        {/* Success Dialog positioned over the game */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
          <SuccessDialog onRetry={handleRetry} onMenu={handleMenu} />
        </div>
      </div>
    </div>
  );
}

export default function WaldoChallenge() {
  return (
    <WaldoGameProvider>
      <WaldoGameContent />
    </WaldoGameProvider>
  );
}
