import { data } from 'react-router'

export async function action ({ request }) {
  const backendUrl =
    (typeof process !== 'undefined' && process.env?.BACKEND_URL) ||
    import.meta.env.VITE_BACKEND_URL

  const apiToken =
    (typeof process !== 'undefined' && process.env?.API_TOKEN) ||
    import.meta.env.VITE_API_TOKEN

  const body = await request.json()

  const res = await fetch(`${backendUrl}/api/email`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    return data({ ok: false }, { status: res.status })
  }

  return data({ ok: true })
}
