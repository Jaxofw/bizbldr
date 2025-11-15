import { useEffect } from 'react'

import { toast } from 'sonner'

import { createClient } from '@/lib/supabase/client'

import { JobProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../../hooks/state'
import { queryClient } from '../../layout'

import { DEFAULT_JOB } from '../constants/defaultJob'
import { useJobForm } from '../hooks/useJobForm'

import JobSheet from './JobSheet'

type CreateJobSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateJobSheet = ({ isOpen, onOpenChange }: CreateJobSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const { job, resetForm, updateField, updateEmployees } =
    useJobForm(DEFAULT_JOB)

  useEffect(() => {
    if (!isOpen) resetForm()
  }, [isOpen, resetForm])

  const handleCreate = async () => {
    if (!job.service_id) {
      toast.error('Please select a service for this job.')
      return
    }

    if (!job.customer_id) {
      toast.error('Please select a customer for this job.')
      return
    }

    if (!job.employee_ids.length) {
      toast.error('Please assign at least one employee to this job.')
      return
    }

    if (!job.start_date) {
      toast.error('Please select a start date for this job.')
      return
    }

    if (!job.end_date) {
      toast.error('Please select an end date for this job.')
      return
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from('jobs')
      .insert([{ ...job, business: selectedBusiness }])
      .select()

    if (error) {
      toast.error('Error creating job. Please try again.')
      console.error('Error creating job:', error.message)
    } else {
      queryClient.setQueryData(
        ['jobs', selectedBusiness],
        (jobs: JobProps[] = []) => [...jobs, { ...job, id: data[0].id }]
      )
    }

    onOpenChange(false)
  }

  return (
    <JobSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create Job"
      description="Fill in the details below to create a new job."
      job={job}
      onUpdateField={updateField}
      onUpdateEmployees={updateEmployees}
      onSave={handleCreate}
      saveButtonText="Create Job"
    />
  )
}

export default CreateJobSheet
