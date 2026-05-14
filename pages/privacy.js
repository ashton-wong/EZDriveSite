import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — EZDrive</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy (Stub)</h1>
        <p className="mb-4">This is a short privacy policy stub intended for the marketing MVP. Replace this copy with the final legal-approved policy before public promotion.</p>
        <h2 className="text-lg font-semibold mt-4">What we collect</h2>
        <p>For the preorder form we collect only your email address (required) and name (optional). We do not collect vehicle identifiers, health data, or other sensitive personal data.</p>

        <h2 className="text-lg font-semibold mt-4">How we use your data</h2>
        <p>Collected data is used solely to process preorders and notify you about product updates. Exported lead lists contain only email and name and are subject to access controls described in repository documentation.</p>

        <h2 className="text-lg font-semibold mt-4">Analytics</h2>
        <p>We use privacy‑first analytics (GA4) configured to avoid sending PII and to enable IP anonymization when supported. Events include non‑PII parameters such as `variant` and `utm_campaign`.</p>

        <h2 className="text-lg font-semibold mt-4">Contact</h2>
        <p>If you have questions about privacy, contact: privacy@example.com (replace before launch).</p>

        <p className="mt-6 text-sm text-gray-600">This file is a scaffold. See <a href="/docs/privacy-guidance.md">docs/privacy-guidance.md</a> for recommended marketing copy and the production policy checklist.</p>
      </main>
    </>
  )
}
