// Everything on this site that isn't hardcoded copy comes from the
// dashboard (arnayem.top/dashboard), fetched server-side. Same domain in
// production, so URLs it returns are root-relative and just work as an
// <img>/next/image src on this site too. Every fetcher fails soft (empty
// array) rather than throwing — a dashboard outage should degrade a
// section to empty, never take down the page.
const DASHBOARD_API_BASE = process.env.DASHBOARD_API_URL ?? "https://arnayem.top/dashboard/api";
const REVALIDATE_SECONDS = 300;

export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  image: string | null;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  publishedAt: string;
};

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Repo = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string | null;
  status: string;
};

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${DASHBOARD_API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getWorkItems(): Promise<WorkItem[]> {
  const data = await fetchJson<{ items: WorkItem[] }>("/work");
  return Array.isArray(data?.items) ? data.items : [];
}

export async function getWorkItem(slug: string): Promise<WorkItem | null> {
  const items = await getWorkItems();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchJson<{ posts: BlogPost[] }>("/blog");
  return Array.isArray(data?.posts) ? data.posts : [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getServices(): Promise<ServiceItem[]> {
  const data = await fetchJson<{ items: ServiceItem[] }>("/services");
  return Array.isArray(data?.items) ? data.items : [];
}

export async function getFaqs(): Promise<FaqItem[]> {
  const data = await fetchJson<{ items: FaqItem[] }>("/faq");
  return Array.isArray(data?.items) ? data.items : [];
}

export async function getRepos(): Promise<Repo[]> {
  const data = await fetchJson<{ items: Repo[] }>("/repos");
  return Array.isArray(data?.items) ? data.items : [];
}
