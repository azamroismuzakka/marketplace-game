export type LegalSection = {
  heading: string;
  body: string;
};

export default function LegalContent({
  sections,
  updatedAt,
}: {
  sections: LegalSection[];
  updatedAt: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm text-slate-500">Terakhir diperbarui: {updatedAt}</p>
      <div className="mt-8 space-y-8">
        {sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-white">
              {i + 1}. {section.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-slate-400">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
