"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Wordmark from "@/components/Wordmark";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Our Work and Partnerships sit together as the proof of the work; the
// audience pages follow About.
const links = [
  { href: "/showcase", label: "Our Work" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/businesses", label: "For Businesses" },
  { href: "/join", label: "For Students" },
];

const memberLink = { href: "/members", label: "Member Portal" };

// The mobile sheet groups the same links by who they are for.
const mobileGroups = [
  { title: "For businesses", tone: "text-n-yellow", links: [links[3], links[0], links[1]] },
  { title: "For students", tone: "text-n-purple", links: [links[4], { href: "/apply", label: "Apply Now" }] },
  { title: "Novus", tone: "text-n-orange", links: [links[2], memberLink] },
];

// The navbar is always a warm, translucent dark. The palette is pastel, so a
// light bar washes the accents out and a mid-scroll theme flip read as a
// glitch. A constant surface also keeps the header markup independent of
// scroll position, which avoids a server/client hydration mismatch.

function ActiveArc() {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 8" preserveAspectRatio="none" className="absolute bottom-2 left-0 h-2 w-full text-n-orange">
      <path d="M2 2 Q30 10 58 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const browserPathname = typeof window !== "undefined" ? window.location.pathname : "";
  const currentPathname = (pathname || browserPathname || "/").replace(/\/$/, "") || "/";

  useEffect(() => {
    setOpen(false);
  }, [currentPathname]);

  // Browsers without scroll-driven animations get the header progress bar
  // from a passive scroll listener instead.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar || CSS.supports("animation-timeline: scroll()")) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.setProperty("--scroll-progress", String(max > 0 ? window.scrollY / max : 0));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = mobileMenuRef.current;
    const mobileButton = mobileButtonRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    background.forEach((element) => { element.inert = true; });
    const timer = window.setTimeout(() => menu?.querySelector<HTMLElement>("a[href]")?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const menuItems = Array.from(menu.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'));
      const focusable = mobileButton ? [mobileButton, ...menuItems] : menuItems;
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      background.forEach((element) => { element.inert = false; });
      mobileButton?.focus();
    };
  }, [open]);

  const isActive = (href: string) => currentPathname === href;

  return (
    <>
      <header
        className="fixed left-0 right-0 z-[70] isolate border-b border-white/10 bg-n-night/[0.86] text-white backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
        style={{ top: "var(--banner-h, 0px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex min-h-11 shrink-0 items-center gap-1.5 md:gap-2 group" aria-label="Novus NYC home">
            <Image
              src="/logo.png"
              alt=""
              width={223}
              height={200}
              className="h-9 w-auto object-contain transition-transform duration-2 ease-out group-hover:-translate-y-0.5"
            />
            <Wordmark className="text-xl text-n-orange" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative flex h-16 items-center font-body text-[0.9375rem] font-semibold transition-colors duration-1 ${
                  isActive(l.href) ? "text-n-orange" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                {isActive(l.href) ? <ActiveArc /> : null}
              </Link>
            ))}

            <Link
              href={memberLink.href}
              className={`hidden xl:flex h-16 items-center gap-1.5 font-body text-sm font-medium transition-colors duration-1 ${
                currentPathname.startsWith("/members") ? "text-n-orange" : "text-white/60 hover:text-white"
              }`}
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              {memberLink.label}
            </Link>

            <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 xl:block" />

            <div className="flex items-center gap-2">
              <Link href="/businesses#contact" className="btn btn-sm btn-business hidden xl:inline-flex">
                Get business support
              </Link>
              <Link href="/apply" className="btn btn-sm btn-student">
                Apply Now
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link href="/apply" className="btn btn-sm btn-student !min-h-10 !px-3.5">
              Apply
            </Link>
            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              {/*
                Three absolutely-positioned 2px divs used to render as a
                solid white blob on mobile Chrome/Safari, both under the
                header's backdrop blur — a hairline-flattening artifact,
                not a layout bug. An SVG with real strokes doesn't hit it.
              */}
              <svg aria-hidden="true" viewBox="0 0 28 20" className="h-5 w-7 overflow-visible">
                <line x1="0" y1={open ? "10" : "1"} x2="28" y2={open ? "10" : "1"} stroke="white" strokeWidth="2" strokeLinecap="round" className="transition-[y1,y2,opacity,transform] duration-200 ease-out" style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "14px 10px" }} />
                <line x1="0" y1="10" x2="28" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" className={`transition-[opacity,transform] duration-150 ease-out ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} style={{ transformOrigin: "14px 10px" }} />
                <line x1="0" y1={open ? "10" : "19"} x2="28" y2={open ? "10" : "19"} stroke="white" strokeWidth="2" strokeLinecap="round" className="transition-[y1,y2,opacity,transform] duration-200 ease-out" style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "14px 10px" }} />
              </svg>
            </button>
          </div>
        </div>
        <span ref={progressRef} aria-hidden="true" className="scroll-progress" />
      </header>

      {/* Mobile menu: a full-height sheet grouped by audience */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-x-0 bottom-0 z-[65] flex flex-col overflow-y-auto bg-n-night px-5 pb-6 pt-4 lg:hidden"
            style={{ top: "calc(var(--banner-h, 0px) + 4rem)" }}
          >
            <nav aria-label="Main" className="flex flex-1 flex-col gap-6">
              {mobileGroups.map((group) => (
                <div key={group.title}>
                  <p className={`mb-1 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] ${group.tone}`}>{group.title}</p>
                  <ul className="border-t border-white/10">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={isActive(l.href) ? "page" : undefined}
                          className={`flex min-h-14 items-center justify-between border-b border-white/10 font-display text-xl font-bold ${
                            isActive(l.href) ? "text-n-orange" : "text-white/90"
                          }`}
                        >
                          {l.label}
                          <span aria-hidden="true" className="text-white/35">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-8 grid gap-3">
              <Link href="/businesses#contact" className="btn btn-lg btn-business w-full">
                Get business support
              </Link>
              <Link href="/apply" className="btn btn-lg btn-student w-full">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
