
import React from "react";
import { Button } from "@/components/ui/button";

interface ButtonMorphProps {
  showChoices: boolean;
  disabled?: boolean;
  onYes: () => void;
  onNo: () => void;
  onClickMe: () => void;
}

const ButtonMorph: React.FC<ButtonMorphProps> = ({
  showChoices,
  disabled = false,
  onYes,
  onNo,
  onClickMe,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-6 min-h-[44px]">
      {!showChoices ? (
        <Button
          size="lg"
          onClick={onClickMe}
          className="px-10 shadow-md bg-pink-400 text-white font-bold text-lg hover:bg-pink-500 animate-fade-in"
          disabled={disabled}
        >
          Click Me
        </Button>
      ) : (
        <>
          <Button
            size="lg"
            onClick={onYes}
            className="px-8 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold hover:bg-pink-700 transition-shadow duration-200 shadow-lg animate-fade-in"
            disabled={disabled}
          >
            Yes
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onNo}
            className="px-8 text-gray-800 font-bold bg-gray-50 hover:bg-gray-200 transition-shadow duration-200 shadow-lg animate-fade-in"
            disabled={disabled}
          >
            No
          </Button>
        </>
      )}
    </div>
  );
};

export default ButtonMorph;
