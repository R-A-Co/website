import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { CollectionDef } from "./schema";

const contentDir = join(process.cwd(), "content");

export type StorageMode = "github" | "local";

export function getStorageMode(): StorageMode {
  return process.env.GITHUB_TOKEN && process.env.GITHUB_REPO
    ? "github"
    : "local";
}

export function getStorageLabel(): string {
  return getStorageMode() === "github"
    ? `GitHub · ${process.env.GITHUB_REPO}`
    : "Local files";
}

function pathFor(def: CollectionDef): string {
  return join(contentDir, def.file);
}

export function readCollection(def: CollectionDef): unknown {
  return JSON.parse(readFileSync(pathFor(def), "utf8")) as unknown;
}

export function countEntries(def: CollectionDef): number {
  const data = readCollection(def);
  if (def.singleton) return 1;
  return Array.isArray(data) ? data.length : 0;
}

/** Writes the collection and returns the storage backend that handled it. */
export async function writeCollection(
  def: CollectionDef,
  data: unknown,
): Promise<StorageMode> {
  const json = `${JSON.stringify(data, null, 2)}\n`;

  if (getStorageMode() === "github") {
    await commitToGitHub(
      def.file,
      json,
      `content: update ${def.label.toLowerCase()} via admin`,
    );
    return "github";
  }

  writeFileSync(pathFor(def), json, "utf8");
  return "local";
}

async function commitToGitHub(
  file: string,
  content: string,
  message: string,
): Promise<void> {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!repo || !token) {
    throw new Error("GitHub storage is not configured.");
  }

  const encodedPath = file
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodedPath}`;

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  let sha: string | undefined;
  const existing = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    headers,
    cache: "no-store",
  });

  if (existing.ok) {
    const body = (await existing.json()) as { sha?: string };
    sha = body.sha;
  } else if (existing.status !== 404) {
    throw new Error(
      `GitHub read failed (${existing.status}): ${await existing.text()}`,
    );
  }

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub write failed (${response.status}): ${await response.text()}`,
    );
  }
}
