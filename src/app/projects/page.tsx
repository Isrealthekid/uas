import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "@/components/arrow-icon";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Briech UAS",
  description:
    "Explore Briech UAS projects supporting infrastructure protection, surveillance and security across Nigeria.",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <header className="projects-intro">
        <p className="projects-eyebrow">Our projects</p>
        <div className="projects-intro-grid">
          <h1>
            Purpose in flight.
            <br />
            Impact on the ground.
          </h1>
          <div className="projects-intro-copy">
            <p>
              Aerial intelligence for the infrastructure and communities that
              keep Nigeria moving.
            </p>
            <a className="drone-learn-more" href="#project-list">
              Explore projects <ArrowIcon direction="right" />
            </a>
          </div>
        </div>
        <div className="projects-context">
          <span>04 featured projects</span>
          <span>Designed in Nigeria. Deployed with purpose.</span>
        </div>
      </header>

      <section
        id="project-list"
        className="projects-list"
        aria-label="Featured projects"
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className="project-card"
            aria-labelledby={`${project.slug}-title`}
          >
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 899px) 100vw, 55vw"
                preload={index === 0}
              />
            </div>
            <div className="project-panel">
              <div className="project-panel-top">
                <span>{project.sector}</span>
              </div>
              <h2 id={`${project.slug}-title`}>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <dl className="project-facts">
                <div>
                  <dt>Partner</dt>
                  <dd>{project.partner}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{project.location}</dd>
                </div>
              </dl>
              <div className="project-focus">
                <h3>Project focus</h3>
                <ul>
                  {project.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a
                className="drone-learn-more"
                href={`mailto:info@briechuas.com?subject=${encodeURIComponent(`Enquiry: ${project.name}`)}`}
                aria-label={`Enquire about ${project.name}`}
              >
                Discuss a project <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
