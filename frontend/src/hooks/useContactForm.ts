import { useState } from "react";
import { ApiError, apiRequest } from "@/lib/api";

const EURO_COUNTRIES = new Set([
  "Austria",
  "Belgium",
  "Croatia",
  "Cyprus",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Monaco",
  "Netherlands",
  "Portugal",
  "Slovakia",
  "Slovenia",
  "Spain",
]);

export type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  company: string;
  country: string;
  budget: string;
  message: string;
};

export type BudgetConfig = {
  code: string;
  options: string[];
};

export function getBudgetConfig(country: string): BudgetConfig {
  if (country === "India") {
    return {
      code: "INR",
      options: [
        "Free consultation / just exploring",
        "< INR 5,000",
        "INR 5,000 - INR 15,000",
        "INR 15,000 - INR 30,000",
        "INR 30,000 - INR 50,000",
        "INR 50,000 - INR 80,000",
      ],
    };
  }

  if (country === "United Kingdom") {
    return {
      code: "GBP",
      options: [
        "Free consultation / just exploring",
        "< GBP 5,000",
        "GBP 5,000 - GBP 15,000",
        "GBP 15,000 - GBP 30,000",
        "GBP 30,000 - GBP 50,000",
        "GBP 50,000 - GBP 80,000",
      ],
    };
  }

  if (EURO_COUNTRIES.has(country)) {
    return {
      code: "EUR",
      options: [
        "Free consultation / just exploring",
        "< EUR 5,000",
        "EUR 5,000 - EUR 15,000",
        "EUR 15,000 - EUR 30,000",
        "EUR 30,000 - EUR 50,000",
        "EUR 50,000 - EUR 80,000",
      ],
    };
  }

  return {
    code: "USD",
    options: [
      "Free consultation / just exploring",
      "< USD 5,000",
      "USD 5,000 - USD 15,000",
      "USD 15,000 - USD 30,000",
      "USD 30,000 - USD 50,000",
      "USD 50,000 - USD 80,000",
    ],
  };
}

function createInitialState() {
  const initialBudgetOptions = getBudgetConfig("India").options;

  return {
    name: "",
    email: "",
    phone: "",
    subject: "",
    company: "",
    country: "India",
    budget: initialBudgetOptions[1],
    message: "",
  } satisfies ContactFormState;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>(createInitialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const budgetConfig = getBudgetConfig(form.country);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const errors = {
    name: form.name.length < 2 ? "Required" : null,
    email: !validEmail ? "Valid email required" : null,
    country: !form.country ? "Select your country" : null,
    message: form.message.length < 10 ? "At least 10 characters" : null,
  };

  const isValid = !errors.name && !errors.email && !errors.country && !errors.message;

  function updateField<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onCountryChange(country: string) {
    const nextOptions = getBudgetConfig(country).options;
    setForm((current) => ({
      ...current,
      country,
      budget: nextOptions.includes(current.budget) ? current.budget : nextOptions[1],
    }));
  }

  async function submit() {
    setSubmitError(null);
    setTouched({ name: true, email: true, country: true, message: true });

    if (!isValid) {
      return false;
    }

    try {
      setIsSubmitting(true);
      await apiRequest<null>("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm(createInitialState());
      setTouched({});
      return true;
    } catch (error) {
      setSubmitError(error instanceof ApiError ? error.message : "Unable to send your inquiry.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    setForm,
    touched,
    setTouched,
    sent,
    setSent,
    isSubmitting,
    submitError,
    budgetConfig,
    budgetOptions: budgetConfig.options,
    errors,
    isValid,
    updateField,
    onCountryChange,
    submit,
  };
}
