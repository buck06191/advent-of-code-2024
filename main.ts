import { main as dayOne } from "./day-1/index.ts";
import { main as dayTwo } from "./day-2/index.ts";

function runDayOne() {
  const dayOneInput = "./day-1/input.txt";
  dayOne(dayOneInput);
}

function runDayTwo() {
  const dayTwoInput = "./day-2/input.txt";
  dayTwo(dayTwoInput);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [day] = Deno.args;

  switch (day) {
    case "day-1":
      runDayOne();
      break;
    case "day-2":
      runDayTwo();
      break;
    default:
      console.error(`Unrecognised day: ${day}`);
  }
}
