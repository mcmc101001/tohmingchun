import { atom } from "nanostores";
import type { ReactNode } from "react";
import { map } from "nanostores";

export const $playgroundDraggableElementRegistry =
  map<Record<string, ReactNode>>();
export const $ = atom<ReactNode[]>([]);
export const $playgroundSelectedObjects = atom<string[]>([]);
export const $playgroundIsDraggingElement = atom<boolean>(false);
export const $playgroundCopiedItems = atom<string[]>([]);

export function registerDraggableElement(key: string, element: ReactNode) {
  $playgroundDraggableElementRegistry.setKey(key, element);
}

export function setCopiedObjects(objects: string[]) {
  $playgroundCopiedItems.set(objects);
}

export function clearSelectedObjects() {
  $playgroundSelectedObjects.set([]);
}

export function addSelectedObjects(objects: string[]) {
  $playgroundSelectedObjects.set([
    ...$playgroundSelectedObjects.get(),
    ...objects,
  ]);
}
