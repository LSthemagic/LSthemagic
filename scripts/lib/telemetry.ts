import type { GitHubEvent, GitHubRepo, GitHubUser, LanguageSignal, TelemetryModel } from './types.ts';

const ACTIVITY_WINDOW_DAYS = 30;
const MAX_LANGUAGES = 4;

export function buildTelemetry(
  user: GitHubUser,
  repositories: GitHubRepo[],
  events: Array<Pick<GitHubEvent, 'created_at'>>,
  now = new Date(),
): TelemetryModel {
  const activeOwnedRepositories = repositories.filter((repo) => !repo.fork && !repo.archived);
  const starsReceived = activeOwnedRepositories.reduce(
    (total, repo) => total + Math.max(0, repo.stargazers_count ?? 0),
    0,
  );

  const languageCounts = new Map<string, number>();
  for (const repo of activeOwnedRepositories) {
    if (!repo.language) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }

  const languages = rankLanguages(languageCounts);
  const cutoff = now.getTime() - ACTIVITY_WINDOW_DAYS * 24 * 60 * 60 * 1_000;
  const recentActivity = events.filter((event) => {
    const timestamp = new Date(event.created_at).getTime();
    return Number.isFinite(timestamp) && timestamp >= cutoff && timestamp <= now.getTime();
  }).length;

  return {
    publicRepositories: Math.max(0, user.public_repos ?? 0),
    followers: Math.max(0, user.followers ?? 0),
    starsReceived,
    recentActivity,
    languages,
    updatedAt: new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(now)
      .toUpperCase(),
  };
}

function rankLanguages(languageCounts: Map<string, number>): LanguageSignal[] {
  const total = [...languageCounts.values()].reduce((sum, count) => sum + count, 0);
  if (total === 0) return [{ name: 'Exploring', count: 0, percentage: 100 }];

  const ranked = [...languageCounts.entries()]
    .sort(([nameA, countA], [nameB, countB]) => countB - countA || nameA.localeCompare(nameB));

  const visible = ranked.length <= MAX_LANGUAGES
    ? ranked
    : [
        ...ranked.slice(0, MAX_LANGUAGES - 1),
        ['Other', ranked.slice(MAX_LANGUAGES - 1).reduce((sum, [, count]) => sum + count, 0)] as [string, number],
      ];

  const result = visible.map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / total) * 100),
  }));
  const roundingDifference = 100 - result.reduce((sum, item) => sum + item.percentage, 0);
  if (result.length > 0) result[result.length - 1]!.percentage += roundingDifference;
  return result;
}
