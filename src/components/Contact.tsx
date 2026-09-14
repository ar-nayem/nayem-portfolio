"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import CtaButton from "./CtaButton";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const CONTACT_INFO = [
  { label: "Email", value: "nayem3622@gmail.com", href: "mailto:nayem3622@gmail.com" },
  { label: "WhatsApp", value: "+880 1817535007", href: "https://wa.me/8801817535007" },
  { label: "WeChat", value: "15329802848", href: undefined },
  { label: "Phone", value: "+880 1817535007", href: "tel:+8801817535007" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // TODO: wire up an email service (Resend, SendGrid, etc.) — see README.
    console.log("Contact form submission:", form);

    setStatus("success");
    setForm(INITIAL_STATE);
  };

  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Let&apos;s Work Together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-text-muted">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full rounded-lg border border-dark-border bg-dark-secondary px-4 py-3 text-white outline-none transition-colors focus:border-gold"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full rounded-lg border border-dark-border bg-dark-secondary px-4 py-3 text-white outline-none transition-colors focus:border-gold"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm text-text-muted">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={handleChange("subject")}
                className="w-full rounded-lg border border-dark-border bg-dark-secondary px-4 py-3 text-white outline-none transition-colors focus:border-gold"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-text-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                className="w-full resize-none rounded-lg border border-dark-border bg-dark-secondary px-4 py-3 text-white outline-none transition-colors focus:border-gold"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <CtaButton type="submit">Send Message</CtaButton>

            {status === "success" && (
              <p className="text-sm text-gold">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            )}
          </motion.form>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5">
              <div className="rounded-[1.375rem] bg-dark-secondary p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <p className="text-sm text-white">Currently available for new projects</p>
                </div>
                <p className="text-sm text-text-muted">
                  Typical response time: within 24 hours.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {CONTACT_INFO.map((item) => {
                const inner = (
                  <div className="rounded-[1.125rem] bg-dark-secondary p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="text-xs uppercase tracking-wide text-gold">
                      {item.label}
                    </p>
                    <p className="mt-1 text-white">{item.value}</p>
                  </div>
                );
                const shell =
                  "rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-gold/30";
                return item.href ? (
                  <a key={item.label} href={item.href} className={`block ${shell}`}>
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} className={shell}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
