import type { Metadata } from "next";
import { ArrowIcon } from "@/components/arrow-icon";

export const metadata: Metadata = {
  title: "Contact Briech UAS | Enquiries and Support",
  description: "Contact Briech UAS in Kuje, Abuja, for company enquiries, aircraft information and customer support.",
};

export default function ContactPage() {
  return (
    <main className="information-page">
      <header className="information-intro">
        <p className="projects-eyebrow">Contact us</p>
        <h1>Start a conversation.</h1>
        <p>Get in touch with our team for company enquiries, aircraft information and customer support.</p>
      </header>
      <section className="contact-grid" aria-label="Contact details">
        <article className="information-card">
          <h2>Email our team</h2>
          <p>Tell us what you need and include your preferred contact details.</p>
          <a className="contact-detail" href="mailto:info@briechuas.com">info@briechuas.com <ArrowIcon /></a>
        </article>
        <article className="information-card">
          <h2>Call us</h2>
          <p>Speak with our team about your enquiry.</p>
          <a className="contact-detail" href="tel:+2348032027605">+234 803 2027 605 <ArrowIcon /></a>
        </article>
        <article className="information-card">
          <h2>Our location</h2>
          <address>Kuje, Abuja<br />Nigeria</address>
          <p>Contact us to arrange a visit and confirm directions.</p>
        </article>
      </section>
      <div className="information-note">
        <p>For an existing customer enquiry, include the aircraft model or project reference so we can direct your message to the right team.</p>
        <a className="drone-learn-more" href="mailto:info@briechuas.com?subject=Customer%20support%20enquiry">Contact customer support <ArrowIcon /></a>
      </div>
    </main>
  );
}
