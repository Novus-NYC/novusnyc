import Image from "next/image";
import ExpandableDescription from "@/components/ExpandableDescription";
import Illustration from "@/components/Illustrations";
import { MapPinIcon } from "@/components/Icons";
import { siteHost, siteShotFor } from "@/lib/siteShots";

export type ProjectCardData = {
  name: string;
  type: string;
  neighborhood: string;
  services: string[];
  status: "Ongoing" | "Upcoming" | "Completed";
  url?: string;
  imageUrl?: string;
  desc?: string;
  quote?: string;
};

// A warm, blurred stand-in while remote project images load.
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0IDMnPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDE9JzAnIHkxPScwJyB4Mj0nMScgeTI9JzEnPjxzdG9wIG9mZnNldD0nMCcgc3RvcC1jb2xvcj0nI2ZiZTZkYScvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI2VmZTZlZicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSc0JyBoZWlnaHQ9JzMnIGZpbGw9J3VybCgjZyknLz48L3N2Zz4=";

export function serviceTagClass(service: string): string {
  const key = service.trim().toLowerCase();
  if (key.includes("website") || key.includes("seo") || key.includes("google")) {
    return "border-n-purple/50 bg-n-purple/15 text-n-ink";
  }
  if (key.includes("social") || key.includes("design")) {
    return "border-n-orange/60 bg-n-orange/15 text-n-ink";
  }
  if (key.includes("finance") || key.includes("grant") || key.includes("payment")) {
    return "border-n-yellow-dark bg-n-yellow/35 text-n-ink";
  }
  return "border-n-border bg-n-bg text-n-muted";
}

export function StatusChip({ status }: { status: ProjectCardData["status"] }) {
  const tone = status === "Completed" ? "completed" : status === "Ongoing" ? "ongoing" : "upcoming";
  return (
    <span className={`status-chip status-chip--${tone}`}>
      {status === "Completed" ? (
        <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6.2 5 8.5l4.5-5" />
        </svg>
      ) : (
        <span aria-hidden="true" className="status-dot" />
      )}
      {status}
    </span>
  );
}

function FrameView({ project, shot, sizes, priority }: { project: ProjectCardData; shot?: string; sizes: string; priority?: boolean }) {
  if (shot) {
    return (
      <div className="browser-frame-view browser-frame-view--screen">
        <Image
          src={shot}
          alt={`The ${project.name} website built by a Novus team`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }
  if (project.imageUrl) {
    return (
      <div className="browser-frame-view browser-frame-view--photo">
        <Image
          src={project.imageUrl}
          alt={`Preview of ${project.name}, a ${project.type.toLowerCase()} project in ${project.neighborhood}`}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR}
          className="photo-grade object-cover"
        />
      </div>
    );
  }
  return (
    <div className="browser-frame-view flex flex-col items-center justify-center gap-2">
      <Illustration name="website" className="h-16 w-16 opacity-80" />
      <span className="mono-meta uppercase text-n-muted">Project photo coming soon</span>
    </div>
  );
}

export default function ProjectCard({
  project,
  spotlight = false,
  showDescription = false,
  sizes = "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw",
  priority = false,
}: {
  project: ProjectCardData;
  spotlight?: boolean;
  showDescription?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const shot = siteShotFor(project.url);
  const host = project.url ? siteHost(project.url) : "";

  return (
    <article className={`project-tile group relative ${project.url ? "is-link" : ""} ${spotlight ? "lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-stretch" : ""}`}>
      <div className={`relative ${spotlight ? "p-3 sm:p-4 lg:p-5" : "p-3"}`}>
        <div className="browser-frame">
          <div className="browser-frame-bar" aria-hidden="true">
            <span className="browser-frame-dots"><span /><span /><span /></span>
            <span className="browser-frame-url">{host || project.name.toLowerCase()}</span>
          </div>
          <FrameView project={project} shot={shot} sizes={spotlight ? "(min-width: 1024px) 680px, 92vw" : sizes} priority={priority} />
        </div>
        {shot && project.imageUrl && !spotlight ? (
          <div className="absolute bottom-6 left-6 h-16 w-16 overflow-hidden rounded-xl border-[3px] border-white shadow-e2 sm:h-20 sm:w-20">
            <Image src={project.imageUrl} alt="" fill sizes="80px" className="photo-grade object-cover" />
          </div>
        ) : null}
        {spotlight ? (
          <div className="pointer-events-none absolute bottom-7 right-6 flex flex-col items-end gap-2 sm:bottom-9 sm:right-9">
            <span className="sticker sticker--student">Student-built</span>
            {project.url ? <span className="sticker sticker--live rotate-2">Live site</span> : null}
          </div>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col ${spotlight ? "p-5 pt-2 sm:p-7 lg:justify-center lg:py-10 lg:pl-4 lg:pr-10" : "px-5 pb-5 pt-2"}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusChip status={project.status} />
          {project.services.map((service) => (
            <span key={service} className={`tag border ${serviceTagClass(service)}`}>{service}</span>
          ))}
        </div>
        <h3 className={`font-display font-bold leading-tight text-n-ink ${spotlight ? "type-h2" : "text-[1.375rem]"}`}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} live site`}
              className="after:absolute after:inset-0 after:z-[1] after:rounded-card focus-visible:outline-none"
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="mono-meta mt-2 flex items-center gap-1.5 text-n-muted">
          <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0" />
          {project.neighborhood}
        </p>
        {showDescription && project.desc ? (
          <ExpandableDescription desc={project.desc} className="relative z-[2] mt-3" />
        ) : null}
        {spotlight && shot && project.imageUrl ? (
          <div className="relative mt-6 aspect-[3/2] w-full max-w-sm overflow-hidden rounded-xl border-[3px] border-white shadow-e2">
            <Image src={project.imageUrl} alt={`${project.name} in ${project.neighborhood}`} fill sizes="384px" className="photo-grade object-cover" />
          </div>
        ) : null}
        {spotlight && !showDescription && project.desc ? (
          <p className="measure mt-4 font-body text-base leading-relaxed text-n-ink/75">{project.desc}</p>
        ) : null}
        {project.quote ? (
          <blockquote className="mt-4 border-l-2 border-n-orange pl-3 font-body text-sm italic leading-relaxed text-n-muted">
            &ldquo;{project.quote}&rdquo;
          </blockquote>
        ) : null}
        {project.url ? (
          <span className={`project-tile-link ${spotlight ? "pt-6" : "mt-auto pt-4"}`}>
            View live site <span aria-hidden="true" className="transition-transform duration-2 ease-out group-hover:translate-x-1">→</span>
          </span>
        ) : null}
      </div>
    </article>
  );
}
