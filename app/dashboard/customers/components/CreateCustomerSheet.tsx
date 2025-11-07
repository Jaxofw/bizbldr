import { useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'
import { CustomerProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../../hooks/state'
import { queryClient } from '../../layout'

import { DEFAULT_CUSTOMER } from '../constants/defaultCustomer'
import { useCustomerForm } from '../hooks/useCustomerForm'

import CustomerSheet from './CustomerSheet'

type CreateCustomerSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateCustomerSheet = ({
  isOpen,
  onOpenChange,
}: CreateCustomerSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const { customer, updateField, updateAddress, resetForm } =
    useCustomerForm(DEFAULT_CUSTOMER)

  useEffect(() => {
    if (!isOpen) resetForm()
  }, [isOpen, resetForm])

  const handleCreate = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('customers')
      .insert([{ ...customer, business: selectedBusiness }])
      .select()

    if (error) {
      console.error('Error creating customer:', error)
    } else {
      queryClient.setQueryData(
        ['customers', selectedBusiness],
        (customers: CustomerProps[] = []) => [
          ...customers,
          { ...customer, id: data[0].id },
        ]
      )
    }

    onOpenChange(false)
  }

  return (
    <CustomerSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create Customer"
      description="Fill in the details below to create a new customer."
      customer={customer}
      onUpdateField={updateField}
      onUpdateAddress={updateAddress}
      onSave={handleCreate}
      saveButtonText="Create Customer"
    />
  )
}

export default CreateCustomerSheet
