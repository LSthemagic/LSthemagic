export interface ProfileConfig {
  username: string;
  name: string;
  role: string;
  location: string;
  status: string;
  intro: string[];
  focus: string[];
  experience: string[];
  mission: Array<{ code: string; title: string; detail: string }>;
  technologyGroups: Array<{ title: string; items: string[] }>;
  social: {
    linkedin: string;
    portfolio: string;
    email: string;
    github: string;
  };
}

export interface GitHubUser {
  public_repos: number;
  followers: number;
}

export interface GitHubRepo {
  name?: string;
  full_name?: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  html_url?: string;
  pushed_at?: string;
}

export interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, any>;
}

export interface ProfileSnapshot {
  user: GitHubUser;
  repositories: GitHubRepo[];
  events: GitHubEvent[];
  capturedAt: string;
}

export interface LanguageSignal {
  name: string;
  count: number;
  percentage: number;
}

export interface TelemetryModel {
  publicRepositories: number;
  followers: number;
  starsReceived: number;
  recentActivity: number;
  languages: LanguageSignal[];
  updatedAt: string;
}

export interface TransmissionEntry {
  date: string;
  title: string;
  repository: string;
}
