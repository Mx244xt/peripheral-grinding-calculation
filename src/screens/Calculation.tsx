import Input from "../components/Input";
import Text from "../components/Text";
import useCalc from "../lib/useCalc";

function Calculation() {
  const {
    state: { thickness, inscribedcircle, reliefAngle, reliefAngle3, angleLength, calc },
    setState: { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength }
  } = useCalc();

  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">寸法入力</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <Input label={"厚み"} num={thickness} setNum={changThickness} min={1} max={20} step={0.01} />
          <Input label={"内接円"} num={inscribedcircle} setNum={changInscribedcircle} />
          <Input label={"逃げ角"} num={reliefAngle} setNum={changReliefAngle} min={0} max={36} step={0.1} />
          <Input label={"3番角"} num={reliefAngle3} setNum={changReliefAngle3} min={0} max={36} step={0.1} />
          {reliefAngle3 && <Input label={"ランド幅"} num={angleLength} setNum={changAngleLength} />}
        </div>
      </section>
      <section className='mt-5'>
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">計算結果</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <Text label={"2番角仕上げ寸法"} anser={calc.reliefAngle()} description="内接円 ÷ 2 × cos(逃げ角)" />
          <Text label={"ネガ当たり"} anser={calc.materialHit()} description="2番角仕上げ寸法 + (厚み × sin(逃げ角))" />
          {reliefAngle3 && angleLength && thickness && <Text label={"3番角仕上げ代"} anser={calc.reliefAngle3()} description="内接円 ÷ 2 + ((ランド幅 × tan(3番角)) - (ランド幅 × tan(逃げ角))) × cos(3番角)" />}
        </div>
      </section>
    </>
  )
}

export default Calculation
