"use client";

import { useState, type FormEvent } from "react";
import { contact, submitRoute } from "@/data/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-paper/25 bg-transparent pb-2.5 pt-1 font-display text-lg text-paper placeholder:text-paper/35 focus:border-orange focus:outline-none focus-visible:outline-none";

function composeMessage(data: Record<string, string>) {
  const lines = [
    `Name: ${data.name}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.email ? `Email: ${data.email}` : "",
    data.guests ? `Guests: ${data.guests}` : "",
    `Interested in: ${data.interest}`,
    data.message ? `Message: ${data.message}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

/**
 * The enquiry form. It submits through whichever channel is configured in
 * data/contact.ts: a POST endpoint if one exists, otherwise WhatsApp, other-
 * wise the guest's mail client — in each case with the enquiry pre-written,
 * so nothing is claimed to send that does not.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const route = submitRoute();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (route === "whatsapp" && contact.whatsapp) {
      window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(composeMessage(data))}`, "_blank", "noopener");
      setStatus("sent");
      return;
    }
    if (route === "email" && contact.email) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `${contact.formTitle} — ${data.name}`,
      )}&body=${encodeURIComponent(composeMessage(data))}`;
      setStatus("sent");
      return;
    }
    if (route === "endpoint" && contact.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="t-lead border-t border-paper/25 pt-8 text-paper">
        {contact.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="t-eyebrow text-paper/55">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="t-eyebrow text-paper/55">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+91" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="t-eyebrow text-paper/55">Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="t-eyebrow text-paper/55">Number of guests</span>
          <input name="guests" type="number" min={1} max={40} inputMode="numeric" placeholder="2" className={field} />
        </label>
      </div>

      <fieldset className="grid gap-4">
        <legend className="t-eyebrow mb-1 text-paper/55">Interested in</legend>
        <div className="flex flex-wrap gap-x-7 gap-y-3.5">
          {contact.interests.map((opt, i) => (
            <label key={opt.id} className="group inline-flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="interest"
                value={opt.label}
                defaultChecked={i === 0}
                className="peer sr-only"
                required
              />
              <span
                aria-hidden
                className="grid h-5 w-5 place-items-center rounded-full border border-paper/35 transition-colors duration-300 peer-checked:border-orange peer-checked:[&>span]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-orange opacity-0 transition-opacity duration-300" />
              </span>
              <span className="font-display text-lg text-paper/85 transition-colors duration-300 peer-checked:text-paper">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="t-eyebrow text-paper/55">Message</span>
        <textarea
          name="message"
          rows={2}
          placeholder="Occasion, dietary needs, preferred dates…"
          className={cn(field, "resize-none")}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="reserve"
          className={cn(
            "inline-flex h-14 items-center justify-center gap-3 bg-orange px-8 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-indigo",
            "transition-colors duration-500 ease-[var(--ease-expo)] hover:bg-paper hover:text-indigo disabled:opacity-60",
          )}
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <svg viewBox="0 0 16 16" className="h-[0.9em] w-[0.9em]" fill="none" aria-hidden>
            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {status === "error" ? (
          <p role="alert" className="t-body-sm text-orange">
            {contact.errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
