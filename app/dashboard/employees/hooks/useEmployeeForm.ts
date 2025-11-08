import { useCallback, useState } from 'react'
import { EmployeeProps } from '@/types/blocks'

export const useEmployeeForm = (initialEmployee: EmployeeProps) => {
  const [employee, setEmployee] = useState<EmployeeProps>(initialEmployee)

  const updateField = useCallback(
    (field: keyof EmployeeProps, value: string) => {
      setEmployee((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const resetForm = useCallback(() => {
    setEmployee(initialEmployee)
  }, [initialEmployee])

  return {
    employee,
    updateField,
    setEmployee,
    resetForm,
  }
}
