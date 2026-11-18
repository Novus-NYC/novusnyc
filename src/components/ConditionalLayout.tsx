"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMembersPage = pathname?.startsWith("/members") && pathname !== "/members/login";
  const mainRef = useRef<HTMLElement>(null);
  const firstPathRef = useRef(pathname);

  // Restart the short entrance fade on client-side navigation. The first load
  // already carries the class from the server HTML.
  useEffect(() => {
    const main = mainRef.current;
    if (!main || isMembersPage || firstPathRef.current === pathname) return;
    firstPathRef.current = pathname;
    main.classList.remove("page-enter");
    void main.offsetWidth;
    main.classList.add("page-enter");
  }, [pathname, isMembersPage]);

  return (
    <>
      {!isMembersPage && <Navbar />}
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className={!isMembersPage ? "public-site page-enter bg-n-bg outline-none" : undefined}
      >
        {children}
      </main>
      {!isMembersPage && <Footer />}
      {!isMembersPage && <BackToTop />}
    </>
  );
}
