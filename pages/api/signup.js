// Minimal server-relay for signup form submissions
// - Accepts POST { email, name? }
// - If GOOGLE_FORMS_URL is set, forwards as application/x-www-form-urlencoded
//   mapping keys to Google Form `entry.*` names via GOOGLE_FORMS_MAPPING (JSON string)
// - Otherwise returns success (no-op). Keep PII out of logs where possible.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method-not-allowed' })
  }

  try {
    const payload = req.body || {}
    const email = (payload.email || '').toString().trim()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'invalid-email' })
    }

    const googleFormsUrl = process.env.GOOGLE_FORMS_URL
    if (googleFormsUrl) {
      // Optional mapping: JSON like '{"email":"entry.111111111","name":"entry.22222222"}'
      let mapping = {}
      try {
        if (process.env.GOOGLE_FORMS_MAPPING) mapping = JSON.parse(process.env.GOOGLE_FORMS_MAPPING)
      } catch (e) {
        console.warn('Invalid GOOGLE_FORMS_MAPPING, ignoring')
      }

      const formBody = new URLSearchParams()
      // If mapping provided, map payload keys -> entry ids. Otherwise try a sensible default.
      if (Object.keys(mapping).length > 0) {
        for (const [key, entryName] of Object.entries(mapping)) {
          formBody.append(entryName, payload[key] ?? '')
        }
      } else {
        // Default mapping: map `email` to a generic entry key placeholder.
        // Replace 'entry.111111111' with the real field name for your Google Form.
        formBody.append('entry.111111111', email)
        if (payload.name) formBody.append('entry.222222222', payload.name)
      }

      const gRes = await fetch(googleFormsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      })

      if (!gRes.ok) {
        const text = await gRes.text().catch(() => '')
        return res.status(502).json({ error: 'upstream-failure', status: gRes.status, body: text })
      }

      return res.status(200).json({ data: null, error: null })
    }

    // No upstream configured — accept the submission and return success.
    // Log a masked email for observability (avoid full PII in logs).
    try {
      const masked = email.replace(/(^.{2}).+(@.+$)/, '$1***$2')
      console.info('signup accepted:', masked)
    } catch (e) {
      // ignore logging errors
    }

    return res.status(200).json({ data: null, error: null })
  } catch (err) {
    console.error('signup handler error', err)
    return res.status(500).json({ error: 'server-error', message: String(err) })
  }
}
