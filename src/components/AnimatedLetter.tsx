
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLetterProps {
  open: boolean;
  disappear: boolean;
  children?: React.ReactNode;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ open, disappear, children }) => {
  return (
    <div
      className={cn(
        "relative w-64 h-44 mx-auto flex items-center justify-center transition-all duration-700",
        disappear
          ? "opacity-0 scale-90 pointer-events-none transition-all duration-700"
          : "opacity-100"
      )}
      style={{ zIndex: 10 }}
    >
      {/* Envelope bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-b-2xl shadow-lg z-10 border-2 border-gray-200" />
      {/* Envelope top flap */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-pink-100 to-white rounded-t-2xl z-30 origin-bottom transition-transform duration-700 border-2 border-gray-200",
          open ? "-rotate-x-75" : ""
        )}
        style={{
          transform: open
            ? "rotateX(75deg) translateY(-40px) scaleY(0.9)"
            : "rotateX(0deg) translateY(0px)"
        }}
      />
      {/* Letter inside the envelope */}
      <div
        className={cn(
          "absolute top-7 left-2 w-[92%] h-32 bg-white rounded-xl shadow-lg z-40 px-6 flex items-center justify-center transition-all duration-700 border border-gray-100",
          open
            ? "translate-y-[-65px] scale-100 opacity-100"
            : "translate-y-[-12px] scale-95 opacity-90"
        )}
        style={{
          transition: "all 700ms cubic-bezier(.4,2,.65,1)",
        }}
      >
        <div className="font-semibold text-lg text-gray-700">{children}</div>
      </div>
      {/* Envelope border/fold lines */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 300 200" className="absolute">
          <polyline
            points="0,30 150,120 300,30"
            fill="none"
            stroke="#fda4af"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedLetter;
