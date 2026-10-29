export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "email"
  | "date"
  | "select"
  | "boolean"
  | "tags"
  | "metrics";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
  placeholder?: string;
  full?: boolean;
};

export type CollectionDef = {
  slug: string;
  file: string;
  label: string;
  singular: string;
  description: string;
  /** Field used as the headline when listing entries. */
  titleKey: string;
  /** Secondary line under the headline. */
  subtitleKey?: string;
  singleton?: boolean;
  visibleInDashboard?: boolean;
  fields: FieldDef[];
};

export const collections: CollectionDef[] = [
  {
    slug: "home",
    file: "home.json",
    label: "Homepage",
    singular: "Homepage",
    description: "Hero copy, About text, and Activities shown on the homepage.",
    titleKey: "heroTitle",
    singleton: true,
    fields: [
      { key: "heroTitle", label: "Hero title", type: "text", full: true },
      { key: "heroIntro", label: "Hero introduction", type: "textarea", full: true },
      { key: "heroSecondary", label: "Hero secondary text", type: "textarea", full: true },
      { key: "aboutTitle", label: "About heading", type: "text", full: true },
      { key: "aboutIntro", label: "About introduction", type: "textarea", full: true },
      { key: "aboutSecondary", label: "About secondary text", type: "textarea", full: true },
      { key: "activitiesTitle", label: "Activities heading", type: "text", full: true },
      { key: "activitiesIntro", label: "Activities introduction", type: "textarea", full: true },
      { key: "activities", label: "Activity cards", type: "metrics", full: true, help: "Label is the activity title; Value is its description." },
    ],
  },
  {
    slug: "learning",
    file: "learning.json",
    label: "Learning roadmap",
    singular: "Roadmap step",
    description: "Stages and outcomes shown on the Learning page.",
    titleKey: "title",
    subtitleKey: "number",
    fields: [
      { key: "number", label: "Step number", type: "text", placeholder: "01" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "outcome", label: "Outcome", type: "textarea", full: true },
    ],
  },
  {
    slug: "resources",
    file: "resources.json",
    label: "Resources",
    singular: "Resource",
    description: "Learning links shown on the Resources page.",
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Title", type: "text", full: true },
      { key: "description", label: "Description", type: "textarea", full: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: ["Start here", "Python", "Data", "Research", "Collaboration"],
      },
      { key: "href", label: "URL", type: "url", full: true },
    ],
  },
  {
    slug: "projects",
    file: "projects.json",
    label: "Research projects",
    singular: "Project",
    description:
      "Research work shown on the research page and collected on Our work.",
    titleKey: "name",
    subtitleKey: "code",
    fields: [
      { key: "code", label: "Code", type: "text", placeholder: "PRJ-004" },
      { key: "name", label: "Name", type: "text", placeholder: "GridCast" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Completed"],
      },
      { key: "period", label: "Period", type: "text", placeholder: "2026 — present" },
      { key: "title", label: "Title", type: "text", full: true },
      { key: "abstract", label: "Abstract", type: "textarea", full: true },
      { key: "tags", label: "Tags", type: "tags", full: true, help: "Comma-separated" },
      { key: "metrics", label: "Metrics", type: "metrics", full: true },
      { key: "repo", label: "Repository URL", type: "url", full: true },
      {
        key: "featured",
        label: "Featured on home page",
        type: "boolean",
        help: "Only one project should be featured at a time.",
      },
    ],
  },
  {
    slug: "tools",
    visibleInDashboard: false,
    file: "tools.json",
    label: "Tools",
    singular: "Tool",
    description: "Open-source packages listed on the tools page.",
    titleKey: "name",
    subtitleKey: "version",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "tscast" },
      { key: "version", label: "Version", type: "text", placeholder: "v0.9.4" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "command", label: "Install command", type: "text", full: true },
      { key: "tags", label: "Tags", type: "tags", full: true, help: "Comma-separated" },
      { key: "href", label: "Repository URL", type: "url", full: true },
    ],
  },
  {
    slug: "datasets",
    visibleInDashboard: false,
    file: "datasets.json",
    label: "Datasets",
    singular: "Dataset",
    description: "Curated datasets listed on the tools page.",
    titleKey: "name",
    subtitleKey: "format",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "format", label: "Format", type: "text", placeholder: "CSV · Parquet" },
      { key: "size", label: "Size", type: "text", placeholder: "1.4 GB" },
      { key: "license", label: "License", type: "text", placeholder: "CC BY 4.0" },
      { key: "updated", label: "Updated", type: "text", placeholder: "Sep 2026" },
      {
        key: "access",
        label: "Access",
        type: "select",
        options: ["Open", "On request"],
      },
      { key: "href", label: "Access URL", type: "url", full: true },
    ],
  },
  {
    slug: "scripts",
    visibleInDashboard: false,
    file: "scripts.json",
    label: "Scripts",
    singular: "Script",
    description: "Analytical scripts linked from the tools page.",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "energy-eda" },
      { key: "href", label: "URL", type: "url", full: true },
    ],
  },
  {
    slug: "papers",
    file: "papers.json",
    label: "Papers",
    singular: "Paper",
    description: "Publications and notes collected on the Our work page.",
    titleKey: "title",
    subtitleKey: "venue",
    fields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Peer-reviewed", "Preprint", "Technical note"],
      },
      { key: "title", label: "Title", type: "text", full: true },
      { key: "authors", label: "Authors", type: "text", full: true },
      { key: "venue", label: "Venue", type: "text" },
      { key: "reference", label: "Reference", type: "text" },
      { key: "href", label: "Paper URL", type: "url", full: true },
    ],
  },
  {
    slug: "seminars",
    file: "seminars.json",
    label: "Seminars",
    singular: "Seminar",
    description: "Events, workshops, lectures, and learning sessions.",
    titleKey: "title",
    subtitleKey: "date",
    fields: [
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Upcoming", "Past"],
      },
      { key: "date", label: "Date", type: "date" },
      { key: "day", label: "Day", type: "text", placeholder: "Thu" },
      {
        key: "type",
        label: "Session type",
        type: "select",
        options: ["Workshop", "Guest lecture", "Collaborative session"],
      },
      { key: "time", label: "Time", type: "text", placeholder: "18:00 – 19:30" },
      { key: "title", label: "Title", type: "text", full: true },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "speaker", label: "Speaker", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "href", label: "RSVP / archive URL", type: "url", full: true },
    ],
  },
  {
    slug: "members",
    file: "members.json",
    label: "Committee",
    singular: "Member",
    description: "People shown on the People & contact page.",
    titleKey: "name",
    subtitleKey: "role",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "initials", label: "Initials", type: "text", placeholder: "AO" },
      { key: "role", label: "Role", type: "text", full: true },
      { key: "focus", label: "Focus", type: "text", full: true },
      { key: "email", label: "Email link", type: "text", placeholder: "mailto:name@example.org" },
      { key: "github", label: "GitHub URL", type: "url" },
    ],
  },
  {
    slug: "site",
    file: "site.json",
    label: "Site settings",
    singular: "Settings",
    description:
      "Identity, contact details, focus areas, and the headline statistics.",
    titleKey: "name",
    singleton: true,
    fields: [
      { key: "name", label: "Organization name", type: "text" },
      { key: "committee", label: "Committee name", type: "text" },
      { key: "shortName", label: "Short name", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "github", label: "GitHub organization", type: "url" },
      { key: "institution", label: "Institution", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "established", label: "Established", type: "text" },
      { key: "description", label: "Description", type: "textarea", full: true },
      {
        key: "focusAreas",
        label: "Focus areas",
        type: "tags",
        full: true,
        help: "Comma-separated. Shown on the home page.",
      },
      {
        key: "researchStats",
        label: "Headline statistics",
        type: "metrics",
        full: true,
      },
    ],
  },
];

export function getCollection(slug: string): CollectionDef | undefined {
  return collections.find((collection) => collection.slug === slug);
}
