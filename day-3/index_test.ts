import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  MemoryInstruction,
  parseMemory,
  processInstruction,
  processInstructions,
} from "./index.ts";
import { assertEquals } from "@std/assert/equals";

const input =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

describe("parseMemory", () => {
  let actual: MemoryInstruction[];

  beforeEach(() => {
    actual = parseMemory(input);
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

describe("processInstruction", () => {
  const inputs = [
    { instruction: { operation: "mul", num1: 2, num2: 4 }, expected: 8 },
    { instruction: { operation: "mul", num1: 5, num2: 5 }, expected: 25 },
    { instruction: { operation: "mul", num1: 11, num2: 8 }, expected: 88 },
    { instruction: { operation: "mul", num1: 8, num2: 5 }, expected: 40 },
  ];

  inputs.forEach(({ instruction, expected }) => {
    it("should process the instruction correctly", () => {
      const actual = processInstruction(instruction);
      assertEquals(actual, expected);
    });
  });
});

describe("processInstructions", () => {
  const input = [
    { operation: "mul", num1: 2, num2: 4 },
    { operation: "mul", num1: 5, num2: 5 },
    { operation: "mul", num1: 11, num2: 8 },
    { operation: "mul", num1: 8, num2: 5 },
  ];

  it("should process the instructions correctly", () => {
    const actual = processInstructions(input);
    assertEquals(actual, 161);
  });
});
