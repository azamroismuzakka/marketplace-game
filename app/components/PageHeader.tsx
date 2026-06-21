export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16">
        {eyebrow && (
          <span className="text-sm font-semibold text-sky-400">{eyebrow}</span>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">{description}</p>
        )}
      </div>
    </section>
  );
}
