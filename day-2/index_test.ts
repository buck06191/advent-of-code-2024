import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  countSafe,
  countSafeWithDampener,
  dampenReport,
  isSafe,
  parseReports,
} from "./index.ts";
import { assertEquals } from "@std/assert/equals";

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

describe("parseReports", () => {
  let actual: number[][];

  beforeEach(() => {
    actual = parseReports(input);
  });
  it("should split the reports file correctly", () => {
    assertEquals(actual.length, 6);
  });
  it("should convert the strings to numbers correctly", () => {
    const expectedReports = [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ];

    assertEquals(actual, expectedReports);
  });
});

describe("isSafe", () => {
  const inputs = [
    {
      input: [7, 6, 4, 2, 1],
      expected: true,
    },
    {
      input: [1, 2, 7, 8, 9],
      expected: false,
    },
    {
      input: [9, 7, 6, 2, 1],
      expected: false,
    },
    {
      input: [1, 3, 2, 4, 5],
      expected: false,
    },
    {
      input: [8, 6, 4, 4, 1],
      expected: false,
    },
    {
      input: [1, 3, 6, 7, 9],
      expected: true,
    },
  ];

  inputs.forEach(({ input, expected }) => {
    it(`should parse ${input} as ${expected}`, () => {
      const actual = isSafe(input);

      assertEquals(actual, expected);
    });
  });
});

describe("countSafe", () => {
  it("should parse input correctly", () => {
    const actual = countSafe(input);
    assertEquals(actual, 2);
  });
});

describe("dampenReport", () => {
  it("should get all dampened combinations", () => {
    const actual = dampenReport([1, 2, 3, 4]);
    const expected = [
      [2, 3, 4],
      [1, 3, 4],
      [1, 2, 4],
      [1, 2, 3],
    ];
    assertEquals(actual, expected);
  });
});

describe("countSafeWithDampener", () => {
  it("should parse input correctly", () => {
    const actual = countSafeWithDampener(input);
    assertEquals(actual, 4);
  });
});
