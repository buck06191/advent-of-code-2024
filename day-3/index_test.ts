import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  MemoryInstruction,
  parseMemory,
  processInstructions,
} from "./index.ts";
import { assertEquals } from "@std/assert/equals";

const partOneInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const partTwoInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe("parseMemory", () => {
  describe("partOne", () => {
    let actual: MemoryInstruction[];

    beforeEach(() => {
      actual = parseMemory(partOneInput, "partOne");
    });
    it("should extract the correct instructions", () => {
      assertEquals(actual, [
        { operation: "mul", num1: 2, num2: 4 },
        { operation: "mul", num1: 5, num2: 5 },
        { operation: "mul", num1: 11, num2: 8 },
        { operation: "mul", num1: 8, num2: 5 },
      ]);
    });
  });

  describe("partTwo", () => {
    let actual: MemoryInstruction[];

    beforeEach(() => {
      actual = parseMemory(partTwoInput, "partTwo");
    });
    it("should extract the correct instructions", () => {
      assertEquals(actual, [
        { operation: "mul", num1: 2, num2: 4 },
        { operation: "don't" },
        { operation: "mul", num1: 5, num2: 5 },
        { operation: "mul", num1: 11, num2: 8 },
        { operation: "do" },
        { operation: "mul", num1: 8, num2: 5 },
      ]);
    });
  });
});

const partOneScenario = {
  description: "with only multiplication instructions",
  input: [
    { operation: "mul", num1: 2, num2: 4 },
    { operation: "mul", num1: 5, num2: 5 },
    { operation: "mul", num1: 11, num2: 8 },
    { operation: "mul", num1: 8, num2: 5 },
  ] as MemoryInstruction[],
  expected: 161,
};

const partTwoScenario = {
  description: "with enablement and multiplication instructions",
  input: [
    { operation: "mul", num1: 2, num2: 4 },
    { operation: "don't" },
    { operation: "mul", num1: 5, num2: 5 },
    { operation: "mul", num1: 11, num2: 8 },
    { operation: "do" },
    { operation: "mul", num1: 8, num2: 5 },
  ] as MemoryInstruction[],
  expected: 48,
};

const scenarios = [partOneScenario, partTwoScenario];

describe("processInstructions", () => {
  scenarios.forEach(({ description, input, expected }) => {
    describe(description, () => {
      it("should process the instructions correctly", () => {
        const actual = processInstructions(input);
        assertEquals(actual, expected);
      });
    });
  });
});
