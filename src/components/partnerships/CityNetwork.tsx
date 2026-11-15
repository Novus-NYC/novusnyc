"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { PublicPartnership } from "@/data/partnerships";
import { cityPartnerGroups } from "@/data/partnerGroups";
import IntroductionMapSection from "./IntroductionMapSection";

export default function CityNetwork({ partners }: { partners: PublicPartnership[] }) {
  const [city, setCity] = useState<"New York City" | "Chicago">("New York City");
  const [activeChicagoPartner, setActiveChicagoPartner] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const chicago = cityPartnerGroups.find((group) => group.city === "Chicago");
  const chicagoPartners = chicago?.partners ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 md:px-0">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-n-orange">Community network</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white" aria-live="polite">{city}</h2>
        </div>
        <button
          type="button"
          onClick={() => setCity(city === "Chicago" ? "New York City" : "Chicago")}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-n-orange/70 px-5 py-2 font-body text-sm font-semibold text-n-orange transition-colors hover:bg-n-orange hover:text-n-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={city === "Chicago" ? "Return to New York City graph" : "Fly to Chicago graph"}
        >
          {city === "Chicago" ? "← Back to NYC" : <><span aria-hidden="true">✈</span> Fly to Chicago</>}
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {city === "New York City" ? (
          <motion.div key="nyc" initial={reduced ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -24 }} transition={{ duration: reduced ? 0 : 0.25 }}>
            <IntroductionMapSection partners={partners} />
          </motion.div>
        ) : (
          <motion.div key="chicago" initial={reduced ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: 24 }} transition={{ duration: reduced ? 0 : 0.25 }}>
            <div className="relative aspect-[1360/930] min-h-[340px] w-full overflow-hidden" role="group" aria-label="Chicago partner graph with Novus connected to local organizations">
              <svg className="h-full w-full" viewBox="0 0 1360 930" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Chicago community partner icons">
                {chicagoPartners.map((partner, index) => {
                  const y = 420 + (index - (chicagoPartners.length - 1) / 2) * 180;
                  return (
                    <g key={partner.name}>
                      <path d={`M742 420 L997 ${y}`} fill="none" stroke="rgb(var(--color-orange))" strokeWidth="2" strokeDasharray="8 8" />
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={`Show details for ${partner.name}`}
                        aria-pressed={activeChicagoPartner === partner.name}
                        className="cursor-pointer outline-none"
                        onMouseEnter={() => setActiveChicagoPartner(partner.name)}
                        onMouseLeave={() => setActiveChicagoPartner(null)}
                        onFocus={() => setActiveChicagoPartner(partner.name)}
                        onBlur={() => setActiveChicagoPartner(null)}
                        onClick={() => setActiveChicagoPartner(partner.name)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setActiveChicagoPartner(partner.name);
                          }
                        }}
                      >
                        <circle cx="1060" cy={y} r="62" fill="white" stroke="rgb(var(--color-purple))" strokeWidth="4" />
                        <image href={partner.logo} x="1006" y={y - 37} width="108" height="74" preserveAspectRatio="xMidYMid meet" />
                        <circle cx="1060" cy={y} r="68" fill="none" stroke="white" strokeWidth="2" className="opacity-0 focus-visible:opacity-100" />
                      </g>
                      <text x="1060" y={y + 90} textAnchor="middle" className="pointer-events-none fill-white font-body text-[21px] font-semibold">{partner.shortName ?? partner.name}</text>
                    </g>
                  );
                })}
                <circle cx="680" cy="420" r="66" fill="rgb(var(--color-dark))" stroke="rgb(var(--color-orange))" strokeWidth="3" />
                <image href="/logo.png" x="635" y="375" width="90" height="90" preserveAspectRatio="xMidYMid meet" />
                <text x="680" y="510" textAnchor="middle" className="fill-white font-display text-[23px] font-bold">Novus</text>
                <text x="680" y="205" textAnchor="middle" className="fill-white/50 font-body text-[18px] font-semibold uppercase tracking-[0.2em]">Chicago</text>
              </svg>
            </div>
            {chicagoPartners.filter((partner) => partner.name === activeChicagoPartner).map((partner) => (
              <div key={partner.name} className="border-t border-white/10 px-5 pb-8 pt-7 md:px-0">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-n-orange">Chicago community partner</p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">{partner.name}</h3>
                <p className="mt-2 max-w-2xl font-body text-base text-white/75">{partner.detail}</p>
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-body text-sm font-semibold text-n-orange underline underline-offset-4">Visit organization ↗</a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
