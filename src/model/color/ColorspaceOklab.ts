import { immerable, produce } from "immer";

import { ChannelInfo, Colorspace, ChannelType } from "./Colorspace";
import { fixArraySize } from "../../util/math";

const CHANNEL_INFO: ChannelInfo[] = [
  {
    channel: "lightness",
    label: "L",
    channelType: ChannelType.IsLightness,
    range: [0, 1],
    rangeTransformed: [0, 100],
    step: 2,
  },
  { channel: "a", label: "A", channelType: ChannelType.None, range: [-0.4, 0.4], rangeTransformed: [-40, 40], step: 2 },
  { channel: "b", label: "B", channelType: ChannelType.None, range: [-0.4, 0.4], rangeTransformed: [-40, 40], step: 2 },
];

export class ColorspaceOklab extends Colorspace {
  [immerable] = true;

  get lightness() {
    return this.values[0];
  }
  get a() {
    return this.values[1];
  }
  get b() {
    return this.values[2];
  }

  static colorspaceName(): string {
    return "oklab";
  }

  constructor(values?: number[]) {
    super(fixArraySize(values ?? [], 3));
  }

  static rawToTransformed(raw: readonly number[]): number[] {
    return raw.map((rawValue) => rawValue * 100);
  }
  static transformedToRaw(transformed: readonly number[]): number[] {
    return transformed.map((transformedValue) => transformedValue / 100);
  }

  with(lightness: number, a: number, b: number): ColorspaceOklab {
    return produce(this, (draft) => {
      draft.values = [lightness, a, b];
    });
  }

  withTransformed(lightness: number, a: number, b: number): ColorspaceOklab {
    return produce(this, (draft) => {
      draft.values = ColorspaceOklab.transformedToRaw([lightness, a, b]);
    });
  }

  static channelInfo(): ChannelInfo[] {
    return CHANNEL_INFO;
  }
}
