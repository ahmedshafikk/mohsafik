import { api } from "./api";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  publishedAt?: string;
  status?: "draft" | "published";
};

export type Listing = {
  id: string;
  title: string;
  price?: string;
  location?: string;
  type?: string;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  reference?: string;
  images?: string[];
  status?: "available" | "reserved" | "sold" | "draft";
};

const asArray = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const wrapped = (data as Record<string, unknown>)["data"] ?? (data as Record<string, unknown>)["items"];
    if (Array.isArray(wrapped)) return wrapped as T[];
  }
  return [];
};

export const listBlogs = async () => asArray<BlogPost>(await api<unknown>("/api/blogs"));
export const getBlog = (slug: string) => api<BlogPost>(`/api/blogs/${slug}`);
export const createBlog = (body: Partial<BlogPost>) =>
  api<BlogPost>("/api/blogs", { method: "POST", body, auth: true });
export const updateBlog = (id: string, body: Partial<BlogPost>) =>
  api<BlogPost>(`/api/blogs/${id}`, { method: "PUT", body, auth: true });
export const deleteBlog = (id: string) =>
  api<void>(`/api/blogs/${id}`, { method: "DELETE", auth: true });

export const listListings = async () => asArray<Listing>(await api<unknown>("/api/listings"));
export const getListing = (id: string) => api<Listing>(`/api/listings/${id}`);
export const createListing = (body: Partial<Listing>) =>
  api<Listing>("/api/listings", { method: "POST", body, auth: true });
export const updateListing = (id: string, body: Partial<Listing>) =>
  api<Listing>(`/api/listings/${id}`, { method: "PUT", body, auth: true });
export const deleteListing = (id: string) =>
  api<void>(`/api/listings/${id}`, { method: "DELETE", auth: true });

export const login = (email: string, password: string) =>
  api<{ token: string }>("/api/login", { method: "POST", body: { email, password } });

export const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";