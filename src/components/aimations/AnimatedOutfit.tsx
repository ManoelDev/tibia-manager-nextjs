'use client'
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';


const validOutfitKeys = [
  'looktype',
  'lookaddons',
  'lookhead',
  'lookbody',
  'looklegs',
  'lookfeet',
  'mount',
  'resize',
];

export function outfitURL({
  resize,
  ...params
}: {
  looktype: number;
  lookaddons?: number;
  lookhead?: number;
  lookbody?: number;
  looklegs?: number;
  lookfeet?: number;
  mount?: number;
  resize?: boolean;
}): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!validOutfitKeys.includes(key)) {
      continue;
    }
    search.append(key, (value ?? 0).toString());
  }
  if (resize) {
    search.append('resize', '1');
  }
  return `/api/outfit?${search.toString()}`;
}

interface Outfit {
  looktype: number;
  lookaddons?: number;
  lookhead?: number;
  lookbody?: number;
  looklegs?: number;
  lookfeet?: number;
  mount?: number | null;
  lookmount?: number | null;
}

interface Frame {
  image: HTMLImageElement;
  duration: number;
}

interface OutfitComponentProps {
  outfit: Outfit;
  alt: string;
  className?: string;
}

const OutfitComponent = ({
  outfit,
  alt,
  className,
}: OutfitComponentProps) => {




  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [shownFor, setShownFor] = useState<number>(1000);


  const hasMount =
    (outfit.lookmount && outfit.lookmount > 0) ||
    (outfit.mount && outfit.mount > 0);

  useEffect(() => {
    const sourceChanged = async () => {
      setFrames([]);

      if (!outfit) return;
      const response = await fetch(
        outfitURL({
          ...outfit,
          mount: outfit.mount ?? outfit.lookmount ?? 0,
          resize: true,
        }) // Replace with your actual API endpoint
      );
      const data = await response.json();
      const newFrames: Frame[] = data.frames.map((frame: any) => ({
        ...frame,
        image: (() => {
          const image = new Image();
          image.src = frame.image;
          return image;
        })(),
      }));
      setFrames(newFrames);
    };

    sourceChanged();
  }, [outfit]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!canvasRef.current || frames.length === 0) return;

      setShownFor((prev) => prev + 50);

      if (shownFor >= frames[index].duration) {
        setShownFor(0);
        setIndex((prevIndex) => (prevIndex + 1) % frames.length);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [index, shownFor, frames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context && frames.length > 0) {
      const frame = frames[index];
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        frame.image,
        0,
        0,
        frame.image.width,
        frame.image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }, [index, frames]);

  return (
    <div className={cn(`relative w-20 h-20`, className)}>
      <div className={`absolute ${hasMount ? '-left-7 -bottom-1' : '-left-1 bottom-4'}`}      >
        {frames && outfit.looktype > 0 ? (
          <canvas ref={canvasRef} className="w-20 h-20 whitespace-nowrap" aria-details={alt} />
        ) : (
          <div>not</div>
        )}
      </div>
    </div>
  );
};

export default OutfitComponent;
