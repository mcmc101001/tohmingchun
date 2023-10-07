import { atom } from "nanostores";

export const $playgroundSelectedObjects = atom<string[]>([]);
export const $playgroundIsDraggingElement = atom<boolean>(false);
