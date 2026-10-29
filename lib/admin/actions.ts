"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  getAdminPassword,
  isAuthenticated,
  verifyCredentials,
} from "./auth";
import { normalizeCollection } from "./normalize";
import { getCollection } from "./schema";
import { writeCollection } from "./store";

export type LoginState = { error: string | null };

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!getAdminPassword()) {
    return {
      error:
        "ADMIN_PASSWORD is not set. Add it to your environment before signing in.",
    };
  }

  if (!(await verifyCredentials(password))) {
    return { error: "Incorrect password. Try again." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export type SaveResult = { ok: boolean; message: string };

export async function saveCollectionAction(
  slug: string,
  data: unknown,
): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, message: "Your session expired. Sign in again." };
  }

  const def = getCollection(slug);
  if (!def) {
    return { ok: false, message: "Unknown collection." };
  }

  try {
    const normalized = normalizeCollection(def, data);
    const mode = await writeCollection(def, normalized);
    revalidatePath("/", "layout");

    return {
      ok: true,
      message:
        mode === "github"
          ? "Committed to GitHub. Vercel will rebuild the site shortly."
          : "Saved to content/ and refreshed the site.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save changes.";
    return { ok: false, message };
  }
}
