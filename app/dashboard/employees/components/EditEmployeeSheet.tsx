import { useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'
import { EmployeeProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

import { useEmployeeForm } from '../hooks/useEmployeeForm'
import { DEFAULT_EMPLOYEE } from '../constants/defaultEmployee'

import EmployeeSheet from './EmployeeSheet'

type EditEmployeeSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  employee: EmployeeProps | null
}

const EditEmployeeSheet = ({
  isOpen,
  onOpenChange,
  employee: initialEmployee,
}: EditEmployeeSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const { employee, updateField, setEmployee } = useEmployeeForm(
    initialEmployee || DEFAULT_EMPLOYEE
  )

  useEffect(() => {
    if (initialEmployee) setEmployee(initialEmployee)
  }, [initialEmployee, setEmployee])

  const handleSave = async () => {
    const supabase = createClient()

    const { id, ...employeeData } = employee

    const { error } = await supabase
      .from('employees')
      .update(employeeData)
      .eq('id', id)

    if (error) {
      console.error('Error updating employee:', error.message)
      return
    } else {
      queryClient.setQueryData(
        ['employees', selectedBusiness],
        (employees: EmployeeProps[] = []) =>
          employees.map((e) => (e.id === employee.id ? employee : e))
      )
    }

    onOpenChange(false)
  }

  if (!initialEmployee) return null

  return (
    <EmployeeSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Edit Employee"
      description="Update the employee details below."
      employee={employee}
      onUpdateField={updateField}
      onSave={handleSave}
      saveButtonText="Update Employee"
    />
  )
}

export default EditEmployeeSheet
