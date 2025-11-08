import { useState } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { createClient } from '@/lib/supabase/client'
import { EmployeeProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

type DeleteEmployeeDialogProps = {
  employee: EmployeeProps | null
  setIsDialogOpen: (open: boolean) => void
}

const DeleteEmployeeDialog = ({
  employee,
  setIsDialogOpen,
}: DeleteEmployeeDialogProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!employee) return

    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', employee.id)

    if (error) {
      console.error('Error deleting employee:', error.message)
    } else {
      queryClient.setQueryData(
        ['employees', selectedBusiness],
        (employees: EmployeeProps[] = []) =>
          employees.filter((e) => e.id !== employee.id)
      )

      setIsDialogOpen(false)
    }

    setLoading(false)
  }

  if (!employee) return null

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>

      <div className="py-2">
        <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Employee Name
            </div>
            <div className="text-lg font-semibold">
              {employee.first_name} {employee.last_name}
            </div>
          </div>

          {(employee.position || employee.department) && (
            <div className="pt-2 border-t flex gap-6">
              {employee.position && (
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Position
                  </div>
                  <div className="text-sm text-foreground/80">
                    {employee.position}
                  </div>
                </div>
              )}
              {employee.department && (
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Department
                  </div>
                  <div className="text-sm text-foreground/80">
                    {employee.department}
                  </div>
                </div>
              )}
            </div>
          )}

          {employee.email && (
            <div className="pt-2 border-t">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Email
              </div>
              <div className="text-sm text-foreground/80">{employee.email}</div>
            </div>
          )}

          {employee.phone && (
            <div className="pt-2 border-t">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Phone
              </div>
              <div className="text-sm text-foreground/80">{employee.phone}</div>
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Employee'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteEmployeeDialog
