import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
  Dataset,
  HomeContent,
  LearningStep,
  Member,
  Paper,
  Project,
  Resource,
  Script,
  Seminar,
  Site,
  Tool,
} from "./content-types";

/**
 * Content is stored as JSON in /content so the custom admin can write it and
 * git can version every change. Reads happen on the server at build time (and
 * per-request in dev / the admin), never in the browser bundle.
 */
const contentDir = join(process.cwd(), "content");

function read<T>(file: string): T {
  return JSON.parse(readFileSync(join(contentDir, file), "utf8")) as T;
}

export function getSite(): Site {
  return read<Site>("site.json");
}

export function getHome(): HomeContent {
  return read<HomeContent>("home.json");
}

export function getLearningSteps(): LearningStep[] {
  return read<LearningStep[]>("learning.json");
}

export function getResources(): Resource[] {
  return read<Resource[]>("resources.json");
}

export function getProjects(): Project[] {
  const projects = read<Project[]>("projects.json");
  return [...projects].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });
}

export function getFeaturedProject(): Project | undefined {
  return getProjects().find((project) => project.featured);
}

export function getTools(): Tool[] {
  return read<Tool[]>("tools.json");
}

export function getDatasets(): Dataset[] {
  return read<Dataset[]>("datasets.json");
}

export function getScripts(): Script[] {
  return read<Script[]>("scripts.json");
}

export function getPapers(): Paper[] {
  return [...read<Paper[]>("papers.json")].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getSeminars(): Seminar[] {
  return read<Seminar[]>("seminars.json");
}

export function getUpcomingSeminars(): Seminar[] {
  return getSeminars()
    .filter((seminar) => seminar.status === "Upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastSeminars(): Seminar[] {
  return getSeminars()
    .filter((seminar) => seminar.status === "Past")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMembers(): Member[] {
  return read<Member[]>("members.json");
}
