import { useMotionValue } from "framer-motion";
import type { MouseEvent, TouchEvent } from "react";
import DraggableWrapper from "@/components/playground/DraggableWrapper";
import { getTransform, setTransform } from "@/lib/utils";
import ScrollPrompter from "@/components/ScrollPrompter";
import {
  $playgroundIsDraggingElement,
  $playgroundSelectedObjects,
} from "../../store/playgroundState";
import { useStore } from "@nanostores/react";
import Skillset from "../Skillset";

export default function PlaygroundBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedObjects = useStore($playgroundSelectedObjects);
  const isDraggingElement = useStore($playgroundIsDraggingElement);

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
        `[drag-id="${id}"]`
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

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
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

  function handleTouchMove(e: TouchEvent) {
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

  function handleTouchStartBg(e: TouchEvent<HTMLElement>) {
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

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStartBg}
      onTouchEnd={handleTouchEndBg}
      className={"relative h-full w-full flex flex-col items-center"}
    >
      <div
        className="inset-0 h-full w-full z-10 absolute"
        onClick={() => $playgroundSelectedObjects.set([])}
      ></div>
      <section className="container min-h-screen py-10 gap-3 md:gap-12 text-foreground flex flex-col items-center justify-center">
        <DraggableWrapper dragId="greeting">
          <h1 className="text-3xl md:text-6xl font-bold">
            Hi, I am Ming Chun !
          </h1>
        </DraggableWrapper>
        <DraggableWrapper dragId="introduction">
          <p className="md:text-4xl text-xl font-normal">
            <span className="text-accent">Student. </span>
            <span className="text-primary">Web developer.</span>
          </p>
        </DraggableWrapper>
        <ScrollPrompter />
      </section>
      <section className="container min-h-screen text-foreground flex flex-col justify-center gap-4 md:gap-8 md:px-16">
        <DraggableWrapper dragId="about me">
          <div className="flex items-center">
            <h1 className="text-left md:text-5xl text-2xl font-bold">
              About me
            </h1>
            <div className="border-b border-2 flex-1 h-0 ml-4 mt-1 md:mt-3"></div>
          </div>
        </DraggableWrapper>
        <DraggableWrapper dragId="longIntroduction">
          <p className="text-left text-lg md:text-2xl font-normal">
            Hello! I am a year 2 computer engineering undergraduate at NUS. I
            love drawing inspiration from the problems I face in my everyday
            life and solving them with &lt; code /&gt;. My interests lie in web
            development, in particular building typesafe applications, as well
            as learning the latest developments in the frontend world.
          </p>
        </DraggableWrapper>
        <DraggableWrapper dragId="profileAsClass">{children}</DraggableWrapper>
      </section>
      <section className="container min-h-screen py-10 text-foreground gap-5 md:gap-10 flex flex-col items-center justify-center">
        <DraggableWrapper dragId="skillsAndProficiencies">
          <h1 className="font-bold md:text-5xl text-2xl whitespace-nowrap">
            &lt; Skills and Proficiencies /&gt;
          </h1>
        </DraggableWrapper>
        <Skillset />
      </section>
    </div>
  );
}
