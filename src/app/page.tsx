import Link from "next/link";
import Image from "next/image";
import { WaldoImage } from "@/types/dbTypes";

export default async function Home() {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  const images = await fetch(`${baseUrl}/api/getWaldoImage`).then((res) =>
    res.json()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🔍 Where&apos;s Waldo Challenge
          </h1>
          <p className="text-lg text-gray-300">
            Choose a puzzle and find Waldo hidden in the scene!
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <Link
            href="/"
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-400 rounded-lg shadow-lg hover:shadow-xl hover:from-rose-400 hover:to-rose-300 transition-all duration-200 text-white font-medium"
          >
            🏠 Home
          </Link>
        </nav>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images?.map((image: WaldoImage) => (
            <Link
              key={image.id}
              href={`/waldo/${image.id}?title=${encodeURIComponent(
                image.title
              )}&id=${encodeURIComponent(image.id)}&url=${encodeURIComponent(
                image.url
              )}`}
            >
              <div className="group bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-rose-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:border-rose-400">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-r from-rose-500 to-rose-400 rounded-full p-4 shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.062v3.876a1 1 0 001.555.832l3-2.438a1 1 0 000-1.664l-3-2.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-200">
                    {image.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Can you spot Waldo in this challenging scene?
                  </p>

                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      🎯 Challenge #{image.id}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      {"⭐".repeat(
                        Math.min(5, Math.max(1, (image.id % 5) + 1))
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Border Animation */}
                <div className="h-1 bg-gradient-to-r from-rose-500 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {(!images || images.length === 0) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-white mb-2">
              No puzzles available
            </h3>
            <p className="text-gray-400">
              Check back later for new Waldo challenges!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
