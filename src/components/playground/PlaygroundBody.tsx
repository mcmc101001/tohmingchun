import DraggableWrapper from "@/components/playground/DraggableWrapper";
import ScrollPrompter from "@/components/utilities/ScrollPrompter";
import { clearSelectedObjects } from "../../store/playgroundStore";
import Skillset from "../landing/Skillset";
import useIsMobile from "@/hooks/useIsMobile";
import Timeline from "../landing/Timeline";
import useCopyPaste from "@/hooks/useCopyPaste";
import useDragMotion from "@/hooks/useDragMotion";

export default function PlaygroundBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  const renderedCopiedElements = useCopyPaste();
  const {
    handleMouseMove,
    handleTouchMove,
    handleTouchStartBg,
    handleTouchEndBg,
  } = useDragMotion();

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
        onClick={() => {
          clearSelectedObjects();
        }}
      ></div>
      <section className="container flex min-h-screen flex-col items-center justify-center gap-3 py-10 text-foreground md:gap-12">
        {renderedCopiedElements}
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
            Psst...Try dragging us! Shift click for multiselect, Ctrl+C and
            Ctrl+V, etc!
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
            Hello! I am a year 3 computer engineering undergraduate at NUS. I
            love drawing inspiration from the problems I face in my everyday
            life and solving them with{" "}
            <span className="inline-block">&lt; code /&gt;</span>. My interests
            lie in web development, in particular building typesafe
            applications, as well as learning the latest developments in the
            frontend world.
          </p>
        </DraggableWrapper>
        <DraggableWrapper dragId="profileAsClass" isDraggable={!isMobile}>
          <div className="z-40">{children}</div>
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
