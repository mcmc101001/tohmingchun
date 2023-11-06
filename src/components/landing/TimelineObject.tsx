import type { TimelineObject } from "@/store/timelineStore";

interface TimelineObjectProps {
  timeline: TimelineObject;
}

export default function TimelineObject({ timeline }: TimelineObjectProps) {
  return (
    <>
      <div className="relative z-20 flex min-h-[200px] w-[40rem] flex-col rounded-xl bg-card p-6 ring-primary hover:ring-2">
        <h1 className="text-4xl font-semibold text-accent-foreground">
          {timeline.title}
        </h1>
        <ul className="ml-6 mt-4 flex flex-col gap-2">
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
        <div className="absolute left-[-6.37rem] top-1/2 z-50 h-14 w-14 -translate-y-1/2 rounded-full bg-pink-500"></div>
      </div>
    </>
  );
}
