export type Stat = {
  label: string;
  value: string;
};

export type Site = {
  name: string;
  committee: string;
  shortName: string;
  email: string;
  github: string;
  linkedin: string;
  institution: string;
  location: string;
  established: string;
  description: string;
  focusAreas: string[];
  researchStats: Stat[];
};

export type HomeContent = {
  heroTitle: string;
  heroIntro: string;
  heroSecondary: string;
  aboutTitle: string;
  aboutIntro: string;
  aboutSecondary: string;
  activitiesTitle: string;
  activitiesIntro: string;
  activities: Metric[];
};

export type LearningStep = {
  number: string;
  title: string;
  description: string;
  outcome: string;
};

export type Resource = {
  title: string;
  description: string;
  category: "Start here" | "Python" | "Data" | "Research" | "Collaboration";
  href: string;
};

export type ProjectStatus = "Active" | "Completed";

export type Metric = {
  label: string;
  value: string;
};

export type Project = {
  code: string;
  name: string;
  status: ProjectStatus;
  period: string;
  title: string;
  abstract: string;
  tags: string[];
  metrics: Metric[];
  repo: string;
  featured?: boolean;
};

export type Tool = {
  name: string;
  version: string;
  description: string;
  command: string;
  tags: string[];
  href: string;
};

export type Dataset = {
  name: string;
  description: string;
  format: string;
  size: string;
  license: string;
  updated: string;
  access: "Open" | "On request";
  href: string;
};

export type Script = {
  name: string;
  href: string;
};

export type PaperType = "Peer-reviewed" | "Preprint" | "Technical note";

export type Paper = {
  date: string;
  title: string;
  authors: string;
  venue: string;
  type: PaperType;
  reference: string;
  href: string;
};

export type SeminarType =
  | "Workshop"
  | "Guest lecture"
  | "Collaborative session";

export type SeminarStatus = "Upcoming" | "Past";

export type Seminar = {
  status: SeminarStatus;
  date: string;
  day: string;
  title: string;
  description: string;
  type: SeminarType;
  speaker: string;
  location: string;
  time: string;
  href: string;
};

export type Member = {
  name: string;
  initials: string;
  role: string;
  focus: string;
  email: string;
  github: string;
};

export type ContentShape = {
  site: Site;
  home: HomeContent;
  learning: LearningStep[];
  resources: Resource[];
  projects: Project[];
  tools: Tool[];
  datasets: Dataset[];
  scripts: Script[];
  papers: Paper[];
  seminars: Seminar[];
  members: Member[];
};
