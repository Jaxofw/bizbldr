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

import { CustomerProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../hooks/state'

import CustomerTable from './components/CustomerTable'
import CreateCustomerSheet from './components/CreateCustomerSheet'
import { useCustomersValue } from './hooks/state'
import EditCustomerSheet from './components/EditCustomerSheet'
import DeleteCustomerDialog from './components/DeleteCustomerDialog'

const Page = () => {
  const selectedBusiness = useSelectedBusinessValue()
  const customers = useCustomersValue()

  const [search, setSearch] = useState('')
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false)
  const [customerEditing, setCustomerEditing] = useState<CustomerProps | null>(
    null
  )
  const [customerDeleting, setCustomerDeleting] =
    useState<CustomerProps | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredCustomers = customers.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateCustomer = () => {
    setIsCreatingCustomer(true)
  }

  const handleEditClick = (customer: CustomerProps) => {
    setCustomerEditing(customer)
  }

  const handleDeleteClick = (customer: CustomerProps) => {
    setCustomerDeleting(customer)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customers Overview - {selectedBusiness}</CardTitle>
                <CardDescription>
                  Manage and track all your customers details for{' '}
                  {selectedBusiness}
                </CardDescription>
              </div>
              <Button onClick={handleCreateCustomer}>
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search customers..."
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <CustomerTable
              customers={filteredCustomers}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </CardContent>
        </Card>
      </div>

      <CreateCustomerSheet
        isOpen={isCreatingCustomer}
        onOpenChange={setIsCreatingCustomer}
      />

      <EditCustomerSheet
        isOpen={customerEditing !== null}
        onOpenChange={(open) => !open && setCustomerEditing(null)}
        customer={customerEditing}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DeleteCustomerDialog
          customer={customerDeleting}
          setIsDialogOpen={setIsDeleteDialogOpen}
        />
      </Dialog>
    </>
  )
}

export default Page
