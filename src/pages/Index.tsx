
import React, { useState } from "react";
import AnimatedLetter from "@/components/AnimatedLetter";
import ButtonMorph from "@/components/ButtonMorph";
import HeartBurst from "@/components/HeartBurst";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

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
  const [messageMode, setMessageMode] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState(false);

  // Hide letter until clicked
  const handleClickMe = () => {
    setOpened(true);
    setTimeout(() => setChoices(true), 800);
  };

  // Yes: input mode enabled (letter stays up)
  const handleYes = () => {
    setResult("yes");
    setMessageMode(true);
    setChoices(false);
  };

  // No: background darkens & letter fades
  const handleNo = () => {
    setResult("no");
    setChoices(false);
    setTimeout(() => setFadeLetter(true), 1400);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // Placeholder webhook URL - replace with your actual URL
      const WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE";
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ message }),
      });
      setSentMsg(true);
      toast({
        title: "Sent!",
        description: "Your Valentine message was sent!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send. Try again soon.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const bgClass =
    result === "yes"
      ? yesBg
      : result === "no"
      ? noBg
      : baseBg;

  // Valentine-themed message and animation
  const letterMsg = (
    <span className="text-pink-700 font-valentine animate-fade-in text-center">
      Will you be my Valentine?
    </span>
  );

  // Only show letter after open
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
      {/* Heart burst goes up when sent */}
      <HeartBurst trigger={result === "yes" && (sentMsg || messageMode)} />
      <div className="w-full flex flex-col items-center justify-center z-20 px-2">
        <div style={{ minHeight: "360px", position: "relative" }}>
          <AnimatedLetter
            open={opened}
            disappear={result === "no" && fadeLetter}
            wider
            valentine
          >
            {/* Show question if not message mode */}
            {!messageMode ? (
              letterMsg
            ) : sentMsg ? (
              <span className="text-pink-700 font-bold text-xl text-center animate-fade-in">
                Thank you for your message! 💌
              </span>
            ) : (
              <form
                onSubmit={handleSend}
                className="flex flex-col items-center w-full gap-3 animate-fade-in"
                style={{ minWidth: 260, maxWidth: 350, margin: "0 auto" }}
              >
                <label className="w-full text-sm text-pink-800 mb-2 text-center">
                  Write your Valentine message
                </label>
                <Input
                  type="text"
                  value={message}
                  className="w-full rounded-xl border-2 border-pink-100 bg-white/95 text-pink-800 placeholder:text-pink-300 px-4 py-2 focus:ring-2 focus:ring-pink-300 text-base transition-all"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here…"
                  disabled={sending || sentMsg}
                  maxLength={200}
                  autoFocus
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-400/90 to-pink-700 text-white font-bold hover:from-pink-500 hover:to-rose-500 transition-all duration-200 shadow-lg"
                  disabled={sending || sentMsg}
                >
                  {sending ? "Sending..." : "Send"}
                </Button>
              </form>
            )}
          </AnimatedLetter>
        </div>

        {/* Letter is hidden until open */}
        {!opened && (
          <Button
            size="lg"
            onClick={handleClickMe}
            className="px-10 shadow-xl bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 hover:scale-105 transition-all duration-200 animate-fade-in mt-10"
          >
            Click Me
          </Button>
        )}

        {/* Show Yes/No only at decision time */}
        {opened && choices && !messageMode && (
          <ButtonMorph
            showChoices
            disabled={fadeLetter}
            onClickMe={handleClickMe}
            onYes={handleYes}
            onNo={handleNo}
            // below are ignored in this case
            onSend={() => {}}
            onInputChange={() => {}}
            message={message}
            inputMode={false}
            sending={false}
          />
        )}

        {/* Result message after yes/no or after send */}
        {(result !== null || sentMsg) && (
          <div className="mt-7 text-xl font-semibold transition-all duration-500 animate-fade-in drop-shadow-sm text-center">
            {result === "yes"
              ? sentMsg
                ? "💗 Message delivered!"
                : ""
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

