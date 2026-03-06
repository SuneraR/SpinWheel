import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { motion } from 'motion/react';

interface SpinWheelProps {
  onSpinComplete: (segment: number) => void;
  isSpinning: boolean;
}

const SEGMENTS = 8;
const COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#A8E6CF', // mint
  '#FF8B94', // pink
  '#95E1D3', // cyan
  '#FFA07A', // salmon
  '#DDA0DD', // plum
];

export default function SpinWheel({ onSpinComplete, isSpinning }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(320);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);

  // Keep the wheel size responsive to its container and allow larger displays.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
      // Reserve space for heading and button; use at most 55% of vh and 60% of vw.
      const vwTarget = vw * 0.60;
      const vhTarget = vh * 0.55;
      const next = Math.min(vwTarget, vhTarget);
      setSize(Math.max(260, next));
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Match canvas pixel ratio for crispness on high-DPI screens.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    const anglePerSegment = (2 * Math.PI) / SEGMENTS;

    for (let i = 0; i < SEGMENTS; i++) {
      const startAngle = i * anglePerSegment - Math.PI / 2;
      const endAngle = startAngle + anglePerSegment;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = Math.max(2, radius * 0.006);
      ctx.stroke();

      // Draw number
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2 + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.round(radius * 0.12)}px sans-serif`;
      ctx.fillText((i + 1).toString(), 0, -radius * 0.65);
      ctx.restore();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [rotation, size]);

  useEffect(() => {
    if (!isSpinning) return;

    const targetRotation = rotationRef.current + 360 * 5 + Math.random() * 360;
    rotationRef.current = targetRotation;
    setRotation(targetRotation);

    // Wait slightly longer than the animation duration so the wheel has fully settled.
    const timer = setTimeout(() => {
      const segmentAngle = 360 / SEGMENTS;
      // Normalise the final angle to [0, 360).
      const finalAngle = ((targetRotation % 360) + 360) % 360;
      const pointerAngle = (360 - finalAngle + 360) % 360;
      const selectedSegment = Math.floor(pointerAngle / segmentAngle) % SEGMENTS;
      onSpinComplete(selectedSegment + 1);
    }, 4200);

    return () => clearTimeout(timer);
  }, [isSpinning, onSpinComplete]);

  return (
    <div ref={containerRef} className="relative w-full mx-auto flex flex-col items-center">
      {/* Pointer at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-0 h-0 border-l-[16px] md:border-l-[22px] xl:border-l-[30px] 2xl:border-l-[40px] border-l-transparent border-r-[16px] md:border-r-[22px] xl:border-r-[30px] 2xl:border-r-[40px] border-r-transparent border-t-[26px] md:border-t-[34px] xl:border-t-[48px] 2xl:border-t-[64px] border-t-red-500 drop-shadow-lg"></div>
      </div>

      <motion.canvas
        ref={canvasRef}
        className="drop-shadow-2xl block"
        animate={{ rotate: rotation }}
        transition={{
          duration: 4,
          ease: [0.17, 0.67, 0.16, 0.99],
          type: 'tween',
        }}
      />
    </div>
  );
}
