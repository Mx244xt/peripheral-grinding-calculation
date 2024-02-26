import { Item } from "../hooks/useCalc";

export class Calculation {
  private THICKNESS: number = 0;
  private INSCRIBEDCIRCLE: number = 0;
  private MATERIAL_INCIRCLE: number = 0;
  private RELIEF_ANGLE: number = 0;
  private RELIEF_ANGLE3: number = 0;
  private ANGLE3_LENGTH: number = 0;
  private SHAPE: number = 0;
  private R_SIZE: number = 0.4;
  private APEX_ANGLE: Item = { value: 0, value2: 0, corner: 0, firstSurface: 0 };
  constructor(
    thickness?: string,
    inscribedcircle?: string,
    materialIncirecle?: string,
    reliefAngle?: string,
    reliefAngle3?: string,
    angleLength?: string,
    shape?: string,
    rSize?: string,
    apexAngle?: Item
  ) {
    if (typeof thickness === "string") {
      this.THICKNESS = Number(thickness);
    }
    if (typeof inscribedcircle === "string") {
      this.INSCRIBEDCIRCLE = Number(inscribedcircle);
    }
    if (typeof materialIncirecle === "string") {
      this.MATERIAL_INCIRCLE = Number(materialIncirecle);
    }
    if (typeof reliefAngle === "string") {
      this.RELIEF_ANGLE = Number(reliefAngle);
    }
    if (typeof reliefAngle3 === "string") {
      this.RELIEF_ANGLE3 = Number(reliefAngle3);
    }
    if (typeof angleLength === "string") {
      this.ANGLE3_LENGTH = Number(angleLength);
    }
    if (typeof shape === "string") {
      this.SHAPE = Number(shape);
    }
    if (typeof rSize === "string") {
      this.R_SIZE = Number(rSize);
    }
    if (apexAngle) {
      apexAngle = { ...apexAngle, value: +apexAngle.value }
      apexAngle = { ...apexAngle, value2: +apexAngle.value2! }
      apexAngle = { ...apexAngle, corner: +apexAngle.corner! }
      this.APEX_ANGLE = apexAngle;
    }
  }
  cos(angle: number): number {
    return Math.cos(angle * (Math.PI / 180))
  }
  sin(angle: number): number {
    return Math.sin(angle * (Math.PI / 180))
  }
  tan(angle: number): number {
    return Math.tan(angle * (Math.PI / 180))
  }
  reliefAngle(): string {
    if (this.RELIEF_ANGLE >= 90) return "最大値を超えています。"
    return (this.INSCRIBEDCIRCLE / 2 * this.cos(this.RELIEF_ANGLE)).toFixed(3) + "mm";
  }

  reliefAngle3(): string {
    if (this.THICKNESS <= this.ANGLE3_LENGTH) return "ランド幅が厚みよりも大きいです。";
    return (
      (
        this.INSCRIBEDCIRCLE / 2
        + this.ANGLE3_LENGTH
        * (this.tan(this.RELIEF_ANGLE3) - this.tan(this.RELIEF_ANGLE))
      )
      * this.cos(this.RELIEF_ANGLE3)
    ).toFixed(3) + "mm";
  }

  materialNegaHit(): string {
    if (this.RELIEF_ANGLE > 0 && this.RELIEF_ANGLE <= 90) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE)) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE))).toFixed(3) + "mm";
    } else if (this.RELIEF_ANGLE3 > 0 && this.RELIEF_ANGLE3 <= 90) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE3)) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE3))).toFixed(3) + "mm";
    } else {
      return (this.INSCRIBEDCIRCLE / 2).toFixed(3) + "mm";
    }
  }

  materialPosiHit(): string {
    if (this.RELIEF_ANGLE > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE))).toFixed(3) + "mm";
    } else if (this.RELIEF_ANGLE3 > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE3))).toFixed(3) + "mm";
    } else {
      return (this.INSCRIBEDCIRCLE / 2).toFixed(3) + "mm";
    }
  }

  processingAngle(): string {
    if (this.APEX_ANGLE.value > 0) {
      const pa: number[] = [];
      if (this.APEX_ANGLE.corner === 3) {
        for (let i = 0; i < this.APEX_ANGLE.corner; i++) {
          if (i === 0) {
            pa[i] = (this.APEX_ANGLE.firstSurface)
          } else {
            pa[i] = (180 - this.APEX_ANGLE.value + pa[i - 1])
          }
        }
        return `1面: ${pa[0]}° 2面: ${pa[1]}° 3面: ${pa[2]}°`;
      } else if (this.APEX_ANGLE.corner === 4) {
        for (let i = 0; i < this.APEX_ANGLE.corner; i++) {
          if (i === 0) {
            pa[i] = (this.APEX_ANGLE.firstSurface)
          } else if (i % 2 === 1) {
            pa[i] = (this.APEX_ANGLE.value2 + pa[i - 1])
          } else if (i % 2 === 0) {
            pa[i] = (this.APEX_ANGLE.value + pa[i - 1])
          }
        }
        return ` 1面: ${pa[0]}°  2面: ${pa[1]}°  3面: ${pa[2]}°  4面: ${pa[3]}° `;
      } else if (this.APEX_ANGLE.corner === 6) {
        for (let i = 0; i < this.APEX_ANGLE.corner; i++) {
          if (i === 0) {
            pa[i] = (this.APEX_ANGLE.firstSurface)
          } else if (i % 2 === 1) {
            pa[i] = (180 - this.APEX_ANGLE.value2 + pa[i - 1])
          } else if (i % 2 === 0) {
            pa[i] = (180 - this.APEX_ANGLE.value + pa[i - 1])
          }
        }
        return ` 1面: ${pa[0]}°  2面: ${pa[1]}°  3面: ${pa[2]}°  4面: ${pa[3]}°  5面: ${pa[4]}°  6面: ${pa[5]}° `;
      }
    }
    return "計算できません。";
  }

  cornerHeight(): string {
    if (this.APEX_ANGLE.corner === 4 && this.APEX_ANGLE.value === 90) {
      return ((Math.sqrt(2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3) + "mm";
    } else if (this.APEX_ANGLE.corner === 4) {
      return ((1 / this.sin(this.SHAPE / 2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3) + "mm";
    } else if (this.APEX_ANGLE.corner === 3) {
      return (3 / 2 * this.INSCRIBEDCIRCLE - this.R_SIZE).toFixed(3) + "mm";
    } else {
      return "計算できません。";
    }
  }
  cornerHeight2(): string {
    if (this.APEX_ANGLE.corner === 4 && this.APEX_ANGLE.value2 === 90) {
      return ((Math.sqrt(2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3) + "mm";
    } else if (this.APEX_ANGLE.corner === 4) {
      return ((1 / this.sin(this.SHAPE / 2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3) + "mm";
    } else if (this.APEX_ANGLE.corner === 3) {
      return (3 / 2 * this.INSCRIBEDCIRCLE - this.R_SIZE).toFixed(3) + "mm";
    } else {
      return "計算できません。";
    }
  }

}
