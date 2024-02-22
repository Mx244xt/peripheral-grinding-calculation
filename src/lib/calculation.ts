export class Calculation {
  private THICKNESS: number = 0;
  private INSCRIBEDCIRCLE: number = 0;
  private MATERIAL_INCIRCLE: number = 0;
  private RELIEF_ANGLE: number = 0;
  private RELIEF_ANGLE3: number = 0;
  private ANGLE3_LENGTH: number = 0;
  private APEX_ANGLE: number = 0;
  private CORNER: number = 4;
  private R_SIZE: number = 0.4;
  constructor(
    thickness?: string,
    inscribedcircle?: string,
    materialIncirecle?: string,
    reliefAngle?: string,
    reliefAngle3?: string,
    angleLength?: string,
    apexAngle?: string,
    rSize?: string,
    corner?: string,
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
    if (typeof apexAngle === "string") {
      this.APEX_ANGLE = Number(apexAngle);
    }
    if (typeof corner === "string") {
      this.CORNER = Number(corner);
    }
    if (typeof rSize === "string") {
      this.R_SIZE = Number(rSize);
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
    return (this.INSCRIBEDCIRCLE / 2 * this.cos(this.RELIEF_ANGLE)).toFixed(3);
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
    ).toFixed(3);
  }

  materialNegaHit(): string {
    if (this.RELIEF_ANGLE > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE)) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE))).toFixed(3);
    } else if (this.RELIEF_ANGLE3 > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE3)) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE3))).toFixed(3);
    } else {
      return "NaN"
    }
  }

  materialPosiHit(): string {
    if (this.RELIEF_ANGLE > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE))).toFixed(3);
    } else if (this.RELIEF_ANGLE3 > 0) {
      return ((this.MATERIAL_INCIRCLE / 2 * this.cos(this.RELIEF_ANGLE3))).toFixed(3);
    } else {
      return "NaN"
    }
  }

  processingAngle(): string[] {
    if (this.APEX_ANGLE) {
      let processingAngles: string[] = [];
      processingAngles = [...processingAngles, (this.APEX_ANGLE / 2).toFixed(1)];
      processingAngles = [...processingAngles, (this.APEX_ANGLE / 2 + (180 - this.APEX_ANGLE)).toFixed(1)];
      processingAngles = [...processingAngles, (this.APEX_ANGLE / 2 + (180 - this.APEX_ANGLE) + this.APEX_ANGLE).toFixed(1)];
      processingAngles = [...processingAngles, (this.APEX_ANGLE / 2 + (180 - this.APEX_ANGLE) + this.APEX_ANGLE + (180 - this.APEX_ANGLE)).toFixed(1)];
      return processingAngles;
    }
    return [""];
  }

  cornerHeight(): string {
    if (this.CORNER === 4 && this.APEX_ANGLE === 90) {
      return ((Math.sqrt(2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3);
    } else if (this.CORNER === 4) {
      return ((1 / this.sin(this.APEX_ANGLE / 2) - 1) * (this.INSCRIBEDCIRCLE / 2 - this.R_SIZE)).toFixed(3);
    } else if (this.CORNER === 3) {
      return (3 / 2 * this.INSCRIBEDCIRCLE - this.R_SIZE).toFixed(3);
    } else {
      return "計算できません。";
    }
  }


}
