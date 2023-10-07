import { cn } from "@/lib/utils";

interface DraggableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  dragId: string;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export default function DraggableWrapper({
  dragId,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  children,
  className,
  isSelected,
  ...props
}: DraggableWrapperProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      {...props}
      drag-id={dragId}
      className={cn(
        className,
        "cursor-move select-none z-20 relative touch-none"
      )}
    >
      {children}
      {isSelected && (
        <div className="-inset-5 absolute border border-blue-300"></div>
      )}
    </div>
  );
}
