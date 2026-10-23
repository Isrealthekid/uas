import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { approach, teamMembers } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us | Briech UAS",
  description:
    "Meet Briech UAS, a Nigerian unmanned aircraft manufacturer established in 2021 and developing its manufacturing campus in Kuje, Abuja.",
};

export default function AboutPage() {
  return (
    <main className="company-page">
      <header className="company-intro">
        <p className="projects-eyebrow">About us</p>
        <div className="projects-intro-grid">
          <h1>
            Built in Nigeria.
            <br />
            Looking beyond.
          </h1>
          <div className="projects-intro-copy">
            <p>
              People, engineering and ambition. Shaping the next generation of
              unmanned flight.
            </p>
            <a className="drone-learn-more" href="#our-team">
              Meet our team <ArrowIcon direction="right" />
            </a>
          </div>
        </div>
      </header>

      <div className="company-hero-image">
        <Image
          src="/assets/about/facility.jpg"
          alt="Briech UAS team members together in their workshop"
          fill
          sizes="95vw"
          preload
        />
      </div>

      <section
        className="company-story"
        aria-labelledby="company-story-heading"
      >
        <h2 id="company-story-heading" className="company-section-label">
          Our story
        </h2>
        <div>
          <p className="company-statement">
            Founded in 2021, Briech UAS is a Nigerian manufacturer developing
            unmanned aircraft for Africa and beyond.
          </p>
          <p className="company-body">
            From Kuje, Abuja, we bring together engineering, manufacturing and
            flight operations. Our work begins with the customer: understanding
            the challenge, then shaping a system around the mission.
          </p>
          <dl className="company-facts">
            <div>
              <dt>Established</dt>
              <dd>2021</dd>
            </div>
            <div>
              <dt>Our home</dt>
              <dd>Abuja</dd>
            </div>
            <div>
              <dt>Our focus</dt>
              <dd>UAS</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="company-approach"
        aria-labelledby="company-approach-heading"
      >
        <div className="company-approach-image">
          <Image
            src="/assets/about/engineering.jpg"
            alt="Briech technicians working together on a manufacturing component"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
          />
        </div>
        <div className="company-approach-copy">
          <p className="projects-eyebrow">Our approach</p>
          <h2 id="company-approach-heading">
            Good engineering
            <br />
            starts with listening.
          </h2>
          <div className="company-principles">
            {approach.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="company-facility"
        aria-labelledby="company-facility-heading"
      >
        <div className="company-facility-copy">
          <p className="projects-eyebrow">Kuje, Abuja</p>
          <h2 id="company-facility-heading">
            Room to build
            <br />
            what comes next.
          </h2>
          <p>
            Our manufacturing campus is being developed to bring research,
            production and aircraft support together in one location.
          </p>
          <dl className="company-facility-facts">
            <div>
              <dt>Models</dt>
              <dd>5+</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>100%</dd>
            </div>
            <div>
              <dt>Support</dt>
              <dd>24/7</dd>
            </div>
          </dl>
        </div>
        <div className="company-facility-image">
          <Image
            src="/assets/about/manufacturing.jpg"
            alt="Briech unmanned aircraft on a marked landing pad"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
          />
        </div>
      </section>

      <section
        id="our-team"
        className="company-team"
        aria-labelledby="company-team-heading"
      >
        <div className="company-section-heading">
          <div>
            <p className="projects-eyebrow">Our people</p>
            <h2 id="company-team-heading">The team behind the flight.</h2>
          </div>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.role}>
              <div className="team-portrait">
                {member.portrait ? (
                  <Image
                    src={member.portrait}
                    alt={member.name ?? member.role}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw"
                  />
                ) : (
                  <div className="team-portrait-placeholder" aria-hidden="true">
                    <svg viewBox="0 0 120 140" fill="none">
                      <circle cx="60" cy="44" r="23" />
                      <path d="M14 134v-15c0-25 20-44 46-44s46 19 46 44v15" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="team-card-copy">
                <h3>{member.name ?? member.role}</h3>
                {member.name && <p>{member.role}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="company-commitment"
        aria-labelledby="company-commitment-heading"
      >
        <div>
          <p className="projects-eyebrow">Our commitment</p>
          <h2 id="company-commitment-heading">Built for the long term.</h2>
        </div>
        <div>
          <p>
            Reliable aircraft, responsible operations and continued investment
            in automation guide our work. We support customers throughout the
            life of their systems.
          </p>
          <Link className="drone-learn-more" href="/projects">
            See our projects <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
