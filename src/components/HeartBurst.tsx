
import React, { useEffect, useState } from "react";

// CUSTOM heart shape using SVG, pink-red with white stroke
const CustomHeart: React.FC<{ size: number; style?: React.CSSProperties }> = ({
  size,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 40"
    fill="none"
    style={style}
  >
    <path
      d="M22 38s-13.43-10.39-17.22-16.01C1.08 15.47 3.38 8.5 10.46 8.5c3.98 0 6.53 3.15 7.41 4.55C18.75 10.48 21.34 7.5 26.01 7.5c6.72 0 9.08 7.03 5.82 13.5C35.43 27.61 22 38 22 38Z"
      fill="url(#heartGradient)"
      stroke="#fff"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="heartGradient" x1="22" y1="6" x2="22" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff82a9" />
        <stop offset="0.7" stopColor="#ea384c" />
        <stop offset="1" stopColor="#ffdee2" />
      </linearGradient>
    </defs>
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

const generateHearts = (count = 15): HeartType[] =>
  Array.from({ length: count }).map(() => ({
    left: random(10, 90),
    delay: random(0, 700),
    size: random(28, 50),
    upSpeed: random(1600, 2200), // ms
    sideDrift: random(-25, 25),
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
            bottom: "140px",
            animation: `heart-balloon ${h.upSpeed}ms cubic-bezier(.3,.4,.39,1) both`,
            animationDelay: `${h.delay}ms`,
            zIndex: 60,
            willChange: "transform, opacity",
          }}
        >
          <CustomHeart size={h.size} />
        </span>
      ))}
      {/* Keyframe for upward float and a little wobble */}
      <style>
        {`
        @keyframes heart-balloon {
          0%   { transform: translateY(0) scale(0.92) rotate(-6deg); opacity: 1; }
          8%   { transform: translateY(-15px) scale(1.15) rotate(0deg); }
          20%  { opacity: 1; }
          55%  { transform: translateY(-140px) scale(0.95) rotate(8deg); opacity: 0.88;}
          75%  { transform: translateY(-290px) scale(1.07) rotate(-8deg); }
          100% { transform: translateY(-360px) scale(0.9) rotate(8deg); opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default HeartBurst;

