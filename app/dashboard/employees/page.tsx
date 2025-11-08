'use client'

import { useState } from 'react'

import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'

import { EmployeeProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../hooks/state'

import EmployeeTable from './components/EmployeeTable'
import CreateEmployeeSheet from './components/CreateEmployeeSheet'
import EditEmployeeSheet from './components/EditEmployeeSheet'
import DeleteEmployeeDialog from './components/DeleteEmployeeDialog'
import { useEmployeesValue } from './hooks/state'

const Page = () => {
  const selectedBusiness = useSelectedBusinessValue()
  const employees = useEmployeesValue()

  const [search, setSearch] = useState('')
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false)
  const [employeeEditing, setEmployeeEditing] = useState<EmployeeProps | null>(
    null
  )
  const [employeeDeleting, setEmployeeDeleting] =
    useState<EmployeeProps | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredEmployees = employees.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateEmployee = () => {
    setIsCreatingEmployee(true)
  }

  const handleEditClick = (employee: EmployeeProps) => {
    setEmployeeEditing(employee)
  }

  const handleDeleteClick = (employee: EmployeeProps) => {
    setEmployeeDeleting(employee)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Overview - {selectedBusiness}</CardTitle>
                <CardDescription>
                  Manage and track all your employees for {selectedBusiness}
                </CardDescription>
              </div>
              <Button onClick={handleCreateEmployee}>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees..."
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <EmployeeTable
              employees={filteredEmployees}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </CardContent>
        </Card>
      </div>

      <CreateEmployeeSheet
        isOpen={isCreatingEmployee}
        onOpenChange={setIsCreatingEmployee}
      />

      <EditEmployeeSheet
        isOpen={employeeEditing !== null}
        onOpenChange={(open) => !open && setEmployeeEditing(null)}
        employee={employeeEditing}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DeleteEmployeeDialog
          employee={employeeDeleting}
          setIsDialogOpen={setIsDeleteDialogOpen}
        />
      </Dialog>
    </>
  )
}

export default Page
