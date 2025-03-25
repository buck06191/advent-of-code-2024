type Input = {
  listOne: number[];
  listTwo: number[];
};

export function parseInput(input: string): Input {
  const listOne: number[] = [];
  const listTwo: number[] = [];
  input.split('\n').forEach((line) => {
    const numbers = line.split(' ');
    const numOne = parseInt(numbers[0]);
    const numTwo = parseInt(numbers[numbers.length - 1]);
    listOne.push(!isNaN(numOne) ? numOne : 0);
    listTwo.push(!isNaN(numTwo) ? numTwo : 0);
  });
  return { listOne, listTwo };
}

export function calculateDistance(
  listOne: number[],
  listTwo: number[],
): number {
  listOne.sort();
  listTwo.sort();

  const distances = listOne.map((val, idx) => {
    return Math.abs(val - listTwo[idx]);
  });

  return distances.reduce((a, b) => a + b, 0);
}

export function countNumbers(list: number[]) {
  const count = list.reduce(
    (acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );
  return count;
}

export function totalByCount(listOne: number[], listTwo: number[]): number {
  const count = countNumbers(listTwo);
  const individualTotals = listOne.map((val) => {
    return val * (count[val] || 0);
  });

  return individualTotals.reduce((a, b) => a + b, 0);
}

export async function main(filePath: string) {
  console.log('##### Part One #####');
  const text = await Deno.readTextFile(filePath);
  const { listOne, listTwo } = parseInput(text);
  const distance = calculateDistance(listOne, listTwo);
  console.log({ distance });

  console.log('##### Part Two #####');
  const secondDistance = totalByCount(listOne, listTwo);

  console.log({ secondDistance });
}
