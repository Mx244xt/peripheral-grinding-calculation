import { describe, expect, test } from '@jest/globals';
import { Calculation } from "../lib/calculation";

describe.skip('逃げ角', () => {
  test('SC1204', () => {
    const calc = new Calculation("4.76", "12.7", "7", "11", "1");
    expect((calc.reliefAngle())).toBe("6.303");
    expect((calc.materialHit())).toBe("6.883");
    expect((calc.reliefAngle3())).toBe("6.304");
  });
  test('SC1204', () => {
    const calc = new Calculation("4.76", "12.7", "0", "11", "1");
    expect((calc.reliefAngle())).toBe("6.350");
    expect((calc.materialHit())).toBe("7.142");
    expect((calc.reliefAngle3())).toBe("6.424");
  });
  test("SC0903", () => {
    const calc = new Calculation("3.18", "9.525", "7", "11", "1");
    expect((calc.reliefAngle())).toBe("4.727");
    expect((calc.materialHit())).toBe("5.115");
    expect((calc.reliefAngle3())).toBe("4.745");
  })
  test("SC0903", () => {
    const calc = new Calculation("3.18", "9.525", "0", "11", "1");
    expect((calc.reliefAngle())).toBe("4.763");
    expect((calc.materialHit())).toBe("5.282");
    expect((calc.reliefAngle3())).toBe("4.866");
  })
  test("SC0903", () => {
    const calc = new Calculation("3.18", "9.525", "0", "11", "0");
    expect((calc.reliefAngle())).toBe("4.763");
    expect((calc.materialHit())).toBe("5.282");
    expect((calc.reliefAngle3())).toBe("4.675");
  })
});