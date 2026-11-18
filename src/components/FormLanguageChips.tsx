"use client";

import { FORM_LANGUAGE_EVENT, LANG_LABELS, LANG_ORDER } from "@/components/ContactForm";

/** Lets an owner pick the form's language from the hero, before scrolling. */
export default function FormLanguageChips() {
  const choose = (lang: string) => {
    window.dispatchEvent(new CustomEvent(FORM_LANGUAGE_EVENT, { detail: lang }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="mt-8">
      <p className="font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/75">
        The form is available in
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {LANG_ORDER.map((lang) => (
          <li key={lang}>
            <button
              type="button"
              lang={lang}
              onClick={() => choose(lang)}
              className="inline-flex min-h-11 items-center rounded-full border border-white/60 bg-white/15 px-4 font-body text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition-colors duration-1 hover:border-white hover:bg-white hover:text-n-night"
            >
              {LANG_LABELS[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
