import { Cpu, Database } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useState } from "react";
import { PiTelegramLogo } from "react-icons/pi";
import { TbBrandFramerMotion, TbBrandCypress } from "react-icons/tb";
import {
  SiPrisma,
  SiAstro,
  SiAmazonec2,
  SiAmazons3,
  SiGithubactions,
  SiZod,
} from "react-icons/si";
import DraggableWrapper from "../playground/DraggableWrapper";
import useIsMobile from "@/hooks/useIsMobile";

function arrayToIcons(
  array: { name: string; icon: JSX.Element }[],
  tooltipOpenName: string,
  setTooltipOpenName: (value: React.SetStateAction<string>) => void
) {
  return array.map((technical) => (
    <TooltipProvider key={technical.name} delayDuration={0}>
      <Tooltip
        open={tooltipOpenName === technical.name}
        onOpenChange={(open) => {
          if (open) setTooltipOpenName(technical.name);
          if (!open) setTooltipOpenName("");
        }}
      >
        <TooltipTrigger
          onClick={() => setTooltipOpenName(technical.name)}
          asChild
          className="hover:text-primary text-accent transition-transform hover:-translate-y-2 z-40"
        >
          <div>
            <div className="flex flex-col items-center gap-y-1 text-6xl">
              {technical.icon}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={12}>
          <div className="text-lg">{technical.name}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ));
}

const LANGUAGES = [
  { name: "C", icon: <i className="devicon-c-plain" /> },
  { name: "C++", icon: <i className="devicon-cplusplus-plain" /> },
  { name: "JavaScript", icon: <i className="devicon-javascript-plain" /> },
  { name: "TypeScript", icon: <i className="devicon-typescript-plain" /> },
  { name: "Python", icon: <i className="devicon-python-plain" /> },
  { name: "Java", icon: <i className="devicon-java-plain" /> },
  { name: "HTML", icon: <i className="devicon-html5-plain" /> },
  { name: "CSS", icon: <i className="devicon-css3-plain" /> },
  { name: "Verilog", icon: <Cpu className="h-16 w-16" /> },
  { name: "SQL", icon: <Database className="opacity-100 h-16 w-16" /> },
];

const LIBRARIES = [
  {
    name: "React/React Native",
    icon: <i className="devicon-react-original" />,
  },
  { name: "Next.js", icon: <i className="devicon-nextjs-original" /> },
  { name: "Django", icon: <i className="devicon-django-plain" /> },
  {
    name: "python-telegram-bot",
    icon: <PiTelegramLogo className="h-16 w-16" />,
  },
  { name: "TailwindCSS", icon: <i className="devicon-tailwindcss-plain" /> },
  {
    name: "Framer motion",
    icon: <TbBrandFramerMotion className="h-16 w-16" />,
  },
  {
    name: "Zod",
    icon: <SiZod className="h-16 w-16" />,
  },
  { name: "Astro", icon: <SiAstro className="h-16 w-16" /> },
  { name: "Jest", icon: <i className="devicon-jest-plain" /> },
  { name: "Cypress", icon: <TbBrandCypress className="h-16 w-16" /> },
  { name: "Prisma ORM", icon: <SiPrisma className="h-16 w-16" /> },
];

const TOOLS = [
  { name: "AWS EC2", icon: <SiAmazonec2 className="h-16 w-16" /> },
  { name: "AWS S3 + Cloudfront", icon: <SiAmazons3 className="h-16 w-16" /> },
  { name: "Git", icon: <i className="devicon-git-plain" /> },
  { name: "GitHub Actions", icon: <SiGithubactions className="h-16 w-16" /> },
  { name: "LaTeX", icon: <i className="devicon-latex-plain" /> },
];

export default function Skillset() {
  const isMobile = useIsMobile();

  const [tooltipOpenName, setTooltipOpenName] = useState("");

  return (
    <div className="flex flex-col gap-12">
      <DraggableWrapper dragId="skillsetLanguages" isDraggable={!isMobile}>
        <div className="text-xl font-medium">LANGUAGES</div>
        <div className="flex flex-row flex-wrap gap-8 mt-6">
          {arrayToIcons(LANGUAGES, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>

      <DraggableWrapper dragId="skillsetLibraries" isDraggable={!isMobile}>
        <div className="text-xl font-medium">LIBRARIES & FRAMEWORKS</div>
        <div className="flex flex-row flex-wrap gap-8 mt-6">
          {arrayToIcons(LIBRARIES, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>

      <DraggableWrapper dragId="skillsetTools" isDraggable={!isMobile}>
        <div className="text-xl font-medium">TOOLS</div>
        <div className="flex flex-row flex-wrap gap-8 mt-6">
          {arrayToIcons(TOOLS, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>
    </div>
  );
}
