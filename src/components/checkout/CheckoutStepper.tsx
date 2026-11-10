export function CheckoutStepper({
  step,
  labels,
}: {
  step: number;
  labels: string[];
}) {
  return (
    <ol className="mb-8 flex flex-wrap gap-3 text-sm">
      {labels.map((label, i) => (
        <li
          key={label}
          className={`rounded-full px-3 py-1 ${i + 1 === step ? "bg-primary text-white" : "bg-lavender text-muted"}`}
        >
          {i + 1}. {label}
        </li>
      ))}
    </ol>
  );
}
