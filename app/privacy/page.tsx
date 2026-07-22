import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ponytail: edit these before launch
const LAST_UPDATED = "July 22, 2026";
const SUPPORT_EMAIL = "ashwong8@hotmail.com";
const RETENTION_WINDOW = "30 days";

export const metadata: Metadata = {
  title: "Privacy Policy — MotorLink",
  description:
    "How MotorLink handles your data during the Apple TestFlight beta.",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Who This App Is For",
    body: [
      "MotorLink is used in two ways: by individual drivers monitoring their own vehicle, and by parents/guardians or fleet managers monitoring a linked teen driver's or employee driver's vehicle activity. If you are a teen driver or employee driver whose account is linked to a parent/guardian or fleet manager, that linked party can view your drive activity as described in Section 3.",
      "MotorLink is not intended for use by children under 13, and teen driver accounts must be set up and linked by a parent or guardian, not created independently by a minor. By linking a teen driver account, the parent or guardian confirms they have the authority to consent to that driver's data being collected and shared as described here.",
      "Monitoring is never silent. Every monitored driver is shown, inside the app, who their account is linked to and what that party can see. Fleet managers are responsible for obtaining any employee consent or notice their local law requires before linking a driver.",
    ],
  },
  {
    title: "2. Data We Collect and How We Use It",
    body: [
      "Bluetooth: MotorLink requires access to your device's Bluetooth to connect locally to your vehicle's physical OBD-II scanner.",
      "Location: We request the \"Always\" Location Services permission, and we do not track, record, transmit, or store your GPS location or geographic coordinates at any point. The location fixes iOS provides are discarded the moment we receive them — no part of the app reads them.",
      "The permission exists for one technical reason: iOS suspends an app's timers as soon as it moves to the background, and recording a drive requires continuously polling the OBD-II scanner for the entire trip. Background App Refresh cannot do this — it grants a brief wake roughly every 15 minutes, not a running process — and Bluetooth background mode alone is not enough either, because the scanner only answers when the app asks it a question. The background location mode is the only iOS facility that keeps the app running long enough to record a drive. \"Always\" specifically is required so that a drive can begin recording when you start driving without opening the app first; iOS only permits background-initiated updates under that setting.",
      "If you decline this permission, MotorLink still works — you can record drives manually with the app open. You lose only automatic, hands-free trip recording.",
      "Vehicle and diagnostic data: The scanner reads vehicle telemetry (such as speed and RPM), diagnostic trouble codes, and your vehicle's VIN (Vehicle Identification Number), which is used to identify your vehicle's make and model for accurate diagnostics.",
      "Account data: When you create an account, we collect your email address, display name, and, for fleet accounts, an organization name.",
      "Push notification data: If you enable notifications, we collect a device push token (via Apple's and Expo's push notification services) to deliver drive alerts and digest summaries.",
    ],
  },
  {
    title: "3. Cloud Storage and Account Linkage",
    body: [
      "The vehicle telemetry and diagnostic data read by the scanner is transmitted to and stored securely on our cloud servers, hosted via a Railway PostgreSQL database.",
      "MotorLink supports two kinds of monitored relationships. In parent-monitored teen driving, drive telemetry from a teen driver's account is directly shared with and visible to the linked parent or guardian account. In fleet-monitored driving (B2B), drive telemetry from an employee driver's account is directly shared with and visible to the linked fleet manager account.",
      "Data is not shared with any third-party advertisers or data brokers, and is not sold.",
    ],
  },
  {
    title: "4. Third-Party Processing",
    body: [
      "To translate diagnostic codes into plain-English explanations, relevant diagnostic data — the trouble codes themselves and your vehicle's make, model, and year — is sent to Anthropic's Claude API for processing. This data does not include your location, account email, name, or full VIN. Anthropic processes this data solely to generate the explanation returned to the app and does not use it to train models on our behalf beyond standard API terms.",
      "Push notifications are delivered via Expo's push notification service and Apple's APNs (and, where applicable, Google's FCM), which receive a device push token but not your diagnostic or account data.",
    ],
  },
  {
    title: "5. TestFlight and Crash Analytics",
    body: [
      "Because this is a beta application distributed through Apple TestFlight, Apple automatically collects crash logs, usage data, and device information. This data is shared with us to help identify bugs, improve connection stability, and refine the app's performance before public release. You cannot opt out of this base level of diagnostic reporting while using TestFlight.",
    ],
  },
  {
    title: "6. Feedback and Communication",
    body: [
      "If you choose to submit feedback or bug reports directly through the TestFlight app, your email address and comments will be shared with us so we can follow up on the issue.",
    ],
  },
  {
    title: "7. Data Retention and Your Rights",
    body: [
      `We retain account and telemetry data for as long as your account is active. To request access to, correction of, or deletion of your data, contact us at the email below — we will delete your account and associated data within ${RETENTION_WINDOW} of a verified request. Note that if your account is linked to a parent/guardian or fleet manager, we may need to confirm the request with that party for teen or employer-managed accounts.`,
      "You can also delete your account and all associated data at any time from within the app, under Account → Delete Account. Deleting a parent or fleet manager account also unlinks every driver attached to it.",
      "Depending on where you live, you may have additional rights over your personal data — including the right to access, correct, port, or erase it, and to object to certain processing. Contact us at the email below to exercise any of them; we do not charge for these requests and will not treat you differently for making one.",
    ],
  },
  {
    title: "8. How We Protect Your Data",
    body: [
      "Data sent between the app and our servers is encrypted in transit using TLS, and stored on managed database infrastructure with access restricted to authorised personnel. No system is perfectly secure, but if a breach affecting your data occurs, we will notify you at your account email address without undue delay.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    body: [
      "We may update this policy as MotorLink develops. If we make a material change to how we collect, use, or share your data, we will update the date at the top of this page and notify beta testers by email or in-app notice before the change takes effect.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      `If you have any questions about this policy or how your data is handled during the beta test, please contact us at: ${SUPPORT_EMAIL}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <Nav />

      <section
        className="legal-section"
        style={{ padding: "96px 32px", background: "var(--color-canvas)" }}
      >
        <article style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: 16,
            }}
          >
            Legal
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 48,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            Privacy Policy
          </h1>

          <p style={{ fontSize: 14, color: "var(--color-muted)", marginTop: 16 }}>
            Last updated: {LAST_UPDATED}
          </p>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--color-body-strong)",
              marginTop: 32,
              paddingTop: 32,
              borderTop: "1px solid var(--color-hairline)",
            }}
          >
            This privacy policy applies to the beta version of MotorLink
            distributed via Apple TestFlight.
          </p>

          {SECTIONS.map(({ title, body }) => (
            <section key={title} style={{ marginTop: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.3px",
                  color: "var(--color-ink)",
                  margin: "0 0 12px",
                }}
              >
                {title}
              </h2>
              {body.map((para) => (
                <p
                  key={para}
                  style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "var(--color-body)",
                    margin: "0 0 12px",
                  }}
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </article>
      </section>

      <Footer />
    </main>
  );
}
