"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import NetworkConstellation from "@/components/NetworkConstellation";
import { chapterConnections, chapterLocations } from "@/data/network";

const NetworkFluidBackground = dynamic(() => import("@/components/NetworkFluidBackground"), {
  ssr: false,
});

const NetworkGlobe = dynamic(() => import("@/components/NetworkGlobe"), {
  ssr: false,
  loading: () => <div className="h-[360px] sm:h-[460px] lg:h-[560px]" aria-hidden="true" />,
});

export default function HomeNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadVisuals, setShouldLoadVisuals] = useState(false);

  // Phones get the static constellation; the WebGL globe and the fluid
  // background only load on wider screens, and only once the section is near.
  useEffect(() => {
    const section = sectionRef.current;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoadVisuals(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadVisuals(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // The globe carries international members too; this column does not, because
  // the sentence above it says "across the country".
  const listedLocations = chapterLocations.filter((location) => location.type !== "international");

  const cities = listedLocations.filter((location) => !location.globeLabel);
  const states = listedLocations.filter((location) => location.globeLabel);

  return (
    <section ref={sectionRef} className="home-network-section relative overflow-hidden py-16 sm:py-20 md:py-24">
      {shouldLoadVisuals && <NetworkFluidBackground />}
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <AnimatedSection>
          <Eyebrow onDark index={4}>Our network</Eyebrow>
          <h2 className="type-display mt-5 max-w-[14ch] text-white">
            From New York City to new communities.
          </h2>
          <p className="measure mt-6 font-body text-lg leading-relaxed text-white/85">
            Novus began in New York City and is growing through student-led teams in communities across the country, and a few beyond it.
          </p>

          <div className="mt-8 border-t border-white/15 pt-5" aria-label="Novus chapter locations">
            <p className="font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-n-orange">
              {listedLocations.length} locations
            </p>
            {[{ title: "Cities and regions", items: cities }, { title: "States", items: states }].map((group) => (
              <div key={group.title} className="mt-4">
                <p className="font-mono text-[0.8125rem] text-white/60">{group.title}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((location) => (
                    <li
                      key={location.name}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-[0.9375rem] ${
                        location.type === "hub"
                          ? "border-n-orange bg-n-orange text-n-ink font-semibold"
                          : "border-white/25 text-white/90"
                      }`}
                    >
                      {location.name}
                      {location.type === "hub" ? <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider">Hub</span> : null}
                      <span className="sr-only">, {location.state}{location.subtitle ? `, ${location.subtitle}` : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="md:hidden">
          <NetworkConstellation locations={chapterLocations} />
        </div>
        <AnimatedSection delay={0.08} direction="right" className="network-globe-frame hidden md:block">
          {shouldLoadVisuals ? (
            <NetworkGlobe locations={chapterLocations} connections={chapterConnections} />
          ) : (
            <div className="h-[460px] lg:h-[560px]" aria-hidden="true" />
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
