import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollToHideWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();

    if (latest > prev && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      // The weird body data attribute selector adds space to prevent content from shifting when dialog hides scrollbar
      className="fixed top-0 z-50 w-full [body[data-scroll-locked='1']_&]:pr-[15px]"
    >
      {children}
    </motion.div>
  );
}
