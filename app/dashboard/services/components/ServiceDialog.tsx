import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { ServiceProps } from '@/types/blocks'

type ServiceDialogProps = {
  initialData: Partial<ServiceProps>
  onSave: (data: Partial<ServiceProps>) => Promise<void>
  setIsDialogOpen: (isOpen: boolean) => void
  isEditing?: boolean
}

const ServiceDialog = ({
  initialData,
  onSave,
  setIsDialogOpen,
  isEditing = false,
}: ServiceDialogProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<ServiceProps>>(initialData)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const updateService = (field: keyof ServiceProps, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = async () => {
    if (!formData.name) return

    setIsSaving(true)
    await onSave(formData)
    setIsSaving(false)
  }

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {isEditing ? 'Edit Service' : 'Create Service'}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Update the service details below. Click save when you're done."
            : "Enter the service details below. Click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            value={formData?.name || ''}
            onChange={(e) => updateService('name', e.target.value)}
            placeholder="Enter service name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData?.price || 0}
              onChange={(e) =>
                updateService('price', parseFloat(e.target.value))
              }
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData?.status || 'active'}
              onValueChange={(value) =>
                updateService('status', value as 'active' | 'inactive')
              }
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData?.duration || ''}
            onChange={(e) => updateService('duration', e.target.value)}
            placeholder="e.g., 2-4 weeks"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData?.description || ''}
            onChange={(e) => updateService('description', e.target.value)}
            placeholder="Enter service description"
            rows={3}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving
            ? 'Saving...'
            : isEditing
            ? 'Save Changes'
            : 'Create Service'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default ServiceDialog
