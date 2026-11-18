type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

const CATEGORY_ACCENTS = [
  { text: "text-n-orange-ink", border: "border-n-orange", open: "group-open:border-n-ink group-open:bg-n-orange group-open:text-n-ink" },
  { text: "text-n-purple-ink", border: "border-n-purple", open: "group-open:border-n-ink group-open:bg-n-purple group-open:text-n-ink" },
  { text: "text-n-yellow-ink", border: "border-n-yellow-dark", open: "group-open:border-n-ink group-open:bg-n-yellow group-open:text-n-ink" },
];

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="space-y-10">
      {categories.map((category, index) => {
        const accent = CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length];
        return (
        <section key={category.title} aria-labelledby={`faq-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
          <h3
            id={`faq-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className={`eyebrow mb-3 ${accent.text}`}
          >
            {category.title}
          </h3>
          <div className={`rounded-card border border-n-border border-l-4 bg-white px-4 shadow-e1 md:px-6 ${accent.border}`}>
            {category.items.map((item) => (
              <details key={item.q} className="group border-b border-n-border last:border-b-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-1 py-4 font-display text-[1.0625rem] font-bold text-n-ink marker:content-none">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-n-control-border font-body text-lg font-normal leading-none text-n-ink transition duration-2 ease-out group-open:rotate-45 ${accent.open}`}
                  >
                    +
                  </span>
                </summary>
                <p className="measure px-1 pb-5 font-body text-base leading-relaxed text-n-ink/75">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
        );
      })}
    </div>
  );
}
