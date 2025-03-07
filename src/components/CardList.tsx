import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { type Card, cards } from "@/lib/constants";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
    id,
    imgSrc,
    callToActionText = "Try it now",
  } = card;

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [open, setOpen] = useState(false);

  const onOpenChange = async (isOpen: boolean) => {
    if (!document.startViewTransition) {
      setOpen(isOpen);
      return;
    }

    const cardBodies = document.querySelectorAll(
      ".card-body",
    ) as NodeListOf<HTMLElement>;

    const cardTitles = document.querySelectorAll(
      ".card-title",
    ) as NodeListOf<HTMLElement>;

    const cardTechs = document.querySelectorAll(
      ".card-tech",
    ) as NodeListOf<HTMLElement>;

    cardBodies.forEach((cardBody) => {
      if (cardBody.id === `card-body-${id}`) {
        cardBody.style.viewTransitionName = "card-body";
      } else {
        cardBody.style.viewTransitionName = "";
      }
    });

    cardTitles.forEach((cardTitle) => {
      if (cardTitle.id === `card-title-${id}`) {
        cardTitle.style.viewTransitionName = "card-title";
      } else {
        cardTitle.style.viewTransitionName = "";
      }
    });

    cardTechs.forEach((cardTech) => {
      if (cardTech.id === `card-tech-${id}`) {
        cardTech.style.viewTransitionName = "card-tech";
      } else {
        cardTech.style.viewTransitionName = "";
      }
    });

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setOpen(isOpen);
      });
    });

    await transition.finished;
    if (isOpen) return;
    cardBodies.forEach(
      (cardBody) => (cardBody.style.viewTransitionName = "card-body"),
    );
    cardTitles.forEach(
      (cardTitle) => (cardTitle.style.viewTransitionName = "card-title"),
    );
    cardTechs.forEach(
      (cardTech) => (cardTech.style.viewTransitionName = "card-tech"),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger onMouseMove={handleMouseMove} className="h-full w-full">
        <div className="group/card relative h-full w-full rounded-lg bg-card p-5 text-left">
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover/card:opacity-100"
            style={{
              background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, hsl(0, 0%, 70%, 0.15), transparent)`,
            }}
          />
          {!open ? (
            <PlainCard viewTransitionAble card={card} />
          ) : (
            <PlainCard
              viewTransitionAble={false}
              className="opacity-30"
              card={card}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="border-0 bg-card">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        <div
          className="flex h-full w-full flex-col justify-between gap-y-3 text-foreground"
          style={{
            viewTransitionName: `card-body`,
          }}
        >
          <div>
            {imgSrc ? (
              <img
                className="h-12 w-12 rounded-full bg-primary p-2 md:h-16 md:w-16"
                src={imgSrc}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-primary p-2 md:h-16 md:w-16">
                <div className="h-full w-full text-card">{icon}</div>
              </div>
            )}
            <h1
              style={{
                viewTransitionName: `card-title`,
              }}
              className="mt-2 text-xl font-semibold text-primary md:text-3xl"
            >
              {title}
            </h1>
          </div>
          <p className="text-xs md:text-base">{description}</p>
          <p
            style={{
              viewTransitionName: `card-tech`,
            }}
            className="flex flex-wrap gap-x-2 text-card-foreground/60 md:gap-x-4"
          >
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
            <Button
              disabled={callToActionDisabled}
              className="w-full text-sm md:text-lg"
            >
              {callToActionText}
            </Button>
          </a>
          {githubRef && (
            <a href={githubRef}>
              <Button className="w-full text-sm md:text-lg">View Github</Button>
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PlainCardProps extends React.HTMLAttributes<HTMLElement>, CardProps {
  viewTransitionAble: boolean;
}

function PlainCard({ className, card, viewTransitionAble }: PlainCardProps) {
  const { title, description, tech, githubRef, icon, id, imgSrc } = card;

  return (
    <div
      className={cn(
        `flex h-full w-full flex-col justify-between gap-y-3 text-foreground ` +
          (viewTransitionAble ? "card-body" : ""),
        className,
      )}
      id={viewTransitionAble ? `card-body-${id}` : ""}
      style={{
        viewTransitionName: viewTransitionAble ? `card-body` : "",
      }}
    >
      {githubRef && (
        <a
          className="group/github absolute right-5 top-5"
          href={githubRef}
          onClick={(e) => e.stopPropagation()}
        >
          <GithubIcon className="ml-2 h-4 w-4 text-foreground/80 group-hover/github:text-foreground/60 md:h-6 md:w-6" />
        </a>
      )}
      <div>
        {imgSrc ? (
          <img
            className="h-12 w-12 rounded-full bg-primary p-2 md:h-16 md:w-16"
            src={imgSrc}
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary p-2 md:h-16 md:w-16">
            <div className="h-full w-full text-card">{icon}</div>
          </div>
        )}
        <h1
          id={viewTransitionAble ? `card-title-${id}` : ""}
          style={{
            viewTransitionName: viewTransitionAble ? `card-title` : "",
          }}
          className={
            "mt-2 text-xl font-semibold text-primary md:text-3xl " +
            (viewTransitionAble ? "card-title" : "")
          }
        >
          {title}
        </h1>
      </div>
      {/* <p className="text-xs md:text-base">{description}</p> */}
      <p
        id={viewTransitionAble ? `card-tech-${id}` : ""}
        style={{
          viewTransitionName: viewTransitionAble ? `card-tech` : "",
        }}
        className={
          "flex flex-wrap gap-x-2 text-card-foreground/60 md:gap-x-4 " +
          (viewTransitionAble ? "card-tech" : "")
        }
      >
        {tech.map((techItem) => (
          <span key={techItem} className="text-xs md:text-base">
            {techItem}
          </span>
        ))}
      </p>
      <Button asChild className="w-full text-sm md:text-lg">
        <div>See More</div>
      </Button>
    </div>
  );
}
