import { useState } from "react";
import Input from "../components/Input";
import Text from "../components/Text";
import useCalc from "../lib/useCalc";
import { shapes, clearanceAngles, inscribedCircles, thicknesses } from "../lib/selectItems";
import Accordion from "../components/Accordion";
import Select from "../components/Select";

function Calculation() {
  const {
    dimensions,
    calc,
    setState: { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength, changShapes }
  } = useCalc();
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
        <Select label={"形状"} items={shapes} setValue={changShapes} />
        <Select label={"逃げ角"} items={clearanceAngles} setValue={changReliefAngle} />
        <Select label={"内接円"} items={inscribedCircles} setValue={changInscribedcircle} />
        <Select label={"厚み"} items={thicknesses} setValue={changThickness} />
        <Input label={"3番角"} num={dimensions.reliefAngle3} setNum={changReliefAngle3} min={0} max={36} step={0.1} />
        {dimensions.reliefAngle3 && <Input label={"ランド幅"} num={dimensions.angleLength} setNum={changAngleLength} />}
      </Accordion>
      <Accordion label={"計算結果"} isAccordion={isAccordion.output} changAccordion={() => outputAccordion()} >
        <Text label={"2番角仕上げ寸法"} anser={calc.reliefAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
        <Text label={"ネガ当たり"} anser={calc.materialHit()} description="2番角仕上げ寸法 + (厚み × sin(逃げ角))" />
        {dimensions.reliefAngle3 && dimensions.angleLength && dimensions.thickness && <Text label={"3番角仕上げ代"} anser={calc.reliefAngle3()} description="内接円 ÷ 2 + ((ランド幅 × tan(3番角)) - (ランド幅 × tan(逃げ角))) × cos(3番角)" />}
      </Accordion>
    </>
  )
}

export default Calculation
