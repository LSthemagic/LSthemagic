import { titleCaseEventDate } from './svg.ts';
import type { GitHubEvent, TransmissionEntry } from './types.ts';

const AUTOMATED_COMMIT_PREFIX = 'chore(profile):';
const MAX_ENTRIES = 5;

export function buildTransmissionLog(events: GitHubEvent[]): TransmissionEntry[] {
  const entries = events
    .map(toTransmissionEntry)
    .filter((entry): entry is TransmissionEntry => entry !== null)
    .slice(0, MAX_ENTRIES);

  if (entries.length > 0) return entries;

  return [
    {
      date: 'STANDBY',
      title: 'Awaiting the next public transmission',
      repository: 'github.com/LSthemagic',
    },
  ];
}

function toTransmissionEntry(event: GitHubEvent): TransmissionEntry | null {
  const repository = repositoryName(event.repo?.name);
  const date = titleCaseEventDate(event.created_at);
  const payload = event.payload ?? {};

  switch (event.type) {
    case 'PushEvent': {
      const commits = Array.isArray(payload.commits) ? payload.commits : [];
      if (
        repository === 'LSthemagic' &&
        commits.length > 0 &&
        commits.every((commit) => String(commit?.message ?? '').startsWith(AUTOMATED_COMMIT_PREFIX))
      ) {
        return null;
      }
      const count = commits.length || Number(payload.size) || 1;
      return { date, title: `Pushed ${count} ${count === 1 ? 'commit' : 'commits'}`, repository };
    }
    case 'CreateEvent':
      if (payload.ref_type === 'repository') {
        return { date, title: 'Initialized a new repository', repository };
      }
      if (payload.ref_type === 'branch') {
        return { date, title: `Created branch ${shorten(payload.ref, 30)}`, repository };
      }
      return null;
    case 'PullRequestEvent': {
      const action = String(payload.action ?? 'updated');
      const title = shorten(payload.pull_request?.title ?? 'Pull request', 44);
      return { date, title: `${capitalize(action)} PR · ${title}`, repository };
    }
    case 'ReleaseEvent': {
      const tag = shorten(payload.release?.tag_name ?? 'release', 30);
      return { date, title: `Published ${tag}`, repository };
    }
    case 'IssuesEvent': {
      const action = String(payload.action ?? 'updated');
      const title = shorten(payload.issue?.title ?? 'Issue', 44);
      return { date, title: `${capitalize(action)} issue · ${title}`, repository };
    }
    default:
      return null;
  }
}

function repositoryName(fullName: string | undefined): string {
  if (!fullName) return 'unknown-repository';
  return fullName.split('/').at(-1) || fullName;
}

function capitalize(value: string): string {
  return value.length === 0 ? value : `${value[0]?.toUpperCase()}${value.slice(1)}`;
}

function shorten(value: unknown, maxLength: number): string {
  const text = String(value ?? '');
  return text.length <= maxLength ? text : `${text.slice(0, maxLength - 1)}…`;
}
