export function SelectField({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      {label ? <span className="mb-1.5 block text-foreground">{label}</span> : null}
      <select
        {...props}
        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
      >
        {children}
      </select>
    </label>
  );
}
