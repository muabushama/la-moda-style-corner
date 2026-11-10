import { Button } from "./Button";

export function EmptyState({
  title,
  hint,
  actionHref,
  actionLabel,
}: {
  title: string;
  hint: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-white px-8 py-16 text-center shadow-sm">
      <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-lavender text-2xl text-primary">
        ◦
      </div>
      <h1 className="font-display text-2xl">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{hint}</p>
      <Button href={actionHref} className="mt-6">
        {actionLabel}
      </Button>
    </div>
  );
}
