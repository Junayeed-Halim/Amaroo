export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await res.json();
    if (!res.ok) throw body;
    return body;
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return null;
}
