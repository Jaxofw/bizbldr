import { JobProps } from '@/types/blocks'

export const DEFAULT_JOB: Partial<JobProps> = {
  status: 'in_progress',
  priority: 'low',
  employee_ids: [],
  start_date: '',
  end_date: '',
  notes: '',
}
