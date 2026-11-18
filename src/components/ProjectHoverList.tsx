"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPinIcon } from "@/components/Icons";
import { StatusChip, type ProjectCardData } from "@/components/ProjectCard";
import { siteHost, siteShotFor } from "@/lib/siteShots";

/**
 * Desktop project list: names on the right, the work on the left. Hovering or
 * focusing a name swaps the preview to that business's site and storefront.
 */
export default function ProjectHoverList({ projects }: { projects: ProjectCardData[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];
  const shot = siteShotFor(current.url);

  return (
    <div className="grid grid-cols-[1.1fr_1fr] items-start gap-12">
      <div className="sticky top-28">
        <div className="relative">
          <div className="browser-frame shadow-e3">
            <div className="browser-frame-bar" aria-hidden="true">
              <span className="browser-frame-dots"><span /><span /><span /></span>
              <span className="browser-frame-url">{current.url ? siteHost(current.url) : current.name}</span>
            </div>
            <div className="browser-frame-view">
              {projects.map((project, i) => {
                const src = siteShotFor(project.url) ?? project.imageUrl;
                if (!src) return null;
                return (
                  <Image
                    key={project.name}
                    src={src}
                    alt=""
                    fill
                    sizes="640px"
                    priority={i === 0}
                    className={`object-cover object-top transition-opacity duration-2 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
                  />
                );
              })}
            </div>
          </div>
          {shot && current.imageUrl ? (
            <div className="absolute -bottom-8 -left-8 h-32 w-32 -rotate-3 overflow-hidden rounded-card border-4 border-white shadow-e3">
              <Image key={current.imageUrl} src={current.imageUrl} alt="" fill sizes="128px" className="photo-grade object-cover" />
            </div>
          ) : null}
          <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-4 flex flex-col items-end gap-2">
            <span className="sticker sticker--student">Student-built</span>
            {current.url ? <span className="sticker sticker--live rotate-2">Live site</span> : null}
          </div>
        </div>
      </div>

      <ol className="border-t border-n-border">
        {projects.map((project, i) => {
          const isActive = i === active;
          const content = (
            <>
              <span className="mono-meta w-8 shrink-0 pt-2 text-n-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className={`block font-display text-[clamp(1.6rem,1.1rem+1.2vw,2.3rem)] font-bold leading-tight tracking-[-0.02em] transition-colors duration-1 ${isActive ? "text-n-orange-ink" : "text-n-ink"}`}>
                  {isActive ? <span className="accent-serif">{project.name}</span> : project.name}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="mono-meta inline-flex items-center gap-1.5 text-n-muted">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {project.neighborhood}
                  </span>
                  <StatusChip status={project.status} />
                  {project.services.map((service) => (
                    <span key={service} className="tag border border-n-border bg-white text-n-ink/75">{service}</span>
                  ))}
                </span>
              </span>
              <span aria-hidden="true" className={`pt-2 font-display text-2xl transition-transform duration-2 ease-out ${isActive ? "translate-x-1 text-n-orange-ink" : "text-n-ink/40"}`}>→</span>
            </>
          );
          const rowClass = "flex items-start gap-4 border-b border-n-border py-5 text-left outline-offset-4";
          return (
            <li key={project.name} onMouseEnter={() => setActive(i)}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name} live site`}
                  onFocus={() => setActive(i)}
                  className={rowClass}
                >
                  {content}
                </a>
              ) : (
                <button type="button" onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`${rowClass} w-full`}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
