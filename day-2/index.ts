export enum Safety {
  SAFE = "safe",
  UNSAFE = "unsafe",
}

export function parseReports(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map((stringReport: string) => {
      return stringReport.split(" ").map((n) => parseInt(n));
    });
}

function getDifferences(report: number[]): number[] {
  return report.slice(1).map((n, idx) => {
    return n - report[idx];
  });
}

export function isSafe(report: number[]): Safety {
  const differences = getDifferences(report);
  const inSafeBounds = differences.every((n) => {
    const absDiff = Math.abs(n);
    return absDiff < 4 && absDiff > 0;
  });

  const isOscillating = !differences
    .map((d) => Math.sign(d))
    .every((n, _idx, array) => {
      return n === array[0];
    });

  return inSafeBounds && !isOscillating ? Safety.SAFE : Safety.UNSAFE;
}

export function countSafe(input: string, verbose?: boolean) {
  const reports = parseReports(input);
  const safetyReports = reports.map((report) => {
    const isReportSafe = isSafe(report);
    if (verbose) {
      console.log({ report, isReportSafe });
    }
    return isReportSafe;
  });

  return safetyReports.filter((report) => report === Safety.SAFE).length;
}

export async function main(filePath: string) {
  console.log("##### Part One #####");
  const input = await Deno.readTextFile(filePath);
  const safetyCount = countSafe(input, true);
  console.log({ safetyCount });

  console.log("##### Part Two #####");
}
