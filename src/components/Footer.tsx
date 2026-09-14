"use client";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Project Management",
  "International Operations",
  "Supply Chain Coordination",
  "Process Optimization",
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ar-nayem-04b53126b/" },
  { label: "GitHub", href: "https://github.com/ar-nayem" },
  { label: "Facebook", href: "https://www.facebook.com/share/188hce9sPx/" },
  { label: "Instagram", href: "https://www.instagram.com/arnayem3622/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-dark-border bg-dark-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold text-white">
              Nayem<span className="text-gold">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Project Manager & International Operations Specialist —
              delivering structure and results across borders.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service} className="text-sm text-text-muted">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <a href="mailto:nayem3622@gmail.com" className="transition-colors hover:text-gold">
                  nayem3622@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801817535007" className="transition-colors hover:text-gold">
                  +880 1817535007
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {year} MD Aminur Rahman Nayem. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full border border-dark-border px-4 py-2 text-xs text-text-muted transition-colors hover:border-gold hover:text-gold"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
