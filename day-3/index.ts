export type EnableInstruction = {
  operation: "do";
};

export type DisableInstruction = {
  operation: "don't";
};

export type MultiplicationInstruction = {
  operation: "mul";
  num1: number;
  num2: number;
};

export type MemoryInstruction =
  | EnableInstruction
  | DisableInstruction
  | MultiplicationInstruction;

export function parseMemory(
  input: string,
  day: "partOne" | "partTwo",
): MemoryInstruction[] {
  const pattern =
    day === "partOne"
      ? /(?<operation>mul)\((?<numbers>\d+,\d+)\)/g
      : /(?<operation>mul|do|don't)\((?<numbers>\d+,\d+)*\)/g;

  const possibleInstructions = [...input.matchAll(pattern)].map(
    ({ groups }) => {
      if (!groups) {
        return undefined;
      }

      switch (groups.operation) {
        case "mul": {
          const numbers = groups.numbers;
          const [num1, num2] = numbers.split(",").map((num) => parseInt(num));

          return {
            operation: groups.operation,
            num1,
            num2,
          };
        }
        case "do":
        case "don't":
          return { operation: groups.operation };
        default:
          throw new Error(`Unexpected Operation: ${groups.operation}`);
      }
    },
  );

  return possibleInstructions.filter((instruction) => !!instruction);
}

export function processInstructions(instructions: MemoryInstruction[]): number {
  let isEnabled = true;
  return instructions.reduce((prevResult, currentInstruction) => {
    switch (currentInstruction.operation) {
      case "do": {
        isEnabled = true;
        return prevResult;
      }
      case "don't": {
        isEnabled = false;
        return prevResult;
      }
      case "mul": {
        return (
          prevResult +
          (isEnabled ? currentInstruction.num1 * currentInstruction.num2 : 0)
        );
      }
    }
  }, 0);
}

export async function main(filePath: string) {
  const input = await Deno.readTextFile(filePath);

  console.log("##### Part One #####");
  const instructionsOne = parseMemory(input, "partOne");
  const outputOne = processInstructions(instructionsOne);
  console.log(`Output is ${outputOne}`);

  console.log("##### Part Two #####");

  const instructionsTwo = parseMemory(input, "partTwo");
  const outputTwo = processInstructions(instructionsTwo);
  console.log(`Output is ${outputTwo}`);
}
