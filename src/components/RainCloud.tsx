
import React from "react";
import { CloudRain } from "lucide-react";

const Raindrop: React.FC<{ delay: number; left: number }> = ({ delay, left }) => (
  <div
    className="absolute"
    style={{
      left: `${left}%`,
      top: "58px",
      animation: `rain-drop-fall 1.35s ${delay}ms ease-in forwards`,
      zIndex: 70,
    }}
  >
    <div className="w-1 h-5 rounded-full bg-blue-400 opacity-70" />
  </div>
);

const RainCloud: React.FC<{ raining: boolean }> = ({ raining }) => {
  // Evenly spaced raindrops
  const drops = Array.from({ length: 10 }).map((_, i) => ({
    delay: i * 120 + Math.floor(Math.random() * 30),
    left: 16 + i * 7,
  }));

  return raining ? (
    <div className="absolute left-1/2 top-2 -translate-x-1/2 z-50 animate-fade-in">
      <CloudRain color="#7999b9" size={52} strokeWidth={1.6} />
      <div className="absolute w-full" style={{ width: 92 }}>
        {drops.map((d, i) => (
          <Raindrop key={i} delay={d.delay} left={d.left} />
        ))}
      </div>
      <style>
        {`
        @keyframes rain-drop-fall {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(60px); opacity: 0.1; }
        }
        `}
      </style>
    </div>
  ) : null;
};

export default RainCloud;
