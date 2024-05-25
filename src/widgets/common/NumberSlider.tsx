import { ChangeEvent } from "react";
import { ControlledTextInput } from "./ControlledTextInput";

export type NumberSliderProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min: number;
  max: number;
  step: number;
  allowNone?: boolean;
  backgroundStyle?: string;
};

const LIMIT_ROUNDING_ERROR = 0.0005;

export function NumberSlider(props: NumberSliderProps) {
  const sliderValue = !Number.isNaN(props.value) ? props.value : 0;
  const textValue = !Number.isNaN(props.value) ? props.value.toString() : "None";
  const displayValue =
    !Number.isNaN(props.value) && props.step >= 1 ? (Math.round(props.value * 10) / 10).toString() : textValue;
  const limitDistance = Math.abs(props.max - props.min);
  const limitMin = props.min - LIMIT_ROUNDING_ERROR * limitDistance;
  const limitMax = props.max + LIMIT_ROUNDING_ERROR * limitDistance;
  const className =
    props.value < limitMin || props.value > limitMax ? "slider-container out-of-range" : "slider-container";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(event.target.value);
    if (Number.isNaN(value) && !props.allowNone) {
      value = 0;
    }

    props.onChange(value);
  }

  const style = props.backgroundStyle
    ? ({ "--slider-track-background": props.backgroundStyle } as React.CSSProperties)
    : undefined;

  return (
    <>
      <div className="number-slider">
        <div className={className}>
          <input
            type="range"
            className={props.backgroundStyle ? "thick-slider" : undefined}
            value={sliderValue}
            onChange={handleChange}
            min={props.min}
            max={props.max}
            step={props.step}
            disabled={props.disabled}
            style={style}
          />
        </div>
        <ControlledTextInput
          value={textValue}
          title={textValue}
          displayValue={displayValue}
          inputMode="decimal"
          onChange={handleChange}
          disabled={props.disabled ?? false}
        />
      </div>
    </>
  );
}
