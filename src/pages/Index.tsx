
import React, { useState } from "react";
import AnimatedLetter from "@/components/AnimatedLetter";
import ButtonMorph from "@/components/ButtonMorph";
import HeartBurst from "@/components/HeartBurst";
import RainCloud from "@/components/RainCloud";
import { cn } from "@/lib/utils";

const baseBg = "bg-gradient-to-br from-white via-pink-50 to-pink-100";
const yesBg =
  "bg-gradient-to-br from-[#FFDEE2] via-[#ffdee2] to-[#ea384c] transition-all duration-700";
const noBg =
  "bg-gradient-to-br from-[#1a1f2c] via-[#221f26] to-[#333333] transition-all duration-700";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [choices, setChoices] = useState(false);
  const [result, setResult] = useState<"yes" | "no" | null>(null);
  const [fadeLetter, setFadeLetter] = useState(false);

  // When user clicks "Click Me"
  const handleClickMe = () => {
    setOpened(true);
    setTimeout(() => setChoices(true), 800);
  };

  // When user clicks "Yes"
  const handleYes = () => {
    setResult("yes");
    setFadeLetter(false);
  };

  // When user clicks "No"
  const handleNo = () => {
    setResult("no");
    setTimeout(() => setFadeLetter(true), 1500); // fade letter out after rain
  };

  const bgClass =
    result === "yes"
      ? yesBg
      : result === "no"
      ? noBg
      : baseBg;

  // Letter Content (message)
  const letterMsg = (
    <>
      <span className="block animate-fade-in text-center">
        Will you be my Valentine?
      </span>
    </>
  );

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center transition-all duration-700",
        bgClass
      )}
      style={{
        transition: "background 0.6s cubic-bezier(.4,2,.65,1)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
      }}
    >
      <HeartBurst trigger={result === "yes"} />
      <div className="w-full flex flex-col items-center justify-center z-20 px-2">
        <div style={{ minHeight: "290px", position: "relative" }}>
          {/* Rain cloud appears above the letter */}
          <RainCloud raining={result === "no" && !fadeLetter} />
          <AnimatedLetter open={opened} disappear={fadeLetter}>
            {letterMsg}
          </AnimatedLetter>
        </div>

        <ButtonMorph
          showChoices={opened && choices && result === null}
          disabled={fadeLetter}
          onClickMe={handleClickMe}
          onYes={handleYes}
          onNo={handleNo}
        />

        {/* Yes/No choices fade away after animation */}
        {result !== null && (
          <div className="mt-7 text-xl font-semibold transition-all duration-500 animate-fade-in drop-shadow-sm text-center">
            {result === "yes"
              ? "Yay! 💖"
              : result === "no"
              ? "Awww... Maybe next time."
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
