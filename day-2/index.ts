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

export function isSafe(report: number[]): boolean {
  const differences = getDifferences(report);
  const inSafeBounds = differences.every((n) => {
    const absDiff = Math.abs(n);
    return absDiff < 4 && absDiff > 0;
  });

  const isMonotonic = differences
    .map((d) => Math.sign(d))
    .every((n, _idx, array) => {
      return n === array[0];
    });

  return inSafeBounds && isMonotonic;
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

  return safetyReports.filter((report) => report).length;
}

export function dampenReport(report: number[]): number[][] {
  return report.map((_n, idx) => {
    const copiedReport = [...report];
    copiedReport.splice(idx, 1);
    return copiedReport;
  });
}

export function countSafeWithDampener(input: string, verbose?: boolean) {
  const reports = parseReports(input);
  const safetyReports = reports.map((report) => {
    const isReportSafe = isSafe(report);
    if (verbose) {
      console.log({ report, isReportSafe });
    }

    if (isReportSafe) {
      return isReportSafe;
    }

    const dampenedReports = dampenReport(report);
    for (const dampenedReport of dampenedReports) {
      const isSafeWhenDampened = isSafe(dampenedReport);
      if (isSafeWhenDampened) return isSafeWhenDampened;
    }

    return false;
  });

  return safetyReports.filter((report) => report).length;
}

export async function main(filePath: string) {
  console.log("##### Part One #####");
  const input = await Deno.readTextFile(filePath);
  const safetyCount = countSafe(input, false);
  console.log({ safetyCount });

  console.log("##### Part Two #####");

  const safetyCountWithDampener = countSafeWithDampener(input, false);
  console.log({ safetyCountWithDampener });
}
