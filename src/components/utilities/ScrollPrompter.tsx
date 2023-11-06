import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { useRef, useState } from "react";

export default function ScrollPrompter() {
  const [scrollPrompterTransparency, setScrollPrompterTransparency] =
    useState(0.6);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: targetRef,
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    setScrollPrompterTransparency(Math.max(0.6 - 5 * scrollYProgress.get(), 0));
  });

  return (
    <motion.div
      className="fixed bottom-2 left-0 right-0"
      style={{ opacity: scrollPrompterTransparency }}
    >
      <ChevronsDown
        className={`absolute bottom-2 left-0 right-0 mx-auto h-14 w-14 md:h-20 md:w-20 animate-bounce text-foreground`}
      />
    </motion.div>
  );
}
