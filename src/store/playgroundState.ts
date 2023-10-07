import { useMotionValue } from "framer-motion";
import { atom } from "nanostores";

export const $playgroundSelectedObjects = atom<string[]>([]);
export const $playgroundIsDraggingElement = atom<boolean>(false);

export const mouseX = useMotionValue(0);
export const mouseY = useMotionValue(0);

export const prevMouseX = useMotionValue(0);
export const prevMouseY = useMotionValue(0);

export const touchX = useMotionValue(0);
export const touchY = useMotionValue(0);

export const prevTouchX = useMotionValue(0);
export const prevTouchY = useMotionValue(0);
