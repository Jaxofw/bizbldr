import { useState } from 'react'
import { toast } from 'sonner'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { createClient } from '@/lib/supabase/client'
import { JobProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'
import { useServicesValue } from '../../services/hooks/state'
import { useCustomersValue } from '../../customers/hooks/state'

type DeleteJobDialogProps = {
  job: JobProps
  onClose: () => void
}

const DeleteJobDialog = ({ job, onClose }: DeleteJobDialogProps) => {
  const selectedBusiness = useSelectedBusinessValue()
  const services = useServicesValue()
  const customers = useCustomersValue()
  const [loading, setLoading] = useState(false)

  const service = services.find((s) => s.id === Number(job.service_id))
  const customer = customers.find((c) => c.id === Number(job.customer_id))

  const handleDelete = async () => {
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.from('jobs').delete().eq('id', job.id)

    if (error) {
      toast.error('Failed to delete job')
      console.error('Error deleting job:', error.message)
      setLoading(false)
      return
    }

    queryClient.setQueryData(
      ['jobs', selectedBusiness],
      (jobs: JobProps[] = []) => jobs.filter((j) => j.id !== job.id)
    )

    toast.success('Job deleted successfully')
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this job? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>

      <div className="py-6">
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {service?.name ?? 'Untitled Job'}
            </h3>
            <p className="text-sm text-muted-foreground">
              You&apos;re about to permanently delete this job
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Customer
              </p>
              <p className="text-sm font-medium">
                {customer
                  ? `${customer.first_name} ${customer.last_name}`
                  : 'No customer assigned'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </p>
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium capitalize">
                {job.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Description
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {service?.description ?? 'No description provided.'}
            </p>
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Job'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteJobDialog
