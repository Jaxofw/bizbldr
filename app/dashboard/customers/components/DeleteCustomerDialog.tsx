import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { createClient } from '@/lib/supabase/client'
import { CustomerProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

type DeleteCustomerDialogProps = {
  customer: CustomerProps | null
  setIsDialogOpen: (isOpen: boolean) => void
}

const DeleteCustomerDialog = ({ customer, setIsDialogOpen }: DeleteCustomerDialogProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const [loading, setLoading] = useState(false)

  if (!customer) return null

  const handleDelete = async () => {
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', customer.id)

    if (error) {
      console.error('Error deleting customer:', error)
    } else {
      queryClient.setQueryData(
        ['customers', selectedBusiness],
        (customers: CustomerProps[] = []) =>
          customers.filter((c) => c.id !== customer.id)
      )

      setIsDialogOpen(false)
    }

    setLoading(false)
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this customer?
          This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-2">
        <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Customer Name
            </div>
            <div className="text-lg font-semibold">
              {customer.first_name} {customer.last_name}
            </div>
          </div>

          <div className="pt-2 border-t flex gap-6">
            <div className="flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Email
              </div>
              <div className="text-base font-semibold">
                {customer.email}
              </div>
            </div>
            {customer.phone && (
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Phone
                </div>
                <div className="text-base font-semibold">
                  {customer.phone}
                </div>
              </div>
            )}
          </div>
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
          {loading ? 'Deleting...' : 'Delete Customer'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteCustomerDialog
