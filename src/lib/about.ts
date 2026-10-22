// Company information: https://www.briechuas.com/about.
export const approach = [
  {
    title: "Start with the customer",
    description: "Understand each mission before designing the solution.",
  },
  {
    title: "Build with purpose",
    description:
      "Combine proven systems with advances in autonomy and sensing.",
  },
  {
    title: "Work together",
    description: "Collaborate with technology partners to expand capability.",
  },
  {
    title: "Engineer for reliability",
    description:
      "Prioritise dependable performance from development to deployment.",
  },
];

export type TeamMember = {
  role: string;
  name: string | null;
  portrait: string | null;
};

// Placeholder names approved for the draft. Replace these and the portrait
// paths with the real team details before publishing.
export const teamMembers: TeamMember[] = [
  { role: "Chairman", name: "[Chairman name]", portrait: null },
  { role: "Chief Technology Officer", name: "[CTO name]", portrait: null },
  { role: "Head of Operations", name: "[Operations lead name]", portrait: null },
];
