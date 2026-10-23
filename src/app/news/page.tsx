import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";

export const metadata: Metadata = {
  title: "News and Updates | Briech UAS",
  description: "Company announcements, project updates and news from Briech UAS in Nigeria.",
};

// Add the news API integration here once its endpoint and response format are available.
export default function NewsPage() {
  return (
    <main className="information-page">
      <header className="information-intro">
        <p className="projects-eyebrow">News</p>
        <h1>News and updates.</h1>
        <p>Company announcements, project updates and stories from the Briech UAS team.</p>
      </header>
      <section className="news-empty" aria-labelledby="news-empty-heading">
        <span className="news-mark" aria-hidden="true">+</span>
        <div>
          <h2 id="news-empty-heading">Our next update is on its way.</h2>
          <p>There are no news articles to share yet. Explore our projects or contact our team for company information.</p>
          <div className="information-actions">
            <Link className="drone-learn-more" href="/projects">Explore projects <ArrowIcon /></Link>
            <Link className="information-text-link" href="/contact">Contact us <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
