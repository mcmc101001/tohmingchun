import type { TimelineObjectType } from "@/store/timelineStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "@/lib/utils";

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
        className="relative z-20 flex min-h-[200px] w-[40rem] flex-col gap-2 rounded-xl bg-transparent p-6 text-transparent ring-2 ring-primary"
      >
        <h1 className="text-4xl font-semibold">{timeline.title}</h1>
        <p className="text-xl italic">
          {formatDate(timeline.startDate)} - {formatDate(timeline.endDate)}
        </p>
        <ul className="ml-6 mt-2 flex flex-col gap-2">
          {timeline.description.map((text) => {
            return (
              <li key={text} className="list-disc text-lg">
                {text}
              </li>
            );
          })}
        </ul>
        <div className="absolute left-[-6.37rem] top-1/2 z-50 h-14 w-14 -translate-y-1/2 rounded-full bg-pink-700" />
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
        "relative z-20 flex min-h-[200px] w-[40rem] cursor-grab flex-col gap-2 rounded-xl bg-card p-6 " +
        (isOverlay
          ? "cursor-grabbing"
          : "cursor-grab ring-primary hover:ring-2")
      }
    >
      <h1 className="text-4xl font-semibold text-accent-foreground">
        {timeline.title}
      </h1>
      <p className="text-xl italic text-accent-foreground">
        {formatDate(timeline.startDate)} - {formatDate(timeline.endDate)}
      </p>
      <ul className="ml-6 mt-2 flex flex-col gap-2">
        {timeline.description.map((text) => {
          return (
            <li
              key={text}
              className="list-disc text-lg text-accent-foreground/80"
            >
              {text}
            </li>
          );
        })}
      </ul>
      {!isOverlay && (
        <div className="absolute left-[-6.37rem] top-1/2 z-50 h-14 w-14 -translate-y-1/2 rounded-full bg-pink-500" />
      )}
    </div>
  );
}
