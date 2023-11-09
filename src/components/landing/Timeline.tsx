import {
  useTimelineStore,
  type TimelineObjectType,
} from "@/store/timelineStore";
import TimelineObject from "@/components/landing/TimelineObject";
import { useMemo, useState } from "react";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  type DragStartEvent,
  type DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";

export default function Timeline() {
  const { timeline, setTimeline } = useTimelineStore();

  const [activeObject, setActiveObject] = useState<TimelineObjectType | null>(
    null,
  );

  const timelineObjectsId = useMemo(
    () => timeline.map((timelineObject) => timelineObject.id),
    [timeline],
  );

  const onDragStart = (event: DragStartEvent) => {
    setActiveObject(event.active.data.current?.timeline);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeObjectIndex = timeline.findIndex(
      (object) => object.id === activeId,
    );
    const overObjectIndex = timeline.findIndex(
      (object) => object.id === overId,
    );

    setTimeline(arrayMove(timeline, activeObjectIndex, overObjectIndex));
    setActiveObject(null);
  };

  return (
    <div className="min-w-screen max-w-7xl overflow-x-hidden pr-2 md:pr-8">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="grid h-full grid-cols-12 gap-4 md:grid-cols-6 md:gap-16">
          <div className="col-span-2 ml-auto h-full w-3 rounded-full bg-primary/60 md:w-5" />
          <div className="col-span-10 flex h-full flex-col gap-16 py-20 md:col-span-4">
            <SortableContext
              items={timelineObjectsId}
              strategy={verticalListSortingStrategy}
            >
              {timeline.map((timelineObject) => {
                return (
                  <TimelineObject
                    key={timelineObject.id}
                    timeline={timelineObject}
                  />
                );
              })}
            </SortableContext>
            {createPortal(
              <DragOverlay>
                {activeObject && (
                  <TimelineObject isOverlay timeline={activeObject} />
                )}
              </DragOverlay>,
              document.body,
            )}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
