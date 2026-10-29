import { SITE } from '@/lib/site'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (body.gotcha) {
    return Response.json({ ok: true })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const company = String(body.company || '').trim()
  const focus = String(body.focus || '').trim()
  const message = String(body.message || '').trim()

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Enter a valid email' }, { status: 400 })
  }

  const payload = {
    name,
    email,
    company,
    focus,
    message,
    _subject: `NL Reporting inquiry — ${name}`,
    _replyto: email,
    _template: 'table',
    _captcha: 'false',
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))
    const ok = res.ok && (data.success === true || data.success === 'true')

    if (!ok) {
      return Response.json(
        {
          error:
            data.message ||
            'Delivery failed. Email me directly',
        },
        { status: 502 },
      )
    }

    return Response.json({ ok: true, message: data.message || null })
  } catch {
    return Response.json({ error: 'Delivery failed. Email me directly' }, { status: 502 })
  }
}
