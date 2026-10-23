import { ArrowIcon } from "@/components/arrow-icon";
import Image from "next/image";
import Link from "next/link";
import { drones } from "@/lib/drones";
import { primaryNavigation, secondaryNavigation } from "@/lib/navigation";

export async function SiteFooter() {
  "use cache";
  return (
    <footer className="site-footer">
      <div className="footer-invitation">
        <h2>Let’s build your next mission.</h2>
        <div>
          <p>Discover what Briech UAS can do for you.</p>
          <a href="mailto:info@briechuas.com" className="footer-contact-button">
            Get in touch <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="footer-body">
        <div className="footer-contact">
          <h2 className="footer-label">Contact</h2>
          <address>
            <p>
              Kuje, Abuja
              <br />
              Nigeria
            </p>
            <a href="tel:+2348032027605">+234 803 2027 605</a>
            <a href="mailto:info@briechuas.com">info@briechuas.com</a>
          </address>
          <span className="footer-country">
            <span className="nigeria-flag" aria-hidden="true" />
            Made in Nigeria. Built for the world.
          </span>
          <Link href="/" className="footer-logo" aria-label="Briech UAS home">
            <Image
              src="/assets/briech-logo-dark.png"
              alt="Briech UAS"
              width={500}
              height={160}
              unoptimized
            />
          </Link>
        </div>
        <div className="footer-directory">
          <div className="footer-link-columns">
            <nav aria-label="Footer fleet">
              <h2 className="footer-label">Our fleet</h2>
              <ul>
                {drones.map((drone) => (
                  <li key={drone.slug}>
                    <Link href={`/fleet/${drone.slug}`}>{drone.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer company">
              <h2 className="footer-label">About Briech</h2>
              <ul>
                {[
                  ...primaryNavigation.filter((item) => item.id !== "fleet"),
                  ...secondaryNavigation,
                  { label: "Privacy policy", href: "/privacy-policy" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="footer-bottom">
            <nav className="footer-socials" aria-label="Social media">
              <a
                href="https://www.instagram.com/briechuas_/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram <ArrowIcon />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61574236304867"
                target="_blank"
                rel="noreferrer"
              >
                Facebook <ArrowIcon />
              </a>
              <a
                href="https://x.com/BriechUAS"
                target="_blank"
                rel="noreferrer"
              >
                X <ArrowIcon />
              </a>
            </nav>
            <p>© {new Date().getFullYear()} Briech UAS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
