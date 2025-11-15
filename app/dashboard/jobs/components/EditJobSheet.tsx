import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

import { JobProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../../hooks/state'
import { queryClient } from '../../layout'

import { useJobForm } from '../hooks/useJobForm'

import JobSheet from './JobSheet'

type EditJobSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: JobProps
  readOnly?: boolean
}

const EditJobSheet = ({
  isOpen,
  onOpenChange,
  job: initialJob,
  readOnly,
}: EditJobSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()
  const { job, updateField, updateEmployees } = useJobForm(initialJob)

  const handleSave = async () => {
    const supabase = createClient()
    const { id, ...jobData } = job

    const { error } = await supabase.from('jobs').update(jobData).eq('id', id)

    if (error) {
      toast.error('Failed to update job')
      console.error('Error updating job:', error.message)
      return
    }

    queryClient.setQueryData(
      ['jobs', selectedBusiness],
      (jobs: JobProps[] = []) => jobs.map((j) => (j.id === job.id ? job : j))
    )

    toast.success('Job updated successfully')
    onOpenChange(false)
  }

  return (
    <JobSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Edit Job"
      description="Update the job details below."
      job={job}
      onUpdateField={updateField}
      onUpdateEmployees={updateEmployees}
      onSave={handleSave}
      saveButtonText="Update Job"
      readOnly={readOnly}
    />
  )
}

export default EditJobSheet
