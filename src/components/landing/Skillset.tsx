import { Cpu, Database } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useState } from "react";
import { TbBrandFramerMotion, TbBrandCypress } from "react-icons/tb";
import {
  SiPrisma,
  SiAstro,
  SiAmazonec2,
  SiAmazons3,
  SiGithubactions,
  SiZod,
  SiDocker,
  SiSpring,
  SiSupabase,
  SiStripe,
  SiSwagger,
  SiSst,
  SiKotlin,
  SiStorybook,
} from "react-icons/si";
import DraggableWrapper from "../playground/DraggableWrapper";
import useIsMobile from "@/hooks/useIsMobile";

function arrayToIcons(
  array: { name: string; icon: JSX.Element }[],
  tooltipOpenName: string,
  setTooltipOpenName: (value: React.SetStateAction<string>) => void,
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
          className="z-40 text-accent transition-transform hover:-translate-y-2 hover:text-primary"
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
  { name: "Python", icon: <i className="devicon-python-plain" /> },
  { name: "Golang", icon: <i className="devicon-go-plain" /> },
  { name: "JavaScript", icon: <i className="devicon-javascript-plain" /> },
  { name: "TypeScript", icon: <i className="devicon-typescript-plain" /> },
  { name: "C", icon: <i className="devicon-c-plain" /> },
  { name: "C++", icon: <i className="devicon-cplusplus-plain" /> },
  { name: "Java", icon: <i className="devicon-java-plain" /> },
  { name: "Kotlin", icon: <SiKotlin className="h-16 w-16" /> },
  { name: "HTML", icon: <i className="devicon-html5-plain" /> },
  { name: "CSS", icon: <i className="devicon-css3-plain" /> },
  { name: "Verilog", icon: <Cpu className="h-16 w-16" /> },
  { name: "SQL", icon: <Database className="h-16 w-16 opacity-100" /> },
];

const LIBRARIES = [
  {
    name: "React/React Native",
    icon: <i className="devicon-react-original" />,
  },
  { name: "Next.js", icon: <i className="devicon-nextjs-original" /> },
  {
    name: "Vue",
    icon: <i className="devicon-vuejs-plain"></i>,
  },
  { name: "FastAPI", icon: <i className="devicon-fastapi-plain" /> },
  { name: "Django", icon: <i className="devicon-django-plain" /> },
  { name: "Spring Boot", icon: <SiSpring className="h-16 w-16" /> },
  { name: "TailwindCSS", icon: <i className="devicon-tailwindcss-plain" /> },
  { name: "Material UI", icon: <i className="devicon-materialui-plain" /> },
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
  { name: "Docker", icon: <SiDocker className="h-16 w-16" /> },
  { name: "AWS EC2", icon: <SiAmazonec2 className="h-16 w-16" /> },
  { name: "AWS S3 + Cloudfront", icon: <SiAmazons3 className="h-16 w-16" /> },
  { name: "Git", icon: <i className="devicon-git-plain" /> },
  { name: "GitHub Actions", icon: <SiGithubactions className="h-16 w-16" /> },
  { name: "Storybook", icon: <SiStorybook className="h-16 w-16" /> },
  { name: "Supabase", icon: <SiSupabase className="h-16 w-16" /> },
  { name: "Stripe", icon: <SiStripe className="h-16 w-16" /> },
  { name: "LaTeX", icon: <i className="devicon-latex-plain" /> },
  { name: "OpenAPI/Swagger", icon: <SiSwagger className="h-16 w-16" /> },
  { name: "SST", icon: <SiSst className="h-16 w-16" /> },
];

export default function Skillset() {
  const isMobile = useIsMobile();

  const [tooltipOpenName, setTooltipOpenName] = useState("");

  return (
    <div className="flex flex-col gap-12">
      <DraggableWrapper dragId="skillsetLanguages" isDraggable={!isMobile}>
        <div className="text-xl font-medium">LANGUAGES</div>
        <div className="mt-6 flex flex-row flex-wrap gap-8">
          {arrayToIcons(LANGUAGES, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>

      <DraggableWrapper dragId="skillsetLibraries" isDraggable={!isMobile}>
        <div className="text-xl font-medium">LIBRARIES & FRAMEWORKS</div>
        <div className="mt-6 flex flex-row flex-wrap gap-8">
          {arrayToIcons(LIBRARIES, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>

      <DraggableWrapper dragId="skillsetTools" isDraggable={!isMobile}>
        <div className="text-xl font-medium">TOOLS</div>
        <div className="mt-6 flex flex-row flex-wrap gap-8">
          {arrayToIcons(TOOLS, tooltipOpenName, setTooltipOpenName)}
        </div>
      </DraggableWrapper>
    </div>
  );
}
