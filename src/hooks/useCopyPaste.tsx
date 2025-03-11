import DraggableWrapper from "@/components/playground/DraggableWrapper";
import { getTransform } from "@/lib/utils";
import {
  $playgroundCopiedItems,
  $playgroundDraggableElementRegistry,
  $playgroundSelectedObjects,
  addSelectedObjects,
  setCopiedObjects,
} from "@/store/playgroundStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useCopyPaste() {
  const [renderedCopiedElements, setRenderedCopiedElements] = useState<
    ReactNode[]
  >([]);

  const selectedObjects = useStore($playgroundSelectedObjects);
  const copiedItems = useStore($playgroundCopiedItems);
  const objectRegistry = useStore($playgroundDraggableElementRegistry);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;

      if (e.ctrlKey && code === "KeyC") {
        setCopiedObjects(selectedObjects);
        console.log("copied", selectedObjects);
      } else if (e.ctrlKey && code === "KeyV") {
        console.log("pasting", copiedItems);
        const newDragIds: string[] = [];
        const newElements: ReactNode[] = [];
        copiedItems.forEach((dragId) => {
          const element = document.querySelector(
            `[drag-id="${dragId}"]`,
          ) as HTMLElement;

          const dimensions = element.getBoundingClientRect();

          const newDragId = `${dragId.split("-")[0]}-copy-${uuidv4()}`;

          const copiedElement = (
            <DraggableWrapper
              key={newDragId}
              dragId={newDragId}
              className="absolute"
              style={{
                top: dimensions.top + window.scrollY,
                left: dimensions.left,
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                transform: `translate3d(50px, 50px, 0)`,
              }}
            >
              {objectRegistry[dragId]}
            </DraggableWrapper>
          );

          newDragIds.push(newDragId);
          newElements.push(copiedElement);
        });
        addSelectedObjects(newDragIds);
        setRenderedCopiedElements((prev) => [...prev, ...newElements]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copiedItems, selectedObjects, addSelectedObjects, setCopiedObjects]);

  return renderedCopiedElements;
}
