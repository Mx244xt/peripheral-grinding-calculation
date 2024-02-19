export class Calculation {
  private THICKNESS: number = 4.76;
  private INSCRIBEDCIRCLE: number = 12.7;
  private RELIEF_ANGLE: number = 7;
  private RELIEF_ANGLE3: number = 11;
  private ANGLE3_LENGTH: number = 1;
  constructor(thickness?: string, inscribedcircle?: string, reliefAngle?: string, reliefAngle3?: string, angleLength?: string) {
    if (typeof thickness === "string") {
      this.THICKNESS = Number(thickness);
    }
    if (typeof inscribedcircle === "string") {
      this.INSCRIBEDCIRCLE = Number(inscribedcircle);
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
        (this.INSCRIBEDCIRCLE / 2)
        + ((this.ANGLE3_LENGTH * this.tan(this.RELIEF_ANGLE3))
          - (this.ANGLE3_LENGTH * this.tan(this.RELIEF_ANGLE)))
      )
      * this.cos(this.RELIEF_ANGLE3)
    ).toFixed(3);
  }
  materialHit(): string {
    if (this.RELIEF_ANGLE > 0) {
      return (Number(this.reliefAngle()) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE))).toFixed(3);
    } else {
      return ((this.INSCRIBEDCIRCLE / 2 * this.cos(this.RELIEF_ANGLE3)) + (this.THICKNESS * this.sin(this.RELIEF_ANGLE3))).toFixed(3);
    }
  }
}

new Calculation("4.76", "12.7", "7");
