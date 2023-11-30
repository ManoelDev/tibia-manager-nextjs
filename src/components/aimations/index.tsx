import React, { useEffect, useRef, useState } from 'react';

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
  class: string;
  innerClass: string;
}

const OutfitComponent: React.FC<OutfitComponentProps> = ({
  outfit,
  alt,
  class: klass,
  innerClass,
}) => {
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
        `api/outfit/${outfit.looktype}` // Replace with your actual API endpoint
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
    <div className={`relative w-12 h-12 ${klass} overflow-visible`}>
      <div
        className={`absolute ${hasMount ? '-left-7 -bottom-1' : '-left-10 bottom-1'
          } ${innerClass}`}
      >
        {frames && outfit.looktype > 0 ? (
          <canvas ref={canvasRef} className="w-20 h-20" aria-details={alt} />
        ) : (
          <div>{/* Include your ProgressRadial component here */}</div>
        )}
      </div>
    </div>
  );
};

export default OutfitComponent;
