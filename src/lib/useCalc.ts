import { useCallback, useState } from 'react';
import { Calculation } from './calculation';
type Dimensions = {
  thickness: string;
  inscribedcircle: string;
  reliefAngle: string;
  reliefAngle3: string;
  angleLength: string;
  shape: string;
}

function useCalc() {
  const [dimensions, setDimensions] = useState<Dimensions>({
    thickness: "4.76",
    inscribedcircle: "12.7",
    reliefAngle: "7",
    reliefAngle3: "",
    angleLength: "",
    shape: "",
  })
  const changThickness = useCallback((e: string) => {
    setDimensions({ ...dimensions, thickness: e });
  }, [dimensions]);
  const changInscribedcircle = useCallback((e: string) => {
    setDimensions({ ...dimensions, inscribedcircle: e });
  }, [dimensions]);
  const changReliefAngle = useCallback((e: string) => {
    setDimensions({ ...dimensions, reliefAngle: e });
  }, [dimensions]);
  const changReliefAngle3 = useCallback((e: string) => {
    setDimensions({ ...dimensions, reliefAngle3: e });
  }, [dimensions]);
  const changAngleLength = useCallback((e: string) => {
    setDimensions({ ...dimensions, angleLength: e });
  }, [dimensions]);
  const changShapes = useCallback((e: string) => {
    setDimensions({ ...dimensions, shape: e });
  }, [dimensions])

  const calc = new Calculation(dimensions.thickness, dimensions.inscribedcircle, dimensions.reliefAngle, dimensions.reliefAngle3, dimensions.angleLength, dimensions.shape);

  return { dimensions, calc, setState: { changThickness, changInscribedcircle, changReliefAngle, changReliefAngle3, changAngleLength, changShapes } };
}

export default useCalc