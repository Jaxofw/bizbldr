import { createClient } from '@/lib/supabase/client'
import { ServiceCreateProps, ServiceProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

import ServiceDialog from './ServiceDialog'

type CreateServiceDialogProps = {
  setIsDialogOpen: (isOpen: boolean) => void
}

const CreateServiceDialog = ({ setIsDialogOpen }: CreateServiceDialogProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const initialData: Partial<ServiceCreateProps> = {
    name: '',
    description: '',
    price: 0,
    duration: '',
    status: 'active',
    business: selectedBusiness,
  }

  const handleCreate = async (data: Partial<ServiceProps>) => {
    const supabase = createClient()

    const { error } = await supabase
      .from('services')
      .insert(data)
      .select()
      .single()

    if (error) {
      console.error('Error creating service:', error)
    } else {
      queryClient.setQueryData(
        ['services', selectedBusiness],
        (services: ServiceProps[] = []) => [data, ...services]
      )

      setIsDialogOpen(false)
    }
  }

  return (
    <ServiceDialog
      initialData={initialData}
      onSave={handleCreate}
      setIsDialogOpen={setIsDialogOpen}
      isEditing={false}
    />
  )
}

export default CreateServiceDialog
