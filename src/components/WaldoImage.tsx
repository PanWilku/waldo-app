"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface WaldoImageProps {
  src: string;
  alt: string;
  waldoId: string;
}

export default function WaldoImage({ src, alt, waldoId }: WaldoImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [trueDimensions, setTrueDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [wrongClickPositions, setWrongClickPositions] = useState<
    Array<{ x: number; y: number; id: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debug: log when wrongClickPositions changes
  console.log("Current click positions:", wrongClickPositions);

  const handleImageLoad = () => {
    if (imageRef.current) {
      // Get true original file dimensions
      const img = new window.Image();
      img.onload = () => {
        setTrueDimensions({ width: img.width, height: img.height });
        console.log("Original image dimensions:", img.width, "x", img.height);
      };
      img.src = src;
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !trueDimensions || isLoading) return;

    setIsLoading(true);

    // Get click coordinates on displayed image
    const rect = event.currentTarget.getBoundingClientRect();
    const displayClickX = event.clientX - rect.left;
    const displayClickY = event.clientY - rect.top;

    // Calculate original image coordinates
    const displayedWidth = imageRef.current.clientWidth;
    const displayedHeight = imageRef.current.clientHeight;
    const scaleX = trueDimensions.width / displayedWidth;
    const scaleY = trueDimensions.height / displayedHeight;
    const originalX = Math.round(displayClickX * scaleX);
    const originalY = Math.round(displayClickY * scaleY);

    // Console log the click
    console.log(`🎯 Clicked at display: (${displayClickX}, ${displayClickY})`);
    console.log(`🎯 Original coordinates: (${originalX}, ${originalY})`);

    // Always show a red circle first for debugging
    const clickId = `click-${Date.now()}-${Math.random()}`;
    setWrongClickPositions((prev) => [
      ...prev,
      {
        x: displayClickX,
        y: displayClickY,
        id: clickId,
      },
    ]);

    console.log("🔴 Red circle added at:", displayClickX, displayClickY);

    try {
      // Make request to validate click
      const response = await fetch(`/api/waldo/${waldoId}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: originalX,
          y: originalY,
          width: trueDimensions.width,
          height: trueDimensions.height,
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (data.found) {
        console.log("🎉 Waldo found!");
        // add logic when waldo found
      } else {
        console.log("❌ Waldo not found. Try again!");
        // Keep the red circle permanently for wrong clicks
      }
    } catch (error) {
      console.error("Error validating click:", error);
      console.log("❌ API error, keeping red circle");
      // Keep the red circle permanently for API errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Image
          ref={imageRef}
          onClick={handleClick}
          onLoad={handleImageLoad}
          src={src}
          alt={alt}
          width={800}
          height={600}
          className={`max-w-full max-h-full object-contain cursor-pointer`}
          priority
        />

        {/* Red circles for clicks */}
        {wrongClickPositions.map((position) => (
          <div
            key={position.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: position.x - 25, // Center the circle (60px diameter / 2)
              top: position.y - 25,
              width: "50px",
              height: "50px",
            }}
          >
            {/* Animated pulse circle */}
            <div className="w-full h-full bg-red-500 rounded-full opacity-90"></div>
            {/* Static filled circle */}
            <div className="absolute inset-2 bg-red-600 rounded-full opacity-60"></div>
            {/* Border circle */}
            <div className="absolute inset-0 border-4 border-red-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div>
        {wrongClickPositions.length > 0 && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            Circles: {wrongClickPositions.length}
          </div>
        )}
      </div>
    </>
  );
}
