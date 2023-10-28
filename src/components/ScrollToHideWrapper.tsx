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
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full"
    >
      {children}
    </motion.div>
  );
}
