import { useCallback, useState } from 'react';
import { Calculation } from '../lib/calculation';
export type Dimensions = {
  thickness: string;
  inscribedcircle: string;
  materialIncirecle: string;
  reliefAngle: string;
  reliefAngle3: string;
  angleLength: string;
  shape: string;
  rSize: string;
}

export type Item = {
  value: number;
  value2: number;
  corner: number;
  firstSurface: number;
};

function useCalc() {
  const [apexAngle, setApexAngle] = useState<Item>({ value: 90, value2: 90, corner: 4, firstSurface: 45 });
  const [dimensions, setDimensions] = useState<Dimensions>({
    thickness: "3.18",
    inscribedcircle: "9.525",
    materialIncirecle: "9.725",
    reliefAngle: "7",
    reliefAngle3: "0",
    angleLength: "1",
    shape: "90",
    rSize: "0.4",
  })

  const changThickness = useCallback((e: string) => {
    setDimensions({ ...dimensions, thickness: e });
  }, [dimensions]);
  const changInscribedcircle = useCallback((e: string) => {
    setDimensions({ ...dimensions, inscribedcircle: e, materialIncirecle: (+e + 0.2).toFixed(2) });
  }, [dimensions]);
  const changMaterialIncirecle = useCallback((e: string) => {
    setDimensions({ ...dimensions, materialIncirecle: e });
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
  const changR = useCallback((e: string) => {
    setDimensions({ ...dimensions, rSize: e });
  }, [dimensions])
  const changApexAngle = useCallback((e: string) => {
    let _val: Item = JSON.parse(e);
    _val = { ..._val, value: +_val.value }
    _val = { ..._val, value2: +_val.value2! }
    _val = { ..._val, corner: +_val.corner! }
    _val = { ..._val, firstSurface: +_val.firstSurface! }
    setApexAngle(_val);
  }, [apexAngle])


  const handleChange = {
    changThickness,
    changInscribedcircle,
    changMaterialIncirecle,
    changReliefAngle,
    changReliefAngle3,
    changAngleLength,
    changShapes,
    changR,
    changApexAngle,
  }

  const calc = new Calculation(
    dimensions.thickness,
    dimensions.inscribedcircle,
    dimensions.materialIncirecle,
    dimensions.reliefAngle,
    dimensions.reliefAngle3,
    dimensions.angleLength,
    dimensions.shape,
    dimensions.rSize,
    apexAngle,
  );

  return { dimensions, handleChange, calc };
}

export default useCalc