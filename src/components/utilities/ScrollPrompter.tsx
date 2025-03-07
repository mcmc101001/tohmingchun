import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { useRef, useState } from "react";

export default function ScrollPrompter() {
  const [scrollPrompterTransparency, setScrollPrompterTransparency] =
    useState(0.6);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    setScrollPrompterTransparency(Math.max(0.6 - 7 * scrollYProgress.get(), 0));
  });

  return (
    <motion.div
      className="fixed bottom-2 left-0 right-0"
      style={{ opacity: scrollPrompterTransparency }}
    >
      <ChevronsDown
        className={`absolute bottom-2 left-0 right-0 mx-auto h-14 w-14 animate-bounce text-foreground md:h-20 md:w-20`}
      />
    </motion.div>
  );
}
