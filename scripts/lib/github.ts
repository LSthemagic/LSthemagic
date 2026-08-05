import type { GitHubEvent, GitHubRepo, GitHubUser, ProfileSnapshot } from './types.ts';

const API_ROOT = 'https://api.github.com';

export async function fetchGitHubSnapshot(username: string, token?: string): Promise<ProfileSnapshot> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'railan-engineering-system',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const [user, repositories, events] = await Promise.all([
    fetchJson<GitHubUser>(`${API_ROOT}/users/${encodeURIComponent(username)}`, headers),
    fetchJson<GitHubRepo[]>(
      `${API_ROOT}/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`,
      headers,
    ),
    fetchJson<GitHubEvent[]>(
      `${API_ROOT}/users/${encodeURIComponent(username)}/events/public?per_page=100`,
      headers,
    ),
  ]);

  return {
    user,
    repositories,
    events,
    capturedAt: new Date().toISOString(),
  };
}

async function fetchJson<T>(url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    throw new Error(`GitHub API request failed (${response.status})${remaining ? `; rate limit remaining: ${remaining}` : ''}`);
  }
  return (await response.json()) as T;
}
