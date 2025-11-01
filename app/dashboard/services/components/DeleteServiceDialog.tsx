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
import { ServiceProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

import { useServiceEditingValue } from '../hooks/state'

type DeleteServiceDialogProps = {
  setIsDialogOpen: (isOpen: boolean) => void
}

const DeleteServiceDialog = ({ setIsDialogOpen }: DeleteServiceDialogProps) => {
  const serviceEditing = useServiceEditingValue()
  const selectedBusiness = useSelectedBusinessValue()

  const [loading, setLoading] = useState(false)

  if (!serviceEditing) return null

  const handleDelete = async () => {
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceEditing.id)

    if (error) {
      console.error('Error deleting service:', error)
    } else {
      queryClient.setQueryData(
        ['services', selectedBusiness],
        (services: ServiceProps[] = []) =>
          services.filter((s) => s.id !== serviceEditing.id)
      )

      setIsDialogOpen(false)
    }

    setLoading(false)
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this service?
          This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-2">
        <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Service Name
            </div>
            <div className="text-lg font-semibold">
              {serviceEditing.name}
            </div>
          </div>

          {serviceEditing.description && (
            <div className="pt-2 border-t">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Description
              </div>
              <div className="text-sm text-foreground/80 leading-relaxed">
                {serviceEditing.description}
              </div>
            </div>
          )}

          <div className="pt-2 border-t flex gap-6">
            <div className="flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Price
              </div>
              <div className="text-base font-semibold">
                ${serviceEditing.price.toLocaleString()}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Duration
              </div>
              <div className="text-base font-semibold">
                {serviceEditing.duration}
              </div>
            </div>
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
          {loading ? 'Deleting...' : 'Delete Service'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteServiceDialog
