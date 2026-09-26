import { ProjectStatus, statusLabels } from '@/data/projects';
export function Status({ status }: { status: ProjectStatus }) {
  return <span className={`status status-${status}`}><span aria-hidden="true" />{statusLabels[status]}</span>;
}
