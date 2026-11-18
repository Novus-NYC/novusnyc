import Image from "next/image";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import BridgeIllustration from "@/components/BridgeIllustration";
import { ArrowUpRightIcon, InstagramIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { EMAIL } from "@/lib/mail";
import { SOCIAL } from "@/lib/social";

const footerLinks = [
  { href: "/showcase", label: "Our Work" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/businesses", label: "For Businesses" },
  { href: "/join", label: "For Students" },
  { href: "/members/login", label: "Member Login" },
  { href: "/apply", label: "Apply Now" },
];

export default function Footer() {
  return (
    <footer className="site-footer blueprint blueprint--dark relative overflow-hidden bg-n-night pb-24 pt-0 text-white/75 md:pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_30%,rgba(243,226,141,0.10),transparent_40%),radial-gradient(circle_at_92%_30%,rgba(190,162,186,0.14),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* The closing span: businesses on one side, students on the other. */}
        <div className="relative pt-12 md:pt-14">
          <BridgeIllustration className="mx-auto w-full max-w-4xl text-n-orange/60 [--bridge-surface:rgb(var(--color-night))]" />
          <div className="relative mt-6 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Novus NYC home">
              <Image src="/logo.png" alt="" width={223} height={200} className="h-12 w-auto object-contain sm:h-14" />
              <Wordmark className="text-3xl text-n-orange sm:text-4xl" />
            </Link>
          </div>
          <p className="mx-auto mt-4 max-w-md text-center font-body text-base leading-relaxed text-white/70">
            A New York nonprofit connecting student teams with NYC small businesses.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-n-orange">Get involved</p>
          <p className="mx-auto mt-3 max-w-xl font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
            Support for businesses. Real client work for students.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          <Link href="/businesses" className="btn btn-lg btn-business w-full">
            Get business support
            <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
          </Link>
          <Link href="/join" className="btn btn-lg btn-student w-full">
            Join as a student
            <span aria-hidden="true" className="btn-arrow">→</span>
          </Link>
        </div>

        <nav aria-label="Footer" className="mt-14 border-y border-white/10 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-body text-[0.9375rem] text-white/75 transition-colors duration-1 hover:text-n-orange">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col items-center gap-5 pt-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-[0.8125rem] text-white/60">© 2026 Novus Inc.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL.info}`}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.8125rem] text-n-orange transition-colors hover:text-white"
            >
              <MailIcon className="h-4 w-4" />
              {EMAIL.info}
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Novus NYC on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-n-purple/45 text-n-purple transition-colors hover:border-n-purple hover:bg-n-purple/10"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Novus NYC on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-n-yellow/45 text-n-yellow transition-colors hover:border-n-yellow hover:bg-n-yellow/10"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <Link href="/privacy" className="inline-flex min-h-11 items-center font-mono text-[0.8125rem] text-white/75 transition-colors hover:text-n-orange">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
