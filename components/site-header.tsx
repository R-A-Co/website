"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import type { Site } from "@/lib/content-types";
import { navLinks } from "@/lib/nav";
import { buttonSecondary, cn } from "@/lib/utils";
import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}

export function SiteHeader({ site }: { site: Site }) {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !overlay) return;

      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative z-10 hidden lg:block">
        <div className="sticky top-0 flex h-screen max-h-screen flex-col overflow-y-auto py-8 pr-6">
          <Logo name={site.name} />

          <nav aria-label="Primary" className="mt-16">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex min-h-7 items-center gap-2 py-1"
                    >
                      <span
                        aria-hidden="true"
                        className="relative flex h-3 w-3 shrink-0 items-center"
                      >
                        <span
                          className={cn(
                            "h-px bg-accent transition-[width] duration-300 ease-out",
                            isActive ? "w-3" : "w-0 group-hover:w-3",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "font-sans text-[15px] leading-[1.3] transition-colors duration-300 ease-out",
                          isActive
                            ? "text-accent"
                            : "text-ink group-hover:text-accent",
                        )}
                      >
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <a href="/#contact" className={buttonSecondary}>
              Contact
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>

            <div className="mt-6 flex flex-col gap-2 font-mono text-[10px] leading-[1.5] text-secondary">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 transition-colors hover:text-accent"
              >
                <GithubIcon className="size-3" />
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-2.5" />
              </a>
              <p>{site.location}</p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </header>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-colors duration-300 lg:hidden",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] min-w-0 items-center justify-between gap-4 px-4 sm:px-5 md:px-8">
          <Logo name={site.name} />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center font-sans text-[15px] leading-[1.3] text-ink transition-colors hover:text-accent"
          >
            Menu
            <span className="sr-only"> — open navigation</span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="menu-enter fixed inset-0 z-[60] flex flex-col bg-background text-ink lg:hidden"
        >
          <div className="mx-auto flex h-16 w-full max-w-[1440px] shrink-0 items-center justify-between gap-4 border-b border-border px-4 sm:px-5 md:px-8">
            <Logo name={site.name} onClick={() => setOpen(false)} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center gap-1.5 font-sans text-[15px] leading-[1.3] text-ink transition-colors hover:text-accent"
            >
              Close
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="mx-auto w-full max-w-[1440px] flex-1 overflow-y-auto px-4 py-6 sm:px-5 sm:py-8 md:px-8"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex items-center gap-3 border-b border-border py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="relative flex h-5 w-5 shrink-0 items-center"
                      >
                        <span
                          className={cn(
                            "h-px bg-accent transition-[width] duration-300 ease-out",
                            isActive ? "w-5" : "w-0 group-hover:w-5",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "font-sans text-[24px] leading-[1.2] tracking-[-0.02em] transition-colors duration-300 ease-out",
                          isActive
                            ? "text-accent"
                            : "text-ink group-hover:text-accent",
                        )}
                      >
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mx-auto w-full max-w-[1440px] shrink-0 border-t border-border px-4 py-6 sm:px-5 md:px-8">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-[15px] leading-[1.3] text-ink"
            >
              {site.email}
              <ArrowUpRight aria-hidden="true" className="size-3.5 text-accent" />
            </a>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
              {site.location}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
