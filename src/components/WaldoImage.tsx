"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface WaldoImageProps {
  src: string;
  alt: string;
  onCoordinateClick?: (
    x: number,
    y: number,
    dimensions: { width: number; height: number }
  ) => void;
}

export default function WaldoImage({
  src,
  alt,
  onCoordinateClick,
}: WaldoImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const [trueDimensions, setTrueDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [clickPositions, setClickPositions] = useState<
    Array<{ x: number; y: number; id: string }>
  >([]);

  // Get the true original file dimensions
  const getTrueImageDimensions = () => {
    const img = new window.Image();
    img.onload = function () {
      setTrueDimensions({ width: img.width, height: img.height });
      console.log("TRUE original file dimensions:", img.width, "x", img.height);
    };
    img.src = src;
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      // Get the actual displayed dimensions
      const displayedWidth = imageRef.current.clientWidth;
      const displayedHeight = imageRef.current.clientHeight;

      // Get the natural (optimized) dimensions - just for logging
      const naturalWidth = imageRef.current.naturalWidth;
      const naturalHeight = imageRef.current.naturalHeight;

      console.log(
        "Displayed dimensions:",
        displayedWidth,
        "x",
        displayedHeight
      );
      console.log(
        "Next.js optimized dimensions:",
        naturalWidth,
        "x",
        naturalHeight
      );

      // Get true dimensions for coordinate mapping
      getTrueImageDimensions();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickedX = event.clientX - rect.left;
    const clickedY = event.clientY - rect.top;

    console.log(
      `Clicked coordinates on displayed image: X=${clickedX}, Y=${clickedY}`
    );

    // Add red circle at click position
    const newClickId = `click-${Date.now()}-${Math.random()}`;
    setClickPositions((prev) => [
      ...prev,
      {
        x: clickedX,
        y: clickedY,
        id: newClickId,
      },
    ]);

    // Remove the circle after 3 seconds
    setTimeout(() => {
      setClickPositions((prev) => prev.filter((pos) => pos.id !== newClickId));
    }, 3000);

    if (imageRef.current && trueDimensions) {
      const displayedWidth = imageRef.current.clientWidth;
      const displayedHeight = imageRef.current.clientHeight;

      // Calculate scale ratios based on TRUE original size
      const scaleX = trueDimensions.width / displayedWidth;
      const scaleY = trueDimensions.height / displayedHeight;

      // Convert to original image coordinates
      const originalX = Math.round(clickedX * scaleX);
      const originalY = Math.round(clickedY * scaleY);

      console.log(
        `Coordinates on TRUE original image (${trueDimensions.width}x${trueDimensions.height}): X=${originalX}, Y=${originalY}`
      );

      // Call the parent callback with original coordinates
      onCoordinateClick?.(originalX, originalY, trueDimensions);
    }
  };

  return (
    <div className="relative">
      <Image
        ref={imageRef}
        onClick={handleClick}
        onLoad={handleImageLoad}
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="max-w-full max-h-full object-contain cursor-pointer"
        priority
      />

      {/* Red circles for click positions */}
      {clickPositions.map((position) => (
        <div
          key={position.id}
          className="absolute pointer-events-none"
          style={{
            left: position.x - 25, // Center the circle (50px diameter / 2)
            top: position.y - 25,
            width: "50px",
            height: "50px",
          }}
        >
          <div className="w-full h-full bg-red-500 rounded-full opacity-75 animate-pulse"></div>
        </div>
      ))}

      {/* Static red circles (non-animated) */}
      {clickPositions.map((position) => (
        <div
          key={`static-${position.id}`}
          className="absolute pointer-events-none border-4 border-red-500"
          style={{
            left: position.x - 25,
            top: position.y - 25,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
