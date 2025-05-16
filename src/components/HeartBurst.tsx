
import React, { useEffect, useState } from "react";

// Upgraded custom Valentine heart (balloon gradient)
const CustomHeart: React.FC<{ size: number; style?: React.CSSProperties }> = ({
  size,
  style,
}) => (
  <svg
    width={size}
    height={size + 18}
    viewBox="0 0 44 54"
    fill="none"
    style={style}
  >
    {/* Heart shape with vertical balloon string */}
    <defs>
      <linearGradient id="balloonHeart" x1="22" y1="6" x2="22" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffbedf" />
        <stop offset="0.6" stopColor="#fd497a" />
        <stop offset="1" stopColor="#ea384c" />
      </linearGradient>
      <linearGradient id="balloonString" x1="0" y1="0" x2="0" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fb7ea6" />
        <stop offset="1" stopColor="#fff" />
      </linearGradient>
    </defs>
    <path
      d="M22 38s-13.43-10.39-17.22-16.01C1.08 15.47 3.38 8.5 10.46 8.5c3.98 0 6.53 3.15 7.41 4.55C18.75 10.48 21.34 7.5 26.01 7.5c6.72 0 9.08 7.03 5.82 13.5C35.43 27.61 22 38 22 38Z"
      fill="url(#balloonHeart)"
      stroke="#fff"
      strokeWidth="2"
      filter="drop-shadow(0 2px 8px #f7bad820)"
    />
    {/* Balloon string */}
    <path
      d="M22 38 C21 45, 22 50, 22 54"
      stroke="url(#balloonString)"
      strokeWidth="2"
      opacity="0.85"
      fill="none"
    />
  </svg>
);

interface HeartType {
  left: number;
  delay: number;
  size: number;
  upSpeed: number;
  sideDrift: number;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateHearts = (count = 14): HeartType[] =>
  Array.from({ length: count }).map(() => ({
    left: random(8, 92),
    delay: random(0, 600),
    size: random(38, 55),
    upSpeed: random(1700, 2500),
    sideDrift: random(-36, 36),
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
            bottom: "130px",
            animation: `balloon-heart-up ${h.upSpeed}ms cubic-bezier(.3,.4,.39,1) both`,
            animationDelay: `${h.delay}ms`,
            zIndex: 60,
            willChange: "transform, opacity",
          }}
        >
          <CustomHeart size={h.size} />
        </span>
      ))}
      <style>
        {`
        @keyframes balloon-heart-up {
          0%   { transform: translateY(0) scale(0.92) rotate(-6deg); opacity: 1; }
          8%   { transform: translateY(-22px) scale(1.11) rotate(2deg); }
          18%  { transform: translateY(-45px) scale(1.07) rotate(0deg);}
          40%  { opacity: 1; }
          53%  { transform: translateY(-177px) scale(0.97) rotate(7deg); opacity: 0.96;}
          70%  { transform: translateY(-258px) scale(1.10) rotate(-7deg); }
          100% { transform: translateY(-380px) scale(0.93) rotate(8deg); opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default HeartBurst;
