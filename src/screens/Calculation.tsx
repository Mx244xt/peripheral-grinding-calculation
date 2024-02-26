import { useState } from "react";
import Accordion from "../components/Accordion";
import Input from "../components/Input";
import Select from "../components/Select";
import Text from "../components/Text";
import useCalc from "../hooks/useCalc";
import { clearanceAngles, cornerR, inscribedCircles, shapes, thicknesses } from "../lib/selectItems";
import WebGL from "../components/WebGL";

function Calculation() {

  const {
    dimensions,
    calc,
    handleChange,
  } = useCalc();
  const { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength, changShapes, changR, changApexAngle } = handleChange;

  const [isAccordion, setAccordion] = useState({ input: false, output: false, gl: false });
  function inputAccordion() {
    setAccordion({ ...isAccordion, input: !isAccordion.input });
  }
  function outputAccordion() {
    setAccordion({ ...isAccordion, output: !isAccordion.output });
  }
  function WebGLAccordion() {
    setAccordion({ ...isAccordion, gl: !isAccordion.gl });
  }

  return (
    <>
      <Accordion label={"寸法入力"} isAccordion={isAccordion.input} changAccordion={() => inputAccordion()} >
        <Select label={"形状"} items={shapes} setValue={changShapes} defaultValue={"S"} optionSetValue={changApexAngle} />
        <Select label={"内接円"} items={inscribedCircles} setValue={changInscribedcircle} defaultValue={"9.525"} />
        <Input label={"素材内接円"} num={dimensions.materialIncirecle} optionNum={(+dimensions.inscribedcircle + 0.2).toFixed(3)} setValue={handleChange.changMaterialIncirecle} min={0} max={36} step={0.1} />
        <Select label={"逃げ角"} items={clearanceAngles} setValue={changReliefAngle} defaultValue={"C"} />
        <Select label={"Rサイズ"} items={cornerR} setValue={changR} defaultValue={"04"} />
        <Select label={"厚み"} items={thicknesses} setValue={changThickness} defaultValue={"03"} />
        <Select label={"3番角"} items={clearanceAngles} setValue={changReliefAngle3} defaultValue={"N"} />
        {+dimensions.reliefAngle3 > 0 && <Input label={"ランド幅"} num={dimensions.angleLength} setValue={changAngleLength} min={0} max={36} step={0.01} />}
      </Accordion>
      <Accordion label={"計算結果"} isAccordion={isAccordion.output} changAccordion={() => outputAccordion()} >
        <Text label={"2番角仕上げ寸法"} anser={calc.reliefAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
        <Text label={"素材ネガ当たり"} anser={calc.materialNegaHit()} description="(素材内接円 ÷ 2 × cos(逃げ角)) + (厚み × sin(逃げ角))" />
        <Text label={"B軸加工角度"} anser={calc.processingAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
        <Text label={"素材ポジ当たり"} anser={calc.materialPosiHit()} description="(素材内接円 ÷ 2 × cos(逃げ角))" />
        <Text label={"頂角コーナー高さ"} anser={calc.cornerHeight()} description={dimensions.shape === shapes["S"].value ? "(√2 -1) * (内接円 ÷ 2 - Rサイズ) " : dimensions.shape === shapes["T"].value ? "3 ÷ 2 × 内接円 - Rサイズ" : dimensions.shape === shapes["other"].value ? "" : "(1 ÷ sin(頂角 ÷ 2) - 1) × (内接円 ÷ 2 - Rサイズ)"} />
        {dimensions.reliefAngle3 !== "0" && dimensions.angleLength && dimensions.thickness && <Text label={"3番角仕上げ代"} anser={calc.reliefAngle3()} description="(内接円 ÷ 2 + (ランド幅 × (tan(3番角) - tan(逃げ角))) × cos(3番角)" />}
      </Accordion>
      <Accordion label={"図形"} isAccordion={isAccordion.gl} changAccordion={() => WebGLAccordion()} gridNum={true}>
        <WebGL dimensions={dimensions}/>
      </Accordion>
    </>
  )
}

export default Calculation
