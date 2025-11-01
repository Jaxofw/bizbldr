import { createClient } from '@/lib/supabase/client'
import { ServiceProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'
import { useServiceEditingValue } from '../hooks/state'
import ServiceDialog from './ServiceDialog'

type EditServiceDialogProps = {
  setIsDialogOpen: (isOpen: boolean) => void
}

const EditServiceDialog = ({ setIsDialogOpen }: EditServiceDialogProps) => {
  const serviceEditing = useServiceEditingValue()
  const selectedBusiness = useSelectedBusinessValue()

  if (!serviceEditing) return null

  const handleUpdate = async (data: Partial<ServiceProps>) => {
    const supabase = createClient()

    const { error } = await supabase
      .from('services')
      .update(data)
      .eq('id', serviceEditing.id)

    if (error) {
      console.error('Error updating service:', error)
    } else {
      queryClient.setQueryData(
        ['services', selectedBusiness],
        (services: ServiceProps[] = []) =>
          services.map((s) => (s.id === serviceEditing.id ? { ...s, ...data } : s))
      )

      setIsDialogOpen(false)
    }
  }

  return (
    <ServiceDialog
      initialData={serviceEditing}
      onSave={handleUpdate}
      setIsDialogOpen={setIsDialogOpen}
      isEditing={true}
    />
  )
}

export default EditServiceDialog
