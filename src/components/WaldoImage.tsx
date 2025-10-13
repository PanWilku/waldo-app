"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface WaldoImageProps {
  src: string;
  alt: string;
  onCoordinateClick?: (x: number, y: number) => void;
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
      onCoordinateClick?.(originalX, originalY);
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
    </div>
  );
}
