import { Kicker } from "@/components/ui/Kicker/Kicker";
import { Button } from "@/components/ui/Button/Button";
import styles from "./ContactForm.module.css";

/**
 * Contact.dc.html lines 44–52. Submission is static, same as the Work
 * With Me enquiry form — the owner-notification email is build stage 5
 * (README.md → Email: "Enquiry notification to the owner (from Work
 * With Me and Contact)").
 */
export function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <Kicker>Contact</Kicker>
        <h1 className={styles.headline}>Have a question? Good.</h1>
        <p className={styles.body}>
          Tell me what you&rsquo;re thinking about, what you&rsquo;re trying to figure out, or
          what currently makes absolutely no sense.
        </p>
      </div>
      <div className={styles.formPanel}>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" type="text" placeholder="Your name" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor="c-email">Email</label>
            <input
              id="c-email"
              name="email"
              type="email"
              placeholder="you@yourthing.com"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="c-note">What&rsquo;s on your mind?</label>
            <textarea
              id="c-note"
              name="note"
              rows={6}
              placeholder="No need to tidy it up first."
              className={styles.input}
            />
          </div>
          <Button type="submit" className={styles.submit}>
            Send
          </Button>
        </form>
        <p className={styles.fine}>A reply usually takes a day or two.</p>
      </div>
    </section>
  );
}
