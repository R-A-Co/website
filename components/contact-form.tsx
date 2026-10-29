"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { buttonPrimary } from "@/lib/utils";

export function ContactForm({ email }: { email: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const sender = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Message from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${sender}\n\n${message}`,
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 min-w-0 border border-border bg-surface p-4 md:p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
            Your name
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            className="min-h-12 border border-border bg-background px-3 text-[16px] outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
            Your email
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="min-h-12 border border-border bg-background px-3 text-[16px] outline-none transition-colors focus:border-accent"
          />
        </label>
      </div>
      <label className="mt-5 flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={6}
          className="resize-y border border-border bg-background px-3 py-3 text-[16px] leading-[1.6] outline-none transition-colors focus:border-accent"
          placeholder="What would you like to learn, contribute, or explore?"
        />
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" className={buttonPrimary}>
          Open email
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </button>
        <p className="text-[13px] leading-[1.5] text-secondary">
          {submitted
            ? "Your email app should open with the message ready to send."
            : "This opens your email app; nothing is stored on the website."}
        </p>
      </div>
    </form>
  );
}
