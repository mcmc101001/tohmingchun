import { useTimelineStore } from "@/store/timelineStore";
import TimelineObject from "@/components/landing/TimelineObject";

export default function Timeline() {
  const { timeline, setTimeline } = useTimelineStore();

  return (
    <div className="grid h-full w-full grid-cols-6 gap-16">
      <div className="col-span-2 ml-auto h-full w-5 rounded-full bg-primary/60" />
      <div className="col-span-4 flex h-full flex-col gap-16 py-20">
        {timeline.map((timelineObject) => {
          return <TimelineObject timeline={timelineObject} />;
        })}
      </div>
    </div>
  );
}
