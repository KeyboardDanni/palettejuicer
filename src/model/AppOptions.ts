import { immerable } from "immer";

export class AppOptions {
  [immerable] = true;

  readonly paletteRuler: boolean = false;
}
