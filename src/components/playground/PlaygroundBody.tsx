import { useMotionValue } from "framer-motion";
import type { MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import DraggableWrapper from "@/components/playground/DraggableWrapper";
import { getTransform, setTransform } from "@/lib/utils";

export default function PlaygroundBody() {
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isDraggingElement, setIsDraggingElement] = useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  let prevMouseX = useMotionValue(0);
  let prevMouseY = useMotionValue(0);

  let touchX = useMotionValue(0);
  let touchY = useMotionValue(0);

  let prevTouchX = useMotionValue(0);
  let prevTouchY = useMotionValue(0);

  function moveObject({ deltaX, deltaY }: { deltaX: number; deltaY: number }) {
    for (const id of selectedObjects) {
      const element = document.querySelector(
        `[drag-id="${id}"]`
      ) as HTMLElement;

      if (element) {
        const { x, y } = getTransform(element);
        console.log(id);
        console.log(x, y);

        setTransform(element, {
          x: x + deltaX,
          y: y + deltaY,
        });
      }
    }
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    prevMouseX.set(mouseX.get());
    prevMouseY.set(mouseY.get());

    mouseX.set(clientX);
    mouseY.set(clientY);

    if (isDraggingElement) {
      moveObject({
        deltaX: mouseX.get() - prevMouseX.get(),
        deltaY: mouseY.get() - prevMouseY.get(),
      });
    }
  }

  function handleTouchMove(e: TouchEvent) {
    prevTouchX.set(touchX.get());
    prevTouchY.set(touchY.get());

    touchX.set(e.touches[0].clientX);
    touchY.set(e.touches[0].clientY);
    if (isDraggingElement) {
      moveObject({
        deltaX: touchX.get() - prevTouchX.get(),
        deltaY: touchY.get() - prevTouchY.get(),
      });
    }
  }

  function handleMouseDown(e: MouseEvent<HTMLElement>) {
    const id = e.currentTarget.getAttribute("drag-id");
    setIsDraggingElement(true);

    // if valid dragable object
    if (id) {
      // multi-select
      if (e.shiftKey || e.metaKey) {
        if (selectedObjects.includes(id)) {
          // if already selected
          setSelectedObjects((prev) => prev.filter((item) => item !== id));
        } else {
          setSelectedObjects((prev) => [...prev, id]);
        }
      } else {
        if (selectedObjects.includes(id)) {
          return;
        } else {
          setSelectedObjects([id]);
        }
      }
    }
  }

  function handleTouchStart(e: TouchEvent<HTMLElement>) {
    touchX.set(e.touches[0].clientX);
    touchY.set(e.touches[0].clientY);
    prevTouchX.set(e.touches[0].clientX);
    prevTouchY.set(e.touches[0].clientY);
    const id = e.currentTarget.getAttribute("drag-id");
    setIsDraggingElement(true);

    // if valid dragable object
    if (id) {
      // multi-select
      if (e.shiftKey || e.metaKey) {
        if (selectedObjects.includes(id)) {
          // if already selected
          setSelectedObjects((prev) => prev.filter((item) => item !== id));
        } else {
          setSelectedObjects((prev) => [...prev, id]);
        }
      } else {
        setSelectedObjects([id]);
      }
    }
  }

  function handleMouseUp(e: MouseEvent<HTMLElement>) {
    setIsDraggingElement(false);
  }

  function handleTouchEnd() {
    touchX.set(0);
    touchY.set(0);
    prevTouchX.set(0);
    prevTouchY.set(0);
    setIsDraggingElement(false);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={
        "relative h-full w-full flex flex-col items-center justify-center gap-3 md:gap-12  text-slate-200 text-4xl overflow-hidden " +
        (isDraggingElement && " cursor-move")
      }
    >
      <div
        className="inset-0 h-full w-full z-10 absolute"
        onClick={() => setSelectedObjects([])}
      ></div>
      <DraggableWrapper
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        isSelected={selectedObjects.includes("draggable")}
        dragId="draggable"
      >
        <h1 className="text-3xl md:text-6xl font-bold">Hi, I am Ming Chun !</h1>
      </DraggableWrapper>
      <DraggableWrapper
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        isSelected={selectedObjects.includes("draggable2")}
        dragId="draggable2"
      >
        <p className="md:text-4xl text-xl font-normal">
          <span className="text-accent">Student. </span>
          <span className="text-primary">Web developer.</span>
        </p>
      </DraggableWrapper>
    </div>
  );
}
