import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm/ContactForm";
import { ContactRedirects } from "@/components/contact/ContactRedirects/ContactRedirects";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a question? Good.",
};

/** HANDOFF-SPEC.md → "10. Contact — /contact", Contact.dc.html. */
export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <ContactRedirects />
    </>
  );
}
