import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import type { MouseEvent } from "react";
import {
  Luggage,
  GraduationCap,
  GithubIcon,
  CircleDollarSign,
  Search,
} from "lucide-react";
import { PiTelegramLogo } from "react-icons/pi";
import { Button } from "@/components/ui/Button";

type Card = {
  title: string;
  description: string;
  tech: string[];
  href: string;
  githubRef?: string;
  callToActionText?: string;
  callToActionDisabled?: boolean;
  icon: JSX.Element;
};

const cards: Card[] = [
  {
    title: "whereToEat",
    description:
      "whereToEat is a Progressive Web App that helps users filter and find places to eat, as well as attractions to visit near them! The backend is deployed as a Docker container onto DigitalOcean.",
    href: "https://wheretoeat.pages.dev/",
    tech: ["FastAPI", "Vue", "Typescript", "Docker"],
    icon: <Search className="h-full w-full stroke-1" />,
    githubRef: "https://github.com/mcmc101001/whereToEat",
  },
  {
    title: "Tripflow",
    description:
      "Tripflow is an intelligent itinerary planner that optimises travelling itineraries and recalibrates plans on the go. I am currently working on the frontend side of the mobile application, as well as leading the integration of the backend and frontend, particular in terms of making the entire application type-safe. I am also involved in ideation of the product.",
    href: "#",
    tech: [
      "React Native",
      "Expo",
      "Typescript",
      "Express.js",
      "Prisma ORM",
      "mySQL",
    ],
    icon: <Luggage className="h-full w-full stroke-1" />,
    callToActionDisabled: true,
    callToActionText: "In Progress",
  },
  {
    icon: <GraduationCap className="h-full w-full stroke-1" />,
    title: "StudyStash",
    description:
      "StudyStash is a web app that serves as a centralised database for students to share their study resources with each other, with a complete filter, rating and comment system. This project focused heavily on UI/UX, and many user tests were conducted to ensure that the app is intuitive and well-animated. Many software engineering practices were also implemented during development, such as CI/CD, automated testing, and code reviews.",
    href: "https://studystash.vercel.app/",
    githubRef: "https://github.com/mcmc101001/StudyStash",
    tech: [
      "Next.js",
      "Typescript",
      "Prisma ORM",
      "TailwindCSS",
      "Framer Motion",
      "Jest",
      "Cypress",
      "AWS S3 + Cloudfront",
      "Github Actions",
      "NextAuth",
      "mySQL",
    ],
  },
  {
    icon: <PiTelegramLogo className="h-full w-full" />,
    title: "Mahjong telegram bot",
    description:
      "A telegram bot to count points and payout in mahjong, inspired by my personal frustration of not having physical chips around when playing. I also added my personal favourite variant of three player mahjong into the bot. Hosted on an AWS EC2 instance.",
    href: "https://t.me/mahjongcounterbot",
    githubRef: "https://github.com/mcmc101001/mahjongcounter",
    tech: ["python-telegram-bot", "AWS EC2"],
  },
  {
    icon: <CircleDollarSign className="h-full w-full stroke-1" />,
    title: "Expense Tracker",
    description:
      "A telegram bot to track expenses. Expenses are recorded through a telegram bot, which can subsequently be viewed on a Django web app. The telegram bot runs alongside the Django web server, so as to utilise Django's built-in features",
    href: "https://t.me/spendlessmoneybot",
    githubRef: "https://github.com/mcmc101001/expense-tracker",
    tech: ["Django", "python-telegram-bot", "PostgreSQL", "Bootstrap"],
    callToActionDisabled: true,
    callToActionText: "Currently not deployed",
  },
];

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
    <div
      onMouseMove={handleMouseMove}
      className="group/card relative rounded-lg bg-card p-5"
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
          <Button
            disabled={callToActionDisabled}
            className="w-full text-sm md:text-lg"
          >
            {callToActionText}
          </Button>
        </a>
      </div>
    </div>
  );
}
