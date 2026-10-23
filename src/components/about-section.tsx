"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const paragraphs = [
  "Briech UAS is a Nigerian manufacturer of unmanned aircraft, registered in 2021. We are developing a drone manufacturing facility in Kuje, Abuja, to bring research, production and aircraft support together.",
  "We work with customers to understand their needs and adapt our aircraft to their operational requirements.",
];

const characterCount = paragraphs.join("").length;
const stats = [
  { value: "5", label: "Aircraft models" },
  { value: "Nigeria", label: "Our base" },
  { value: "Support", label: "For our customers" },
];

export function AboutSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (!("IntersectionObserver" in window)) return;

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "visible";
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let characterIndex = 0;

  return (
    <section
      ref={section}
      id="about-us"
      className="hero-tail about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-registration" aria-hidden="true">
        <span className="registration-mark" />
        <span className="registration-mark" />
      </div>
      <div className="about-layout">
        <h2 id="about-heading">About Us</h2>
        <div className="about-copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <span className="sr-only">{paragraph}</span>
              <span aria-hidden="true">
                {Array.from(paragraph).map((character, index) => {
                  const progress = characterIndex++ / (characterCount - 1);
                  const delay = Math.pow(progress, 0.8) * 900;
                  return (
                    <span
                      key={index}
                      className="about-character"
                      style={
                        { "--character-delay": `${delay}ms` } as CSSProperties
                      }
                    >
                      {character}
                    </span>
                  );
                })}
              </span>
            </p>
          ))}
          <dl className="about-stats" aria-label="Briech UAS at a glance">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
