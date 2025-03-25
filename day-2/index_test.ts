import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { countSafe, isSafe, parseReports, Safety } from "./index.ts";
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
      expected: Safety.SAFE,
    },
    {
      input: [1, 2, 7, 8, 9],
      expected: Safety.UNSAFE,
    },
    {
      input: [9, 7, 6, 2, 1],
      expected: Safety.UNSAFE,
    },
    {
      input: [1, 3, 2, 4, 5],
      expected: Safety.UNSAFE,
    },
    {
      input: [8, 6, 4, 4, 1],
      expected: Safety.UNSAFE,
    },
    {
      input: [1, 3, 6, 7, 9],
      expected: Safety.SAFE,
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
