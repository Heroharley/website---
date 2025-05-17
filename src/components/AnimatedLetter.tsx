
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
          "absolute bottom-0 left-0 w-full rounded-b-[2.3rem] shadow-2xl border-2 transition-all duration-700 z-40",
          wider ? "h-40" : "h-56",
          valentine
            ? "bg-gradient-to-b from-[#FFDEE2] via-white to-[#fd91b4] border-pink-200"
            : "bg-white border-gray-200"
        )}
      />
      {/* Envelope top flap */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full z-40 origin-bottom transition-transform duration-700 border-2",
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
          "absolute left-[3%] px-10 flex items-center justify-center transition-all duration-700 border shadow-lg z-30",
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
    </div>
  );
};

export default AnimatedLetter;
