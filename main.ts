import { main as dayOne } from "./day-1/index.ts";

function runDayOne() {
  const dayOneInput = "./day-1/input.txt";
  dayOne(dayOneInput);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [day] = Deno.args;

  switch (day) {
    case "day-1":
      runDayOne();
      break;
    default:
      console.error(`Unrecognised day: ${day}`);
  }
}
