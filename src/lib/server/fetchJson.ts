export type Fetch = typeof fetch

export class JsonError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly response: string,
  ) {
    super(`Error fetching ${url}: ${status} ${response}`)
  }
}

export async function fetchJson<Result = Record<string, unknown>>(
  fetch: Fetch,
  url: string,
): Promise<Result> {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json; charset=utf8;',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })

  if (!response.ok) {
    const body = await response.text()

    throw new JsonError(url, response.status, body)
  }

  const payload = await response.json()

  return payload
}
