import { useState } from 'react'
import { JobProps } from '@/types/blocks'

export const useJobForm = (initialJob: Partial<JobProps>) => {
  const [job, setJob] = useState<JobProps>(initialJob as JobProps)

  const updateField = (field: keyof JobProps, value: string) => {
    setJob((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateEmployees = (employeeId: number) => {
    setJob((prev) => {
      const isAssigned = prev.employee_ids.includes(employeeId)

      return {
        ...prev,
        employee_ids: isAssigned
          ? prev.employee_ids.filter((id) => id !== employeeId)
          : [...prev.employee_ids, employeeId],
      }
    })
  }

  const resetForm = () => {
    setJob(initialJob as JobProps)
  }

  return {
    job,
    updateField,
    updateEmployees,
    resetForm,
    setJob,
  }
}
