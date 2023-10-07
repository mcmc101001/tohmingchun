import { cn } from "@/lib/utils";
import {
  $playgroundIsDraggingElement,
  $playgroundSelectedObjects,
} from "../../store/playgroundState";
import { useStore } from "@nanostores/react";
import type { MouseEvent, TouchEvent } from "react";
import { useState } from "react";

interface DraggableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  dragId: string;
}

export default function DraggableWrapper({
  dragId,
  children,
  className,
  ...props
}: DraggableWrapperProps) {
  const selectedObjects = useStore($playgroundSelectedObjects);
  const [isHovered, setIsHovered] = useState(false);

  function handleContact(e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) {
    const id = e.currentTarget.getAttribute("drag-id");
    $playgroundIsDraggingElement.set(true);

    // if valid dragable object
    if (id) {
      // multi-select
      if (e.shiftKey || e.metaKey) {
        if (selectedObjects.includes(id)) {
          // if already selected
          $playgroundSelectedObjects.set(
            selectedObjects.filter((item) => item !== id)
          );
        } else {
          $playgroundSelectedObjects.set([...selectedObjects, id]);
        }
      } else {
        if (selectedObjects.includes(id)) {
          return;
        } else {
          $playgroundSelectedObjects.set([id]);
        }
      }
    }
  }
  function handleRelease(e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) {
    $playgroundIsDraggingElement.set(false);
  }

  return (
    <div
      onMouseDown={handleContact}
      onMouseUp={handleRelease}
      onTouchStart={handleContact}
      onTouchEnd={handleRelease}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
      drag-id={dragId}
      className={cn(
        className,
        "cursor-move select-none z-20 relative touch-none"
      )}
    >
      {children}
      {selectedObjects.includes(dragId) ? (
        <div className="-inset-5 absolute border border-blue-300"></div>
      ) : (
        isHovered && (
          <div className="-inset-5 absolute border opacity-50 border-blue-300"></div>
        )
      )}
    </div>
  );
}
