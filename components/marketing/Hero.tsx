'use client';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


function Hero() {
  const phrases = ["Iterations", "Design At Your Fingertips", "By Programmers For Programmers", "Two Foots On My Feet"];
  const [displayText, setDisplayText] = useState<string>("");
  const [finishedWriting, setFinishedWriting] = useState<boolean>(true);

  useEffect(() => {
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseDelay = 1200;
    const blinkSpeed = 350;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let cursorBlinkInterval: ReturnType<typeof setInterval> | undefined;

    const handleTyping = (currentCharIndex: number, currentPhraseIndex: number, deletingState: boolean) => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!deletingState) {
        setDisplayText(currentPhrase.slice(0, currentCharIndex + 1));

        if (currentCharIndex + 1 === currentPhrase.length) {
          // reached the end of the phrase
          timeout = setTimeout(() => {
            handleTyping(currentCharIndex, currentPhraseIndex, true);
          }, pauseDelay);
          cursorBlinkInterval = setInterval(() => setFinishedWriting((prev) => !prev), blinkSpeed)
        } else {
          // we are currently typing
          timeout = setTimeout(() => {
            handleTyping(currentCharIndex + 1, currentPhraseIndex, false);
          }, typingSpeed);
          setFinishedWriting(false);
          clearInterval(cursorBlinkInterval);
        }
      } else {
        setDisplayText(currentPhrase.slice(0, currentCharIndex - 1));
        
        if (currentCharIndex - 1 === 0) {
          const nextIndex = (currentPhraseIndex + 1) % phrases.length;
          timeout = setTimeout(() => {
            handleTyping(0, nextIndex, false);
          }, typingSpeed);
          clearInterval(cursorBlinkInterval);

          setFinishedWriting(false);
        } else {
          timeout = setTimeout(() => {
            handleTyping(currentCharIndex - 1, currentPhraseIndex, true);
          }, deletingSpeed);
          clearInterval(cursorBlinkInterval)
          setFinishedWriting(false);
        }
      }
    };

    timeout = setTimeout(() => {
      handleTyping(0, 0, false);
    }, typingSpeed);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorBlinkInterval)
    };
  }, [phrases.length]);

  return (
    <div className="">
      <div className="bg-white text-black dark:bg-black dark:text-white h-screen flex items-center justify-center">
        <div className="flex items-center flex-col ">
          <div className="flex-col items-center">
            <div>
              <h1 className="text-5xl -mt-30">
                {">"}{displayText}
                <span className={finishedWriting ? "opacity-0" : "opacity-100"}>|</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-4 ">
            <Button className="">Features</Button>
            <Button className=" ">Get Started</Button></div>
          <div className="text-gray-500 mt-10">
            Click Get Started or CTRL + Y to open the command window.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero
