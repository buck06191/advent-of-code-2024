export type MemoryInstruction = {
  operation: string;
  num1: number;
  num2: number;
};

export function parseMemory(input: string): MemoryInstruction[] {
  const pattern = /(?<operation>mul)\((?<num1>\d+),(?<num2>\d+)\)/g;

  return [...input.matchAll(pattern)]
    .map(({ groups }) => {
      if (!groups) {
        return undefined;
      }

      return {
        operation: groups.operation,
        num1: parseInt(groups.num1),
        num2: parseInt(groups.num2),
      };
    })
    .filter((instruction) => !!instruction);
}

export function processInstruction({
  operation,
  num1,
  num2,
}: MemoryInstruction): number {
  switch (operation) {
    case "mul":
      return num1 * num2;
    default:
      return 0;
  }
}

export function processInstructions(instructions: MemoryInstruction[]): number {
  return instructions.reduce((prevResult, currentInstruction) => {
    return prevResult + processInstruction(currentInstruction);
  }, 0);
}

export async function main(filePath: string) {
  console.log("##### Part One #####");
  const input = await Deno.readTextFile(filePath);

  const instructions = parseMemory(input);
  const output = processInstructions(instructions);
  console.log(`Output is ${output}`);

  console.log("##### Part Two #####");
}
