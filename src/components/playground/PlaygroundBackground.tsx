import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";

const SWITCHING_INTERVAL = 2000;

type PlaygroundBackground =
  | "PURPLE"
  | "RED"
  | "BLUE"
  | "GREEN"
  | "YELLOW"
  | "SKY"
  | "TEAL"
  | "PINK"
  | "ORANGE"
  | "NEUTRAL";

export default function PlaygroundBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const COLOURS: PlaygroundBackground[] = [
    "PURPLE",
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW",
    "SKY",
    "TEAL",
    "PINK",
    "ORANGE",
    "NEUTRAL",
  ];

  const [background, setBackground] = useState<PlaygroundBackground>(
    COLOURS[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const current = COLOURS.indexOf(background);
      const next = (current + 1) % COLOURS.length;
      setBackground(COLOURS[next]);
    }, SWITCHING_INTERVAL);
    return () => clearInterval(interval);
  }, [background]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <div
        className={cn(
          "fixed -z-50 inset-0 transition-colors duration-700 opacity-25",
          {
            "bg-purple-300": background === "PURPLE",
            "bg-red-300": background === "RED",
            "bg-blue-300": background === "BLUE",
            "bg-green-300": background === "GREEN",
            "bg-yellow-300": background === "YELLOW",
            "bg-sky-300": background === "SKY",
            "bg-teal-300": background === "TEAL",
            "bg-pink-300": background === "PINK",
            "bg-orange-300": background === "ORANGE",
            "bg-neutral-300": background === "NEUTRAL",
          }
        )}
        style={{
          backgroundImage: `radial-gradient(800px circle at top, hsl(var(--background) / 0.4), hsl(var(--background)))`,
          backgroundSize: "cover",
        }}
      />
      <div
        className="fixed -z-50 inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: "30px",
        }}
      />
      {children}
    </div>
  );
}
