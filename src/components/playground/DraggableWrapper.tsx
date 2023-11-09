import { cn } from "@/lib/utils";
import {
  $playgroundIsDraggingElement,
  $playgroundSelectedObjects,
} from "../../store/playgroundStore";
import { useStore } from "@nanostores/react";
import type { MouseEvent, TouchEvent } from "react";
import { useState } from "react";

interface DraggableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  isDraggable?: boolean;
  dragId: string;
}

export default function DraggableWrapper({
  isDraggable = true,
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
            selectedObjects.filter((item) => item !== id),
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

  return isDraggable ? (
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
        "relative z-20 cursor-move touch-none select-none",
      )}
    >
      {children}
      {selectedObjects.includes(dragId) ? (
        <div className="absolute -inset-5 border border-blue-300"></div>
      ) : (
        isHovered && (
          <div className="absolute -inset-5 border border-blue-300 opacity-50"></div>
        )
      )}
    </div>
  ) : (
    <>{children}</>
  );
}
