import { getTransform, setTransform } from "@/lib/utils";
import {
  $playgroundIsDraggingElement,
  $playgroundSelectedObjects,
} from "@/store/playgroundStore";
import { useStore } from "@nanostores/react";
import { useMotionValue } from "framer-motion";
import type { MouseEvent, TouchEvent } from "react";

export default function useDragMotion() {
  const isDraggingElement = useStore($playgroundIsDraggingElement);
  const selectedObjects = useStore($playgroundSelectedObjects);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  let prevMouseX = useMotionValue(0);
  let prevMouseY = useMotionValue(0);

  let touchX = useMotionValue(0);
  let touchY = useMotionValue(0);

  let prevTouchX = useMotionValue(0);
  let prevTouchY = useMotionValue(0);

  function moveObjects({ deltaX, deltaY }: { deltaX: number; deltaY: number }) {
    for (const id of selectedObjects) {
      const element = document.querySelector(
        `[drag-id="${id}"]`,
      ) as HTMLElement;

      if (element) {
        const { x, y } = getTransform(element);

        setTransform(element, {
          x: x + deltaX,
          y: y + deltaY,
        });
      }
    }
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent<HTMLDivElement>) {
    prevMouseX.set(mouseX.get());
    prevMouseY.set(mouseY.get());

    mouseX.set(clientX);
    mouseY.set(clientY);

    if (isDraggingElement) {
      moveObjects({
        deltaX: mouseX.get() - prevMouseX.get(),
        deltaY: mouseY.get() - prevMouseY.get(),
      });
    }
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    prevTouchX.set(touchX.get());
    prevTouchY.set(touchY.get());

    touchX.set(e.touches[0].clientX);
    touchY.set(e.touches[0].clientY);
    if (isDraggingElement) {
      moveObjects({
        deltaX: touchX.get() - prevTouchX.get(),
        deltaY: touchY.get() - prevTouchY.get(),
      });
    }
  }

  function handleTouchStartBg(e: TouchEvent<HTMLDivElement>) {
    touchX.set(e.touches[0].clientX);
    touchY.set(e.touches[0].clientY);
    prevTouchX.set(e.touches[0].clientX);
    prevTouchY.set(e.touches[0].clientY);
  }

  function handleTouchEndBg() {
    touchX.set(0);
    touchY.set(0);
    prevTouchX.set(0);
    prevTouchY.set(0);
  }

  return {
    handleMouseMove,
    handleTouchMove,
    handleTouchStartBg,
    handleTouchEndBg,
  };
}
