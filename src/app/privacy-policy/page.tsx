import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Briech UAS",
  description: "How Briech UAS handles information from website visitors and enquiries, and how to contact us about your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="information-page privacy-page">
      <header className="information-intro">
        <p className="projects-eyebrow">Privacy</p>
        <h1>Privacy policy.</h1>
        <p>Last updated: <time dateTime="2026-10-24">24 October 2026</time></p>
      </header>
      <div className="privacy-content">
        <section aria-labelledby="privacy-scope">
          <h2 id="privacy-scope">1. Who we are</h2>
          <p>This policy explains how Briech UAS, based in Kuje, Abuja, Nigeria, handles personal information connected with this website and enquiries made through its contact links. Briech UAS is responsible for deciding how that information is used.</p>
          <p>For privacy questions or requests, email <a href="mailto:info@briechuas.com?subject=Privacy%20enquiry">info@briechuas.com</a> or call <a href="tel:+2348032027605">+234 803 2027 605</a>.</p>
        </section>
        <section aria-labelledby="privacy-information">
          <h2 id="privacy-information">2. Information involved</h2>
          <p>When you email or call us, you may provide your name, email address, phone number, organisation and the contents of your enquiry. Career enquiries may also include information you choose to send about your experience. Please share only information relevant to your request.</p>
          <p>Website and media delivery services may process technical information such as your IP address, browser type, requested page or file, and request time to deliver content and maintain security. Contact links open your email or phone application; this website currently has no account registration, online enquiry form or newsletter signup.</p>
        </section>
        <section aria-labelledby="privacy-purposes">
          <h2 id="privacy-purposes">3. Why information is used</h2>
          <p>Information from enquiries is used to respond, provide requested information and manage related correspondence. Technical information supports website delivery, troubleshooting and protection against misuse.</p>
          <p>Depending on the activity, the relevant basis for processing may be taking steps at your request before entering a contract, performing a contract, meeting a legal obligation, or legitimate interests in responding to enquiries and maintaining a secure website, balanced against your rights. Where an activity requires consent, it should be requested separately; visiting this page is not consent to unrelated marketing.</p>
        </section>
        <section aria-labelledby="privacy-media">
          <h2 id="privacy-media">4. Cookies, videos and external links</h2>
          <p>The current website does not include advertising pixels or audience analytics scripts. Website infrastructure may use technical storage or cookies for delivery and security; your browser settings let you manage cookies.</p>
          <p>Some videos load automatically from bucket.eibstratoc.com when a gallery or video section becomes visible. Your browser connects to that media service and shares technical request information, including your IP address. Other images, video fallback files and 3D models are served with the website.</p>
          <p>Social links take you to external websites. Those services and your email or phone provider handle information under their own privacy policies.</p>
        </section>
        <section aria-labelledby="privacy-sharing">
          <h2 id="privacy-sharing">5. Service providers and international processing</h2>
          <p>Hosting, content delivery and communications providers may process information needed to supply their services. Information may also need to be disclosed where required by law. Providers may operate outside Nigeria; applicable data-protection requirements and appropriate safeguards must be considered for any international transfer. Contact us for information about the providers relevant to your enquiry.</p>
        </section>
        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">6. Retention and security</h2>
          <p>Retention depends on the purpose of the information, the status of your enquiry or customer relationship, and any applicable recordkeeping or dispute requirements. Information should be retained only for as long as necessary for those purposes. You can ask us about the retention period applicable to your information.</p>
          <p>No website or email service can guarantee absolute security. Please avoid sending passwords, identity documents or sensitive operational information through a general enquiry unless an appropriate channel has been agreed.</p>
        </section>
        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights">7. Your choices and rights</h2>
          <p>Subject to applicable law, you may request access to your personal information, correction, deletion, restriction of processing or a portable copy. You may also object to certain processing and withdraw consent where processing relies on it, without affecting processing already carried out lawfully.</p>
          <p>Send requests to <a href="mailto:info@briechuas.com?subject=Privacy%20request">info@briechuas.com</a>. We may need information to verify your identity and locate the relevant records. You may also raise a concern with the <a href="https://ndpc.gov.ng/" target="_blank" rel="noreferrer">Nigeria Data Protection Commission</a>.</p>
        </section>
        <section aria-labelledby="privacy-updates">
          <h2 id="privacy-updates">8. Changes to this policy</h2>
          <p>This policy may be updated when website features or information-handling practices change. The date above identifies the latest version. Any new feature that collects personal information should explain its purpose and choices at the point of collection.</p>
        </section>
      </div>
    </main>
  );
}
