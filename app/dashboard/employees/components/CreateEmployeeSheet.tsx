import { useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'
import { EmployeeProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../../hooks/state'
import { queryClient } from '../../layout'

import { DEFAULT_EMPLOYEE } from '../constants/defaultEmployee'
import { useEmployeeForm } from '../hooks/useEmployeeForm'

import EmployeeSheet from './EmployeeSheet'

type CreateEmployeeSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateEmployeeSheet = ({
  isOpen,
  onOpenChange,
}: CreateEmployeeSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const { employee, updateField, resetForm } = useEmployeeForm(DEFAULT_EMPLOYEE)

  useEffect(() => {
    if (!isOpen) resetForm()
  }, [isOpen, resetForm])

  const handleCreate = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('employees')
      .insert([{ ...employee, business: selectedBusiness }])
      .select()

    if (error) {
      console.error('Error creating employee:', error)
    } else {
      queryClient.setQueryData(
        ['employees', selectedBusiness],
        (employees: EmployeeProps[] = []) => [
          ...employees,
          { ...employee, id: data[0].id },
        ]
      )
    }

    onOpenChange(false)
  }

  return (
    <EmployeeSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create Employee"
      description="Fill in the details below to create a new employee."
      employee={employee}
      onUpdateField={updateField}
      onSave={handleCreate}
      saveButtonText="Create Employee"
    />
  )
}

export default CreateEmployeeSheet
