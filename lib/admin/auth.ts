import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "rna_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

export function getAdminPassword(): string | null {
  const configured = process.env.ADMIN_PASSWORD;
  if (configured) return configured;
  // Local development fallback. Production must set ADMIN_PASSWORD.
  return process.env.NODE_ENV === "production" ? null : "admin";
}

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ??
    `rna-admin:${getAdminPassword() ?? "unconfigured"}`
  );
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function verifyCredentials(password: string): Promise<boolean> {
  const expected = getAdminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export async function createSession(): Promise<void> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expires);
  const token = `${payload}.${sign(payload)}`;

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;

  const expected = sign(expires);
  if (!safeEqual(signature, expected)) return false;

  return Number(expires) > Date.now();
}
