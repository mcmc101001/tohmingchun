import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Transform = {
  x: number;
  y: number;
};

export function getTransform(el: HTMLElement): Transform {
  const transform = el.style.transform;
  if (!transform) {
    const calcualtedTransform = getComputedStyle(el).transform; // can return "none" https://developer.mozilla.org/en-US/docs/Web/CSS/transform
    if (calcualtedTransform === "none") {
      return { x: 0, y: 0 };
    }
    const match = calcualtedTransform.match(/matrix\((.*?)\)/);
    const split = match![1].split(",");
    return {
      x: parseInt(split[4]),
      y: parseInt(split[5]),
    };
  }
  const transformMatch = transform.match(/translate(3d)?\((.*?)px, (.*?)px/);
  return {
    x: transformMatch ? parseInt(transformMatch[2]) : 0,
    y: transformMatch ? parseInt(transformMatch[3]) : 0,
  };
}

export function setTransform(el: HTMLElement, transform: Transform) {
  el.style.setProperty(
    "transform",
    `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    "important",
  );
}

export function formatDateMonthYear(date: Date | undefined) {
  if (!date) return "Present";
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });
}

export function formatDateDayMonthYear(date: Date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
