import { useCallback, useState } from 'react';
import { Calculation } from './calculation';

function useCalc() {
  const [thickness, setThickness] = useState<string>("4.76");
  const [inscribedcircle, setInscribedcircle] = useState<string>("12.7");
  const [reliefAngle, setReliefAngle] = useState<string>("7");
  const [reliefAngle3, setReliefAngle3] = useState<string>("");
  const [angleLength, setAngleLength] = useState<string>("");
  const changThickness = useCallback((e: string) => {
    setThickness(e);
  }, []);
  const changInscribedcircle = useCallback((e: string) => {
    setInscribedcircle(e);
  }, []);
  const changReliefAngle = useCallback((e: string) => {
    setReliefAngle(e);
  }, []);
  const changReliefAngle3 = useCallback((e: string) => {
    setReliefAngle3(e);
  }, []);
  const changAngleLength = useCallback((e: string) => {
    setAngleLength(e);
  }, []);
  console.log(thickness);
  const calc = new Calculation(thickness, inscribedcircle, reliefAngle, reliefAngle3, angleLength);
  console.log(calc);

  return { state: { thickness, inscribedcircle, reliefAngle, reliefAngle3, angleLength, calc }, setState: { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength } };
}

export default useCalc