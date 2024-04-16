import { Palette } from "../model/Palette";
import { Calculation } from "../model/calculation/Calculation";
import { PaletteAction, PaletteActionType } from "../reducers/PaletteReducer";

export type CalcPropertiesViewProps = {
  calc: Calculation;
  onCalcChange: (calc: Calculation) => void;
};

export type PropertiesViewProps = {
  palette: Palette;
  activeCalcIndex: number;
  onPaletteChange: React.Dispatch<PaletteAction>;
};

export function PropertiesView(props: PropertiesViewProps) {
  const calc = props.palette.calculations[props.activeCalcIndex];

  function onCalcChange(calc: Calculation) {
    props.onPaletteChange({
      actionType: PaletteActionType.SetCalculation,
      args: { index: props.activeCalcIndex, calc },
    });
  }

  if (!calc) {
    return (
      <>
        <div className="placeholder">Select a calculation to adjust its properties.</div>
      </>
    );
  }

  const CalcPropertiesView = calc.propertiesView();

  return (
    <>
      <CalcPropertiesView calc={calc} onCalcChange={onCalcChange} />
    </>
  );
}