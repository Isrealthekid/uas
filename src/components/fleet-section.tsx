import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import { drones } from "@/lib/drones";
import { DroneIcon } from "@/components/drone-icon";
import { DroneMedia } from "@/components/drone-media";
import { DroneSpecs } from "@/components/drone-specs";

export function FleetSection() {
  return (
    <section
      id="fleet"
      className="fleet-section"
      aria-labelledby="fleet-heading"
    >
      <div className="fleet-heading">
        <h2 id="fleet-heading">Our fleet</h2>
        <span>Engineered for the mission.</span>
      </div>
      <div className="fleet-list">
        {drones.map((drone, index) => (
          <article
            className="drone-showcase"
            key={drone.slug}
            aria-labelledby={`drone-${drone.slug}`}
          >
            <div className="drone-display">
              <header className="drone-display-heading">
                <span className="drone-model-number">BR / 0{index + 1}</span>
                <h3 id={`drone-${drone.slug}`}>{drone.name}</h3>
                <ul
                  className="drone-missions"
                  aria-label={`${drone.name} capabilities`}
                >
                  {drone.missions.map((mission) => (
                    <li key={mission}>{mission}</li>
                  ))}
                </ul>
              </header>
              <DroneMedia drone={drone} />
            </div>
            <div className="drone-details-panel">
              <div className="drone-panel-heading">
                <span>Drone profile</span>
                <DroneIcon variant={drone.icon} />
              </div>
              <p className="drone-panel-category">{drone.category}</p>
              <p className="drone-description">{drone.description}</p>
              <DroneSpecs
                specs={drone.specs}
                label={`${drone.name} quick specifications`}
              />
              <Link
                className="drone-learn-more"
                href={`/fleet/${drone.slug}`}
                aria-label={`Learn more about ${drone.name}`}
              >
                Learn More <ArrowIcon />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
