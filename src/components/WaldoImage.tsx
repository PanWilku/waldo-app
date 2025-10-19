"use client";

import Image from "next/image";
import { useRef, useState, useEffect, MouseEvent } from "react";
import { useWaldoGame } from "@/contexts/WaldoGameContext";

interface WaldoImageProps {
  src: string;
  alt: string;
  waldoId: string;
  level: number;
}

export default function WaldoImage({
  src,
  alt,
  waldoId,
  level,
}: WaldoImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    showTemporaryMessage,
    setGameCompleted,
    gameCompleted,
    setOnResetCircles,
  } = useWaldoGame();
  const [trueDimensions, setTrueDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [wrongClickPositions, setWrongClickPositions] = useState<
    Array<{ x: number; y: number; id: string }>
  >([]);
  const [foundClickPositions, setFoundClickPositions] = useState<
    Array<{ x: number; y: number; id: string }>
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [zoomable, setZoomable] = useState(false);

  const [circleDimensions, setCircleDimensions] = useState({
    diameter: 50,
    radius: 25,
  });

  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    mouseX: 0,
    mouseY: 0,
  });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const MAGNIFIER_SIZE = 100;
  const ZOOM_LEVEL = 2.5;

  useEffect(() => {
    const positionMap: Record<number, number> = {
      1: 50,
      2: 50,
      3: 35,
      4: 25,
      5: 10,
    };

    const diameter = positionMap[level] ?? 50;
    setCircleDimensions({
      diameter,
      radius: diameter / 2,
    });
  }, [level]);

  // Reset circles when game is reset
  const resetCircles = () => {
    setWrongClickPositions([]);
    setFoundClickPositions([]);
    setIsLoading(false);
  };

  // Register reset function with context
  useEffect(() => {
    setOnResetCircles(() => resetCircles);
  }, [setOnResetCircles]);

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
    if (!imageRef.current || !trueDimensions || isLoading || gameCompleted)
      return;

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
        setGameCompleted(true);
        // Add green circle for successful finds
        const clickId = `click-${Date.now()}-${Math.random()}`;
        setFoundClickPositions((prev) => [
          ...prev,
          {
            x: displayClickX,
            y: displayClickY,
            id: clickId,
          },
        ]);
      } else {
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
        showTemporaryMessage("❌ Waldo is not here. Keep looking!");
        // Keep the red circle permanently for wrong clicks
      }
    } catch (error) {
      console.error("Error validating click:", error);
      console.log("❌ API error, keeping red circle");
      showTemporaryMessage("❌ Something went wrong. Please try again.");
      // Keep the red circle permanently for API errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    const element = imageRef.current;
    const { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    updatePosition(e);
  };

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    updatePosition(e);
  };

  const updatePosition = (e: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  const handleZoomToggle = () => {
    setZoomable(!zoomable);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => handleZoomToggle()}
          className="absolute top-0 right-0 p-2 border-1 m-1 rounded-lg bg-gray-600 text-white z-20 cursor-pointer hover:bg-gray-800"
        >
          Zoom Toggle {zoomable ? "On" : "Off"}
        </button>

        <Image
          ref={imageRef}
          onClick={
            !zoomable
              ? handleClick
              : showTemporaryMessage.bind(
                  null,
                  "🔍 Turn off the zoom to click!"
                )
          }
          onLoad={handleImageLoad}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          src={src}
          alt={alt}
          width={800}
          height={600}
          className={`max-w-full max-h-full object-contain ${
            gameCompleted ? "cursor-not-allowed opacity-75" : "cursor-pointer"
          }`}
          priority
        />
        {zoomable && (
          <div
            style={{
              backgroundPosition: `${position.x}px ${position.y}px`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
                imageSize.height * ZOOM_LEVEL
              }px`,
              backgroundRepeat: "no-repeat",
              display: zoomable ? "block" : "none",
              top: `${position.mouseY}px`,
              left: `${position.mouseX}px`,
              width: `${MAGNIFIER_SIZE}px`,
              height: `${MAGNIFIER_SIZE}px`,
            }}
            className={`z-10 border-4 rounded-full pointer-events-none absolute border-gray-500 w-32 h-32`}
          />
        )}

        {/* Red circles for clicks */}
        {!zoomable &&
          wrongClickPositions.map((position) => (
            <div
              key={position.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: position.x - circleDimensions.radius,
                top: position.y - circleDimensions.radius,
                width: circleDimensions.diameter,
                height: circleDimensions.diameter,
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

        {foundClickPositions.map((position) => (
          <div
            key={position.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: position.x - circleDimensions.radius,
              top: position.y - circleDimensions.radius,
              width: circleDimensions.diameter,
              height: circleDimensions.diameter,
            }}
          >
            {/* Animated pulse circle */}
            <div className="w-full h-full bg-green-500 rounded-full opacity-90"></div>
            {/* Static filled circle */}
            <div className="absolute inset-2 bg-green-600 rounded-full opacity-60"></div>
            {/* Border circle */}
            <div className="absolute inset-0 border-4 border-green-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </>
  );
}
