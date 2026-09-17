import { Kicker } from "@/components/ui/Kicker/Kicker";
import { Button } from "@/components/ui/Button/Button";
import styles from "./WorkWithMeEnquiry.module.css";

/**
 * The enquiry form (Work-With-Me.dc.html lines 70–83). Submission is
 * static for now, the same as the Newsletter form — the owner
 * notification email is build stage 5 (README.md → Email: "Enquiry
 * notification to the owner (from Work With Me and Contact)", sent via
 * Resend alongside the other transactional email built in that stage).
 */
export function WorkWithMeEnquiry() {
  return (
    <section id="enquiry" className={styles.section}>
      <div>
        <Kicker>Enquiry</Kicker>
        <h2 className={styles.headline}>Tell me what you&rsquo;re working on.</h2>
        <p className={styles.body}>A reply usually takes a day or two.</p>
      </div>
      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="wwm-name">Name</label>
          <input id="wwm-name" name="name" type="text" placeholder="Your name" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="wwm-email">Email</label>
          <input
            id="wwm-email"
            name="email"
            type="email"
            placeholder="you@yourthing.com"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="wwm-note">What are you trying to figure out?</label>
          <textarea
            id="wwm-note"
            name="note"
            rows={5}
            placeholder="The messy version is fine."
            className={styles.input}
          />
        </div>
        <Button type="submit" className={styles.submit}>
          Send
        </Button>
      </form>
    </section>
  );
}
