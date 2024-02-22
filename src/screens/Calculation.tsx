import { useState } from "react";
import Accordion from "../components/Accordion";
import Input from "../components/Input";
import Select from "../components/Select";
import Text from "../components/Text";
import useCalc from "../hooks/useCalc";
import { clearanceAngles, cornerR, inscribedCircles, shapes, thicknesses } from "../lib/selectItems";

function Calculation() {

  const {
    dimensions,
    calc,
    handleChange,
  } = useCalc();
  const { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength, changShapes, changR } = handleChange;

  const [isAccordion, setAccordion] = useState({ input: false, output: false });
  function inputAccordion() {
    setAccordion({ ...isAccordion, input: !isAccordion.input });
  }
  function outputAccordion() {
    setAccordion({ ...isAccordion, output: !isAccordion.output });
  }

  return (
    <>
      <Accordion label={"寸法入力"} isAccordion={isAccordion.input} changAccordion={() => inputAccordion()} >
        <Select label={"形状"} items={shapes} setValue={changShapes} defaultValue={shapes["S"].value} />
        <Select label={"内接円"} items={inscribedCircles} setValue={changInscribedcircle} defaultValue={inscribedCircles["9.525"].value} />
        <Input label={"素材内接円"} num={dimensions.materialIncirecle} setValue={handleChange.changMaterialIncirecle} min={0} max={36} step={0.1} />
        <Select label={"逃げ角"} items={clearanceAngles} setValue={changReliefAngle} defaultValue={clearanceAngles["C"].value} />
        <Select label={"Rサイズ"} items={cornerR} setValue={changR} defaultValue={cornerR["04"].value} />
        <Select label={"厚み"} items={thicknesses} setValue={changThickness} defaultValue={thicknesses["03"].value} />
        <Select label={"3番角"} items={clearanceAngles} setValue={changReliefAngle3} defaultValue={clearanceAngles["N"].value} />
        {+dimensions.reliefAngle3 > 0 && <Input label={"ランド幅"} num={dimensions.angleLength} setValue={changAngleLength} min={0} max={36} step={0.01} />}
      </Accordion>
      <Accordion label={"計算結果"} isAccordion={isAccordion.output} changAccordion={() => outputAccordion()} >
        <Text label={"2番角仕上げ寸法"} anser={calc.reliefAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
        <Text label={"ネガ当たり"} anser={calc.materialNegaHit()} description="(素材内接円 ÷ 2 × cos(逃げ角)) + (厚み × sin(逃げ角))" />
        <Text label={"ポジ当たり"} anser={calc.materialPosiHit()} description="(素材内接円 ÷ 2 × cos(逃げ角))" />
        <Text label={"コーナー高さ"} anser={calc.cornerHeight()} description={dimensions.shape === shapes["S"].value ? "(√2 -1) * (内接円 ÷ 2 - Rサイズ) " : dimensions.shape === shapes["T"].value ? "3 ÷ 2 × 内接円 - Rサイズ" : dimensions.shape === shapes["other"].value ? "" : "(1 ÷ sin(頂角 ÷ 2) - 1) × (内接円 ÷ 2 - Rサイズ)"} />
        {dimensions.reliefAngle3 !== "0" && dimensions.angleLength && dimensions.thickness && <Text label={"3番角仕上げ代"} anser={calc.reliefAngle3()} description="(内接円 ÷ 2 + (ランド幅 × (tan(3番角) - tan(逃げ角))) × cos(3番角)" />}
      </Accordion>
    </>
  )
}

export default Calculation
