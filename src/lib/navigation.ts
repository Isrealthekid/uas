export type NavigationCard = {
  title: string;
  description: string;
  href: string;
};

export type NavigationSection = {
  id: string;
  label: string;
  href: string;
  overviewLabel?: string;
  items?: NavigationCard[];
};

// Current website destinations; replace as the new internal pages are built.
export const primaryNavigation: NavigationSection[] = [
  {
    id: "fleet",
    label: "Fleet",
    href: "/#fleet",
    overviewLabel: "Explore the full fleet",
    items: [
      {
        title: "Damisa",
        description: "A purpose-built combat unmanned aerial system.",
        href: "/fleet/damisa",
      },
      {
        title: "Argini",
        description: "Hybrid VTOL for aerial reconnaissance and surveillance.",
        href: "/fleet/argini",
      },
      {
        title: "Arsenio",
        description: "Long-endurance intelligence and surveillance.",
        href: "/fleet/arsenio",
      },
      {
        title: "Xander",
        description: "An aerial platform for extended reconnaissance missions.",
        href: "/fleet/xander",
      },
      {
        title: "Bfly",
        description: "Compact reconnaissance designed for rapid deployment.",
        href: "/fleet/bfly",
      },
    ],
  },
  {
    id: "news",
    label: "News",
    href: "https://www.briechuas.com/press",
  },
  {
    id: "about",
    label: "About us",
    href: "/#about-us",
  },
  {
    id: "projects",
    label: "Projects",
    href: "https://www.briechuas.com/portfolio",
  },
];

export const secondaryNavigation = [
  {
    label: "Careers",
    href: "mailto:info@briechuas.com?subject=Careers%20at%20Briech%20UAS",
  },
  { label: "Contact us", href: "https://www.briechuas.com/contact" },
];
