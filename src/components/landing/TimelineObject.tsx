import type { TimelineObjectType } from "@/store/timelineStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDateMonthYear } from "@/lib/utils";

interface TimelineObjectProps {
  timeline: TimelineObjectType;
  isOverlay?: boolean;
}

export default function TimelineObject({
  timeline,
  isOverlay,
}: TimelineObjectProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: timeline.id,
    data: {
      timeline,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="relative z-20 flex min-h-[200px] w-full touch-none flex-col gap-2 rounded-xl bg-transparent p-6 text-transparent ring-2 ring-primary"
      >
        <h1 className="text-xl font-semibold text-transparent md:text-4xl">
          {timeline.title}
        </h1>
        <p className="text-base italic text-transparent md:text-xl">
          {formatDateMonthYear(timeline.startDate)} -{" "}
          {formatDateMonthYear(timeline.endDate)}
        </p>
        <ul className="ml-6 mt-2 flex flex-col gap-2 text-sm md:text-lg">
          {timeline.description.map((text) => {
            return (
              <li key={text} className="list-disc text-transparent">
                {text}
              </li>
            );
          })}
        </ul>
        {!isOverlay && (
          <div className="absolute -left-10 top-1/2 z-50 h-9 w-9 -translate-y-1/2 rounded-full bg-pink-700 md:left-[-6.37rem] md:h-14 md:w-14" />
        )}
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={
        "relative z-20 flex min-h-[200px] w-full cursor-grab touch-none flex-col gap-2 rounded-xl bg-card p-6 " +
        (isOverlay
          ? "cursor-grabbing"
          : "cursor-grab ring-primary hover:ring-2")
      }
    >
      <h1 className="text-xl font-semibold text-accent-foreground md:text-4xl">
        {timeline.title}
      </h1>
      <p className="text-base italic text-accent-foreground md:text-xl">
        {formatDateMonthYear(timeline.startDate)} -{" "}
        {formatDateMonthYear(timeline.endDate)}
      </p>
      <ul className="ml-6 mt-2 flex flex-col gap-2 text-sm md:text-lg">
        {timeline.description.map((text) => {
          return (
            <li key={text} className="list-disc text-accent-foreground/80">
              {text}
            </li>
          );
        })}
      </ul>
      {!isOverlay && (
        <div className="absolute -left-10 top-1/2 z-50 h-9 w-9 -translate-y-1/2 rounded-full bg-pink-500 md:left-[-6.37rem] md:h-14 md:w-14" />
      )}
    </div>
  );
}
