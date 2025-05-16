
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLetterProps {
  open: boolean;
  disappear: boolean;
  wider?: boolean;
  valentine?: boolean;
  children?: React.ReactNode;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  open,
  disappear,
  wider = false,
  valentine = false,
  children,
}) => {
  // Upgraded colors & width, bold Valentine look
  return (
    <div
      className={cn(
        "relative mx-auto flex items-center justify-center transition-all duration-700",
        wider ? "w-[420px] md:w-[540px] h-64" : "w-72 h-48",
        disappear
          ? "opacity-0 scale-90 pointer-events-none transition-all duration-700"
          : "opacity-100"
      )}
      style={{ zIndex: 10 }}
    >
      {/* Envelope bottom */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full rounded-b-[2.3rem] shadow-2xl border-2 transition-all duration-700",
          wider ? "h-56" : "h-32",
          valentine
            ? "bg-gradient-to-b from-[#FFDEE2] via-white to-[#fd91b4] border-pink-200"
            : "bg-white border-gray-200"
        )}
      />
      {/* Envelope top flap */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full z-30 origin-bottom transition-transform duration-700 border-2",
          valentine
            ? "bg-gradient-to-b from-pink-400 to-pink-100 border-pink-200"
            : "bg-gradient-to-b from-pink-100 to-white border-gray-200",
          wider ? "h-40 rounded-t-3xl" : "h-28 rounded-t-2xl"
        )}
        style={{
          transform: open
            ? "rotateX(75deg) translateY(-56px) scaleY(0.95)"
            : "rotateX(0deg) translateY(0px)",
          transition: "transform 700ms cubic-bezier(.4,2,.65,1)",
        }}
      />
      {/* Letter inside the envelope */}
      <div
        className={cn(
          "absolute left-[3%] px-10 flex items-center justify-center transition-all duration-700 border shadow-lg z-40",
          wider
            ? "top-8 w-[94%] h-48 rounded-[34px]"
            : "top-7 w-[92%] h-32 rounded-xl",
          valentine
            ? "bg-gradient-to-br from-white to-pink-50 border-pink-100"
            : "bg-white border-gray-100",
          open
            ? "translate-y-[-77px] scale-100 opacity-100"
            : "translate-y-[-14px] scale-95 opacity-90"
        )}
        style={{
          transition: "all 700ms cubic-bezier(.4,2,.65,1)",
        }}
      >
        <div className="font-semibold text-lg text-gray-700 w-full">{children}</div>
      </div>
      {/* Valentine heart border & decor */}
      {valentine && (
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-20">
          <svg width="100%" height="100%" viewBox="0 0 415 260" className="absolute opacity-70">
            {/* Decorative edge */}
            <polyline
              points="4,36 206,136 410,36"
              fill="none"
              stroke="#ff91b3"
              strokeWidth="6"
            />
            {/* Pink hearts on the fold */}
            {[54, 105, 210, 315, 370].map((x, i) => (
              <g key={i}>
                <path
                  d="M6 6 C10 0, 20 0, 20 6 Q18 14, 13 22 Q8 14, 6 6 Z"
                  fill="#FF89A2"
                  transform={`translate(${x-13},12) scale(${i%2===0?0.7:1})`}
                  opacity="0.8"
                />
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default AnimatedLetter;
