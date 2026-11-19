import { INSTRUCTIONS } from "@/lib/instructions";

export function InstructionPanel() {
  return (
    <section aria-labelledby="instruction-title" className="lg:pl-6">
      <h2 id="instruction-title" className="mb-5 text-xl font-medium">
        Instruction
      </h2>
      <ul className="list-disc space-y-3 pl-5 text-sm leading-7 marker:text-primary">
        {INSTRUCTIONS.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
