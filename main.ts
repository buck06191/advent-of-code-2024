import { main as dayOne } from "./day-1/index.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const dayOneInput = "./day-1/input.txt";
  dayOne(dayOneInput);
}
