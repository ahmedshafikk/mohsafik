/**
 * Thin REST client for the external Cloudflare Workers API.
 * Point VITE_API_BASE_URL at your Worker (e.g. https://api.example.com).
 * Left empty, calls go to same-origin /api/*.
 */
export const API_BASE: string =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined)?.replace(/\/$/, "") ?? "";

const TOKEN_KEY = "ms_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function api<T>(path: string, { method = "GET", body, auth }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = { method, headers };
  if (body !== undefined) init.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${path}`, init);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `${method} ${path} failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** POST a file to the external upload endpoint and return the stored URL. */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const token = getToken();
  const init: RequestInit = { method: "POST", body: form };
  if (token) init.headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(`${API_BASE}/api/upload`, init);
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  const data = (await res.json()) as { url?: string; location?: string };
  const url = data.url ?? data.location;
  if (!url) throw new Error("Upload endpoint did not return a URL");
  return url;
}