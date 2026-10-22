"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNavigation, secondaryNavigation } from "@/lib/navigation";

function PanelArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  return <NavigationHeader key={pathname} pathname={pathname} />;
}

function NavigationHeader({ pathname }: { pathname: string }) {
  const solid = pathname !== "/";
  const [hash, setHash] = useState("");
  const isCurrent = (href: string) => {
    if (href.startsWith("mailto:")) return false;
    const destination = new URL(href, "https://www.briechuas.com");
    if (destination.hash) {
      if (destination.hash === "#fleet" && pathname.startsWith("/fleet/")) return true;
      return pathname === destination.pathname && hash === destination.hash;
    }
    return pathname === destination.pathname || pathname.startsWith(`${destination.pathname}/`);
  };
  const fleetActive = isCurrent("/#fleet");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    const frame = requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  function openSection(id: string) {
    cancelClose();
    setActiveSection(id);
  }

  const closeNavigation = useCallback(() => {
    cancelClose();
    setActiveSection(null);
    setMobileSection(null);
    setMenuOpen(false);
  }, [cancelClose]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelClose();
        if (activeSection) {
          setActiveSection(null);
          document.getElementById(`nav-trigger-${activeSection}`)?.focus();
        } else if (mobileSection) {
          setMobileSection(null);
          document.getElementById(`mobile-trigger-${mobileSection}`)?.focus();
        } else if (menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) closeNavigation();
    };
    const desktop = window.matchMedia("(min-width: 56.25rem)");
    const onResize = () => {
      closeNavigation();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen, activeSection, mobileSection, closeNavigation, cancelClose]);

  return (
    <header
      ref={header}
      onClickCapture={(event) => {
        const link = (event.target as Element).closest("a");
        if (link && link.origin === window.location.origin && link.pathname === pathname) {
          setHash(link.hash);
        }
      }}
      className={`site-header${solid || scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
      onPointerEnter={cancelClose}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        if (header.current?.querySelector(":focus-visible")) return;
        cancelClose();
        closeTimer.current = setTimeout(() => {
          setActiveSection(null);
          closeTimer.current = null;
        }, 160);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          cancelClose();
          setActiveSection(null);
        }
      }}
    >
      <nav className="navigation" aria-label="Main navigation">
        <Link
          className="brand"
          href="/"
          aria-label="Briech UAS home"
          onPointerEnter={() => setActiveSection(null)}
          onClick={closeNavigation}
        >
          <Image
            className="brand-logo brand-logo-light"
            src="/assets/briech-logo-light.png"
            alt=""
            width={497}
            height={131}
            preload
            unoptimized
          />
          <Image
            className="brand-logo brand-logo-dark"
            src="/assets/briech-logo-dark.png"
            alt=""
            width={497}
            height={131}
            unoptimized
          />
        </Link>
        <ul className="nav-links nav-primary">
          {primaryNavigation.map((section) => (
            <li key={section.id}>
              {section.items ? (
                <button
                  id={`nav-trigger-${section.id}`}
                  className={`nav-link nav-disclosure${section.id === "fleet" && fleetActive ? " is-active" : ""}`}
                  aria-current={section.id === "fleet" && fleetActive ? "location" : undefined}
                  type="button"
                  aria-expanded={activeSection === section.id}
                  aria-controls={`nav-panel-${section.id}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") openSection(section.id);
                  }}
                  onClick={() => {
                    cancelClose();
                    setActiveSection((active) =>
                      active === section.id ? null : section.id,
                    );
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp")
                      return;
                    event.preventDefault();
                    openSection(section.id);
                    requestAnimationFrame(() => {
                      const links =
                        document.querySelectorAll<HTMLAnchorElement>(
                          `#nav-panel-${section.id} a`,
                        );
                      const target =
                        event.key === "ArrowUp"
                          ? links[links.length - 1]
                          : links[0];
                      target?.focus();
                    });
                  }}
                >
                  {section.label}
                </button>
              ) : (
                <Link
                  className={`nav-link${isCurrent(section.href) ? " is-active" : ""}`}
                  aria-current={isCurrent(section.href) ? "location" : undefined}
                  href={section.href}
                  onPointerEnter={() => setActiveSection(null)}
                  onFocus={() => setActiveSection(null)}
                >
                  {section.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className="nav-links nav-secondary">
          {secondaryNavigation.map((link) => (
            <li key={link.label}>
              <Link
                className={
                  `${link.label === "Contact us" ? "contact-link" : "nav-link"}${isCurrent(link.href) ? " is-active" : ""}`
                }
                aria-current={isCurrent(link.href) ? "page" : undefined}
                href={link.href}
                onPointerEnter={() => setActiveSection(null)}
                onFocus={() => setActiveSection(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => {
            setActiveSection(null);
            setMobileSection(null);
            setMenuOpen((open) => !open);
          }}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>
      {primaryNavigation
        .filter((section) => section.items)
        .map((section) => (
          <section
            key={section.id}
            id={`nav-panel-${section.id}`}
            className="mega-panel"
            data-section={section.id}
            aria-labelledby={`nav-trigger-${section.id}`}
            hidden={activeSection !== section.id}
          >
            <div className="mega-surface">
              <div className="mega-grid">
                {section.items?.map((item) => (
                  <Link
                    className="mega-card"
                    key={item.title}
                    href={item.href}
                    onClick={closeNavigation}
                  >
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <span className="mega-arrow">
                      <PanelArrow />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mega-footer">
                <Link href={section.href} onClick={closeNavigation}>
                  {section.overviewLabel}
                  <PanelArrow />
                </Link>
              </div>
            </div>
          </section>
        ))}
      <nav
        className="mobile-navigation"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {primaryNavigation.map((section) =>
          section.items ? (
            <div className="mobile-nav-group" key={section.id}>
              <button
                id={`mobile-trigger-${section.id}`}
                className={`mobile-nav-trigger${section.id === "fleet" && fleetActive ? " is-active" : ""}`}
                aria-current={section.id === "fleet" && fleetActive ? "location" : undefined}
                type="button"
                aria-expanded={mobileSection === section.id}
                aria-controls={`mobile-subnav-${section.id}`}
                onClick={() =>
                  setMobileSection((active) =>
                    active === section.id ? null : section.id,
                  )
                }
              >
                {section.label}
                <svg
                  className="mobile-disclosure-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m3 6 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
              <div
                className="mobile-subnav"
                id={`mobile-subnav-${section.id}`}
                hidden={mobileSection !== section.id}
              >
                {section.items.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    onClick={closeNavigation}
                  >
                    <span className="mobile-subnav-copy">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </span>
                    <PanelArrow />
                  </Link>
                ))}
                <Link
                  className="mobile-subnav-overview"
                  href={section.href}
                  onClick={closeNavigation}
                >
                  {section.overviewLabel}
                  <PanelArrow />
                </Link>
              </div>
            </div>
          ) : (
            <Link
              key={section.id}
              className={`mobile-nav-link${isCurrent(section.href) ? " is-active" : ""}`}
              aria-current={isCurrent(section.href) ? "location" : undefined}
              href={section.href}
              onClick={closeNavigation}
            >
              {section.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ),
        )}
        {secondaryNavigation.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`mobile-nav-link${link.label === "Contact us" ? " mobile-nav-contact" : ""}${isCurrent(link.href) ? " is-active" : ""}`}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            onClick={closeNavigation}
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
