import { immerable, produce } from "immer";

import { CelIndex } from "../../util/cel";
import { Color } from "../color/Color";
import { Calculation, CalculationCel, CalculationResult, CalcPropertiesViewProps } from "./Calculation";
import { CalcCopyColorsView } from "../../widgets/calculations/CalcCopyColorsView";

export const MAX_COPIES = 1024;

export class CalcCopyColors extends Calculation {
  [immerable] = true;

  readonly startCel: CelIndex = { x: 0, y: 0 };
  readonly endCel: CelIndex = { x: 0, y: 0 };
  readonly offset: CelIndex = { x: 0, y: 0 };
  readonly copies: number = 1;

  static calcName(): string {
    return "Copy Colors";
  }

  static description(): string {
    return "Duplicates a range of colors at a given offset.";
  }

  listDescription(): string {
    return `Copy Colors - [${this.startCel.x}, ${this.startCel.y}] [${this.endCel.x}, ${this.endCel.y}] offset [${this.offset.x}, ${this.offset.y}] x${this.copies}`;
  }

  inputCels(_dimensions: [number, number]): CelIndex[] {
    const cels = [];

    for (let y = this.startCel.y; y <= this.endCel.y; y++) {
      for (let x = this.startCel.x; x <= this.endCel.x; x++) {
        cels.push({ x, y });
      }
    }

    return cels;
  }

  outputCels(_dimensions: [number, number]): CelIndex[] {
    const cels = [];

    for (let copy = 1; copy <= this.copies; copy++) {
      for (let y = this.startCel.y; y <= this.endCel.y; y++) {
        for (let x = this.startCel.x; x <= this.endCel.x; x++) {
          cels.push({ x: x + this.offset.x * copy, y: y + this.offset.y * copy });
        }
      }
    }

    return cels;
  }

  computeColors(colors: Color[], dimensions: [number, number]): CalculationResult {
    const cels: CalculationCel[] = [];
    const outputs = this.outputCels(dimensions);
    let i = 0;

    for (let copy = 0; copy < Math.min(this.copies, MAX_COPIES); copy++) {
      for (const color of colors) {
        cels.push({
          index: outputs[i],
          color,
        });

        i++;
      }
    }

    return { cels };
  }

  nudgeCelIndexes(offsetX: number, offsetY: number): Calculation {
    return produce(this, (draft) => {
      draft.startCel.x += offsetX;
      draft.startCel.y += offsetY;
      draft.endCel.x += offsetX;
      draft.endCel.y += offsetY;
    });
  }

  propertiesView(): (props: CalcPropertiesViewProps) => JSX.Element {
    return CalcCopyColorsView;
  }
}
