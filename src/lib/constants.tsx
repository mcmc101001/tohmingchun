import {
  Luggage,
  GraduationCap,
  CircleDollarSign,
  Search,
  Palette,
} from "lucide-react";
import { PiTelegramLogo } from "react-icons/pi";

export type Card = {
  title: string;
  description: string;
  tech: string[];
  href: string;
  githubRef?: string;
  callToActionText?: string;
  callToActionDisabled?: boolean;
  icon: JSX.Element;
};

export const cards: Card[] = [
  {
    title: "AI Icon Generator",
    description:
      "AI Icon Generator is a SaaS that utilises DALL-E to generate icons with a high degree of user customisation. It is built with Next.js and deployed fully on AWS using SST.",
    href: "https://aiicongen.com/",
    tech: [
      "Next.js",
      "Typescript",
      "Prisma ORM",
      "TailwindCSS",
      "AWS",
      "NextAuth",
      "Supabase",
      "SST",
    ],
    icon: <Palette className="h-full w-full stroke-1" />,
  },
  {
    title: "whereToEat",
    description:
      "whereToEat is a Progressive Web App that helps users filter and find places to eat, as well as attractions to visit near them! The backend is deployed as a Docker container onto DigitalOcean.",
    href: "https://wheretoeat.pages.dev/",
    tech: ["FastAPI", "Vue", "Typescript", "TailwindCSS", "Docker"],
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
