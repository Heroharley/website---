
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ButtonMorphProps {
  showChoices: boolean;
  disabled?: boolean;
  inputMode?: boolean;
  sending?: boolean;
  message?: string;
  onYes: () => void;
  onNo: () => void;
  onClickMe: () => void;
  onSend?: (e: React.FormEvent) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ButtonMorph: React.FC<ButtonMorphProps> = ({
  showChoices,
  disabled = false,
  inputMode = false,
  sending = false,
  message = "",
  onYes,
  onNo,
  onClickMe,
  onSend,
  onInputChange,
}) => {
  // By design, the input/send flow is now handled in AnimatedLetter file
  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-6 min-h-[44px]">
      {showChoices && (
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

