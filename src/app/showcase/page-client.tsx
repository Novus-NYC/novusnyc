"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import NeighborhoodMap from "@/components/NeighborhoodMap";
import NextStep from "@/components/NextStep";
import ProjectCard from "@/components/ProjectCard";

type ProjectDisplayStatus = "Ongoing" | "Upcoming" | "Completed";

type ShowcaseProject = {
  name: string;
  type: string;
  neighborhood: string;
  borough: string;
  services: string[];
  status: ProjectDisplayStatus;
  colorClass: string;
  desc: string;
  url?: string;
  imageUrl?: string;
  quote?: string;
};

const BOROUGH_ORDER = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

function FilterGroup({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <p className="w-24 shrink-0 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-n-muted">{label}</p>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {["All", ...options].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className="filter-chip shrink-0"
          >
            {option}
            {option !== "All" ? <span className="filter-chip-count">{counts[option] ?? 0}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ShowcaseClient({
  projects,
  mapProjects,
  totalBusinesses,
  orgPartners,
}: {
  projects: ShowcaseProject[];
  mapProjects: Array<{
    name: string; type: string; services: string[]; neighborhood: string;
    borough?: string; lat?: number; lng?: number; status: ProjectDisplayStatus;
    url?: string; colorClass: string; source?: "business" | "bid";
  }>;
  totalBusinesses: string;
  orgPartners: string;
}) {
  const [service, setService] = useState("All");
  const [borough, setBorough] = useState("All");

  const serviceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((project) => project.services.forEach((item) => { counts[item] = (counts[item] ?? 0) + 1; }));
    return counts;
  }, [projects]);

  const boroughCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((project) => { if (project.borough) counts[project.borough] = (counts[project.borough] ?? 0) + 1; });
    return counts;
  }, [projects]);

  const serviceOptions = useMemo(
    () => Object.keys(serviceCounts).sort((a, b) => serviceCounts[b] - serviceCounts[a]),
    [serviceCounts],
  );
  const boroughOptions = BOROUGH_ORDER.filter((name) => boroughCounts[name]);

  // The homepage links here with ?service=…; honor it once on arrival.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && serviceCounts[requested]) setService(requested);
  }, [serviceCounts]);

  const filtered = projects.filter((project) =>
    (service === "All" || project.services.includes(service))
    && (borough === "All" || project.borough === borough));

  return (
    <>
      {/* ── INTRO ─────────────────────────────────────────────── */}
      <section id="showcase-overview" className="section-flush-bottom blueprint blueprint--dark band-night relative overflow-hidden pb-0 pt-32">
        <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
          <Eyebrow onDark>Our Work</Eyebrow>
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="type-display text-white">
              Projects across<br />
              <span className="accent-serif text-n-orange">New York City</span>
            </h1>
            <dl className="flex gap-3 md:pb-2">
              <div className="rounded-card border border-white/15 px-5 py-4">
                <dd className="stat-value font-display text-4xl font-bold leading-none text-n-orange">{totalBusinesses}</dd>
                <dt className="mt-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-white/70">Businesses</dt>
              </div>
              <Link href="/partners" className="group rounded-card border border-white/15 px-5 py-4 transition-colors duration-1 hover:border-n-orange/70">
                <dd className="stat-value font-display text-4xl font-bold leading-none text-n-orange">{orgPartners}</dd>
                <dt className="mt-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-white/70 transition-colors group-hover:text-white">
                  Community organizations <span aria-hidden="true">→</span>
                </dt>
              </Link>
            </dl>
          </div>
        </div>

        {/* ── MAP ───────────────────────────────────────────────── */}
        <div id="showcase-map" className="relative z-0 h-[480px] w-full md:h-[600px]">
          <NeighborhoodMap projects={mapProjects} />
        </div>
      </section>

      {/* ── PROJECT CARDS ───────────────────────────────────── */}
      <section id="showcase-projects" className="bg-n-bg py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedSection className="mb-6">
            <Eyebrow tone="business">Our work</Eyebrow>
            <h2 className="type-h2 mt-3 text-n-ink">Selected <span className="accent-serif">Projects</span></h2>
          </AnimatedSection>

          {projects.length === 0 ? (
            <div className="rounded-card border border-n-border bg-white px-6 py-10 text-center">
              <p className="font-display text-xl font-bold text-n-ink">Project stories are being prepared.</p>
              <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-n-muted">Novus teams are actively building with businesses across the city. Check back soon for the next published project stories.</p>
              <Link href="/businesses#contact" className="mt-5 inline-flex font-body text-sm font-semibold text-n-purple hover:underline">Get free business support →</Link>
            </div>
          ) : (
            <>
              <div className="mb-8 space-y-3 rounded-card border border-n-border bg-white p-4 shadow-e1 md:p-5">
                <FilterGroup label="Service" options={serviceOptions} value={service} onChange={setService} counts={serviceCounts} />
                {boroughOptions.length > 0 ? (
                  <FilterGroup label="Borough" options={boroughOptions} value={borough} onChange={setBorough} counts={boroughCounts} />
                ) : null}
                <p className="font-mono text-[0.8125rem] text-n-muted" aria-live="polite">
                  {filtered.length} of {projects.length} projects
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-card border border-dashed border-n-border bg-white px-6 py-10 text-center">
                  <p className="font-display text-lg font-bold text-n-ink">No projects match both filters.</p>
                  <button type="button" onClick={() => { setService("All"); setBorough("All"); }} className="btn btn-sm btn-outline mt-4">
                    Clear filters
                  </button>
                </div>
              ) : (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((project, index) => (
                    <li key={project.name} className="[content-visibility:auto] [contain-intrinsic-size:auto_520px]">
                      <ProjectCard project={project} showDescription priority={index < 3} />
                    </li>
                  ))}
                </ul>
              )}

            </>
          )}
        </div>
      </section>

      <NextStep
        eyebrow="Work with us"
        title="Looking for support for your business?"
        description="We're taking on new projects across New York City. Tell us about your business and the support you need, and we'll follow up within a few business days."
        links={[{ href: "/businesses#contact", label: "Work with us", tone: "business" }]}
        footnote={
          <>
            Run a chamber, BID or community organization?{" "}
            <Link href="/partners#what-partnering-means" className="font-semibold text-n-orange underline-offset-4 hover:underline">
              See how partnering with Novus works
            </Link>
          </>
        }
      />
    </>
  );
}
