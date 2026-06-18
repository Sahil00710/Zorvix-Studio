import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Mail, MessageCircle, MapPin, Calendar } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { GlowButton } from "@/components/ui/GlowButton";
import { SITE, getWhatsAppHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ParticleField } from "@/components/special/ParticleField";
import { NoiseTexture } from "@/components/special/NoiseTexture";
import { useContactForm } from "@/hooks/useContactForm";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    createSeoHead({
      title: `Contact ${SITE.shortName} | Start a Website Project`,
      description:
        "Contact ZORVIX STUDIO for custom website development, UI/UX design, frontend performance, animations, and project consultation.",
      path: "/contact",
  }),
});

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function ContactPage() {
  const {
    form,
    touched,
    setTouched,
    sent,
    isSubmitting,
    submitError,
    budgetOptions,
    errors,
    updateField,
    onCountryChange,
    submit,
  } = useContactForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <>
      <section className="section-surface-hero relative isolate overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="absolute inset-0 -z-10">
          <ParticleField density={56} />
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[80vw] w-[80vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-30" />

        <NoiseTexture opacity={0.05} />
        <div className="container-x">
          <SectionLabel number="01" label="Contact" />
          <h1 className="mt-8 max-w-5xl font-display text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-[8vw] lg:text-[7rem]">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="something" delay={0.2} />{" "}
            <SplitText text="together." delay={0.4} wordClassName="text-gradient" />
          </h1>
          <p className="mt-10 max-w-2xl font-body text-lg text-muted-foreground">
            Tell us about your project, your brand, and your timeline. We will get back to you with
            a free consultation and project roadmap within one business day.
          </p>
        </div>
      </section>

      <section className="section-surface-neutral section-pad pt-10 md:pt-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="card-premium rounded-3xl p-8 md:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[40vh] flex-col items-center justify-center gap-6 text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                  <Check size={28} strokeWidth={3} />
                </div>
                <div>
                  <h2 className="font-display text-4xl tracking-tight">Message prepared.</h2>
                  <p className="mt-3 font-body text-muted-foreground">
                    Your inquiry has been submitted successfully. We will get back to you within one
                    business day.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <FloatingInput
                  id="name"
                  label="Your name"
                  value={form.name}
                  error={touched.name ? errors.name : null}
                  onChange={(v) => updateField("name", v)}
                  onBlur={() => setTouched({ ...touched, name: true })}
                />
                <FloatingInput
                  id="email"
                  type="email"
                  label="Email"
                  value={form.email}
                  error={touched.email ? errors.email : null}
                  onChange={(v) => updateField("email", v)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                />
                <FloatingInput
                  id="phone"
                  label="Phone / WhatsApp (optional)"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                />
                <FloatingInput
                  id="subject"
                  label="Project subject (optional)"
                  value={form.subject}
                  onChange={(v) => updateField("subject", v)}
                />
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="hidden"
                  aria-hidden
                />
                <FloatingSelect
                  id="country"
                  label="Where are you from?"
                  value={form.country}
                  options={COUNTRIES}
                  error={touched.country ? errors.country : null}
                  onChange={onCountryChange}
                  onBlur={() => setTouched({ ...touched, country: true })}
                />

                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Budget
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((b) => {
                      const active = form.budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          data-cursor="hover"
                          onClick={() => updateField("budget", b)}
                          className={cn(
                            "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border-strong text-muted-foreground hover:border-foreground hover:text-foreground",
                          )}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <FloatingTextarea
                  id="message"
                  label="Tell us about the project"
                  value={form.message}
                  error={touched.message ? errors.message : null}
                  onChange={(v) => updateField("message", v)}
                  onBlur={() => setTouched({ ...touched, message: true })}
                />

                {submitError && (
                  <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 font-body text-sm text-destructive">
                    {submitError}
                  </div>
                )}

                <div className="pt-2">
                  <GlowButton size="lg" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                  </GlowButton>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="section-surface-blue rounded-3xl border border-border p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Direct
              </div>
              <div className="mt-6 space-y-5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3"
                  data-cursor="hover"
                >
                  <Mail size={18} className="mt-1 text-primary" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Email
                    </div>
                    <div className="mt-1 font-display text-xl tracking-tight transition-colors group-hover:text-primary-glow">
                      {SITE.email}
                    </div>
                  </div>
                </a>
                <a
                  href={getWhatsAppHref(SITE.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3"
                  data-cursor="hover"
                >
                  <MessageCircle size={18} className="mt-1 text-primary" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      WhatsApp
                    </div>
                    <div className="mt-1 font-display text-xl tracking-tight transition-colors group-hover:text-primary-glow">
                      {SITE.whatsapp}
                    </div>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-primary" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Studio
                    </div>
                    <div className="mt-1 font-display text-xl tracking-tight">{SITE.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="card-premium group block rounded-3xl border-primary/40 p-8 shadow-glow-soft transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-primary">
                <Calendar size={18} />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  Prefer a call?
                </span>
              </div>
              <div className="mt-5 font-display text-3xl tracking-tight">
                Book a Free Consultation -{">"}
              </div>
              <p className="mt-3 font-body text-sm text-muted-foreground">
                Let&apos;s discuss your project goals, technical needs, and timeline to see how we
                can help you succeed.
              </p>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
  type?: string;
}) {
  const filled = value.length > 0;
  return (
    <div>
      <div
        className={cn(
          "group relative rounded-2xl border bg-surface px-5 pb-3 pt-7 transition-colors",
          error ? "border-destructive" : "border-border-strong focus-within:border-primary",
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-5 origin-left font-mono uppercase tracking-[0.25em] transition-all",
            filled ? "top-2 text-[9px] text-primary" : "top-5 text-xs text-muted-foreground",
          )}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="block w-full appearance-none border-0 bg-transparent px-0 pt-1 font-body text-base text-foreground shadow-none outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>
      {error && (
        <div className="mt-1 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  options,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
}) {
  const filled = value.length > 0;
  return (
    <div>
      <div
        className={cn(
          "group relative rounded-2xl border bg-surface px-5 pb-3 pt-7 transition-colors",
          error ? "border-destructive" : "border-border-strong focus-within:border-primary",
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-5 origin-left font-mono uppercase tracking-[0.25em] transition-all",
            filled ? "top-2 text-[9px] text-primary" : "top-5 text-xs text-muted-foreground",
          )}
        >
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="block w-full appearance-none border-0 bg-transparent px-0 pt-1 font-body text-base text-foreground shadow-none outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="mt-1 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
}) {
  const filled = value.length > 0;
  return (
    <div>
      <div
        className={cn(
          "group relative rounded-2xl border bg-surface px-5 pb-3 pt-7 transition-colors",
          error ? "border-destructive" : "border-border-strong focus-within:border-primary",
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-5 origin-left font-mono uppercase tracking-[0.25em] transition-all",
            filled ? "top-2 text-[9px] text-primary" : "top-5 text-xs text-muted-foreground",
          )}
        >
          {label}
        </label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={5}
          className="mt-4 block min-h-[8rem] w-full resize-none appearance-none border-0 bg-transparent px-0 pt-0 font-body text-base text-foreground shadow-none outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>
      {error && (
        <div className="mt-1 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
