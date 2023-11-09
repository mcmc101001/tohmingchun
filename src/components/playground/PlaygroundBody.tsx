import { useMotionValue } from "framer-motion";
import { type MouseEvent, type TouchEvent } from "react";
import DraggableWrapper from "@/components/playground/DraggableWrapper";
import { getTransform, setTransform } from "@/lib/utils";
import ScrollPrompter from "@/components/utilities/ScrollPrompter";
import {
  $playgroundIsDraggingElement,
  $playgroundSelectedObjects,
} from "../../store/playgroundStore";
import { useStore } from "@nanostores/react";
import Skillset from "../landing/Skillset";
import useIsMobile from "@/hooks/useIsMobile";
import Timeline from "../landing/Timeline";

export default function PlaygroundBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

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
      className={"relative flex h-full w-full flex-col items-center"}
    >
      <div
        className="absolute inset-0 z-10 h-full w-full"
        onClick={() => $playgroundSelectedObjects.set([])}
      ></div>
      <section className="container flex min-h-screen flex-col items-center justify-center gap-3 py-10 text-foreground md:gap-12">
        <DraggableWrapper dragId="greeting">
          <h1 className="text-3xl font-bold md:text-6xl">
            Hi, I am Ming Chun !
          </h1>
        </DraggableWrapper>
        <DraggableWrapper dragId="introduction">
          <p className="text-xl font-normal md:text-4xl">
            <span className="text-accent">Student. </span>
            <span className="text-primary">Web developer.</span>
          </p>
        </DraggableWrapper>
        <DraggableWrapper dragId="prompt">
          <p className="text-xl font-light italic text-accent">
            Psst...Try dragging us!
          </p>
        </DraggableWrapper>
        <ScrollPrompter />
      </section>
      <section className="container flex min-h-screen flex-col justify-center gap-4 text-foreground md:gap-8 md:px-16">
        <DraggableWrapper dragId="about me" isDraggable={!isMobile}>
          <div className="flex items-center">
            <h1 className="text-left text-2xl font-bold md:text-5xl">
              About me
            </h1>
            <div className="ml-4 mt-1 h-0 flex-1 border-2 border-b md:mt-3"></div>
          </div>
        </DraggableWrapper>
        <DraggableWrapper dragId="longIntroduction" isDraggable={!isMobile}>
          <p className="text-left text-lg font-normal md:text-2xl">
            Hello! I am a year 2 computer engineering undergraduate at NUS. I
            love drawing inspiration from the problems I face in my everyday
            life and solving them with{" "}
            <span className="inline-block">&lt; code /&gt;</span>. My interests
            lie in web development, in particular building typesafe
            applications, as well as learning the latest developments in the
            frontend world.
          </p>
        </DraggableWrapper>
        <DraggableWrapper dragId="profileAsClass" isDraggable={!isMobile}>
          <div className="z-50">{children}</div>
        </DraggableWrapper>
      </section>
      <section className="container flex min-h-screen flex-col items-center justify-center gap-5 py-10 text-foreground md:gap-10">
        <DraggableWrapper
          dragId="skillsAndProficiencies"
          isDraggable={!isMobile}
        >
          <h1 className="whitespace-nowrap text-2xl font-bold md:text-5xl">
            &lt; Skills and Proficiencies /&gt;
          </h1>
        </DraggableWrapper>
        <Skillset />
      </section>
      <section className="container flex min-h-screen flex-col items-center justify-center gap-5 py-10 text-foreground md:gap-10">
        <DraggableWrapper dragId="timeline" isDraggable={!isMobile}>
          <h1 className="whitespace-nowrap text-2xl font-bold md:text-5xl">
            &lt; Timeline /&gt;
          </h1>
        </DraggableWrapper>
        <Timeline />
      </section>
    </div>
  );
}
