import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import type { MouseEvent } from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Card, cards } from "@/lib/constants";

export default function CardList() {
  return (
    <>
      {cards.map((card) => (
        <Card key={card.title} card={card} />
      ))}
    </>
  );
}

interface CardProps {
  card: Card;
}

function Card({ card }: CardProps) {
  const {
    title,
    description,
    tech,
    href,
    githubRef,
    callToActionDisabled = false,
    icon,
    callToActionText = "Try it now",
  } = card;

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Dialog>
      <DialogTrigger
        onMouseMove={handleMouseMove}
        className="group/card relative rounded-lg bg-card p-5 text-left"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover/card:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, hsl(0, 0%, 70%, 0.15), transparent)`,
          }}
        />
        <div className="flex h-full w-full flex-col justify-between gap-y-3 text-foreground">
          {githubRef && (
            <a className="group/github absolute right-5 top-5" href={githubRef}>
              <GithubIcon className="ml-2 h-4 w-4 text-foreground/80 group-hover/github:text-foreground/60 md:h-6 md:w-6" />
            </a>
          )}
          <div>
            <div className="h-12 w-12 rounded-full bg-primary p-2 md:h-16 md:w-16">
              <div className="h-full w-full text-card">{icon}</div>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-primary md:text-3xl">
              {title}
            </h1>
          </div>
          <p className="text-xs md:text-base">{description}</p>
          <p className="flex flex-wrap gap-x-2 text-card-foreground/60 md:gap-x-4">
            {tech.map((techItem) => (
              <span key={techItem} className="text-xs md:text-base">
                {techItem}
              </span>
            ))}
          </p>
          <a
            className={callToActionDisabled ? "pointer-events-none" : ""}
            href={href}
          >
            {/* <Button
              disabled={callToActionDisabled}
              className="w-full text-sm md:text-lg"
            >
              {callToActionText}
            </Button> */}
          </a>
        </div>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
