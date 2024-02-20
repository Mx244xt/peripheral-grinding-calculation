import { useState } from "react";
import Input from "../components/Input";
import Text from "../components/Text";
import useCalc from "../lib/useCalc";
import Accordion from "../components/Accordion";

function Calculation() {
  const {
    state: { thickness, inscribedcircle, reliefAngle, reliefAngle3, angleLength, calc },
    setState: { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength }
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
        <Input label={"厚み"} num={thickness} setNum={changThickness} min={1} max={20} step={0.01} />
        <Input label={"内接円"} num={inscribedcircle} setNum={changInscribedcircle} />
        <Input label={"逃げ角"} num={reliefAngle} setNum={changReliefAngle} min={0} max={36} step={0.1} />
        <Input label={"3番角"} num={reliefAngle3} setNum={changReliefAngle3} min={0} max={36} step={0.1} />
        {reliefAngle3 && <Input label={"ランド幅"} num={angleLength} setNum={changAngleLength} />}
      </Accordion>
      <Accordion label={"計算結果"} isAccordion={isAccordion.output} changAccordion={() => outputAccordion()} >
        <Text label={"2番角仕上げ寸法"} anser={calc.reliefAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
        <Text label={"ネガ当たり"} anser={calc.materialHit()} description="2番角仕上げ寸法 + (厚み × sin(逃げ角))" />
        {reliefAngle3 && angleLength && thickness && <Text label={"3番角仕上げ代"} anser={calc.reliefAngle3()} description="内接円 ÷ 2 + ((ランド幅 × tan(3番角)) - (ランド幅 × tan(逃げ角))) × cos(3番角)" />}
      </Accordion>
    </>
  )
}

export default Calculation
