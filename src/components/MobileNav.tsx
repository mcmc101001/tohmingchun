import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-foreground" />
        </SheetTrigger>
        <SheetContent className="w-fit text-foreground">
          <ul className="items-end pr-12 pl-28 flex mt-5 flex-col text-xl gap-y-4">
            <li>
              <a href="/projects" className="text-foreground/80">
                Projects
              </a>
            </li>
            <li>
              <a href="/playground" className="text-foreground/80">
                Playground
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mcmc101001"
                className="text-foreground/80"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="/tohMingChunCV.pdf"
                download="tohMingChunCV.pdf"
                className="text-foreground/80"
              >
                Résumé
              </a>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
