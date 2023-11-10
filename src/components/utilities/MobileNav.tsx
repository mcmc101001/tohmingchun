import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-foreground" />
        </SheetTrigger>
        <SheetContent className="w-fit text-foreground">
          <ul className="mt-5 flex flex-col items-end gap-y-4 pl-28 pr-12 text-xl">
            <li>
              <a href="/projects" className="text-foreground/80">
                Projects
              </a>
            </li>
            <li>
              <a href="/posts" className="text-foreground/80">
                Blog
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
