import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert";

import {
  calculateDistance,
  parseInput,
  countNumbers,
  totalByCount,
} from "./index.ts";
// Input
//
// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

const listOne = [3, 4, 2, 1, 3, 3];
const listTwo = [4, 3, 5, 3, 9, 3];

describe("parseInput", () => {
  it("should parse the text into arrays", () => {
    const actual = parseInput(input);

    assertEquals(actual, { listOne, listTwo });
  });
});

describe("calculateDistance", () => {
  it("should calculate the correct distance between items", () => {
    const distance = calculateDistance(listOne, listTwo);
    assertEquals(distance, 11);
  });
});

describe("countNumbers", () => {
  it("should calculate the correct count of items", () => {
    const count = countNumbers(listTwo);
    assertEquals(count, { 3: 3, 5: 1, 4: 1, 9: 1 });
  });
});

describe("totalByCount", () => {
  it("should calculate the correct total using count of items", () => {
    const total = totalByCount(listOne, listTwo);
    assertEquals(total, 31);
  });
});
