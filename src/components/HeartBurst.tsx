
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartType {
  left: number;
  delay: number;
  size: number;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateHearts = (count = 14): HeartType[] =>
  Array.from({ length: count }).map(() => ({
    left: random(10, 90),
    delay: random(0, 800),
    size: random(24, 42),
  }));

const HeartBurst: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const [hearts, setHearts] = useState<HeartType[]>([]);

  useEffect(() => {
    if (trigger) setHearts(generateHearts());
    else setHearts([]);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 w-full h-full z-50 overflow-hidden">
      {hearts.map((h, idx) => (
        <span
          key={idx}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "120px",
            animation: "heart-burst 1.8s cubic-bezier(.52,.2,.16,1) both",
            animationDelay: `${h.delay}ms`,
            zIndex: 60,
          }}
        >
          <Heart
            size={h.size}
            color="#FF89A2"
            fill="#FFDEE2"
            strokeWidth={1.3}
            className="drop-shadow-xl"
          />
        </span>
      ))}
      <style>
        {`
        @keyframes heart-burst {
          0%   { transform: translateY(0) scale(0.8) rotate(-8deg); opacity: 1; }
          40%  { transform: translateY(-80px) scale(1.1) rotate(6deg); opacity: 1; }
          70%  { transform: translateY(-240px) scale(1.05) rotate(-3deg); opacity: 0.85; }
          100% { transform: translateY(-340px) scale(0.6) rotate(13deg); opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default HeartBurst;
