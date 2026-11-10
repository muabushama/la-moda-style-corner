export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-display text-2xl text-primary-dark sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
}
