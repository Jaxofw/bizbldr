import { useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'
import { CustomerProps } from '@/types/blocks'

import { queryClient } from '../../layout'
import { useSelectedBusinessValue } from '../../hooks/state'

import { useCustomerForm } from '../hooks/useCustomerForm'
import { DEFAULT_CUSTOMER } from '../constants/defaultCustomer'

import CustomerSheet from './CustomerSheet'

type EditCustomerSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  customer: CustomerProps | null
}

const EditCustomerSheet = ({
  isOpen,
  onOpenChange,
  customer: initialCustomer,
}: EditCustomerSheetProps) => {
  const selectedBusiness = useSelectedBusinessValue()

  const { customer, updateField, updateAddress, setCustomer } = useCustomerForm(
    initialCustomer || DEFAULT_CUSTOMER
  )

  useEffect(() => {
    if (initialCustomer) setCustomer(initialCustomer)
  }, [initialCustomer, setCustomer])

  const handleSave = async () => {
    const supabase = createClient()

    const { error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', customer.id)

    if (error) {
      console.error('Error updating customer:', error.message)
      return
    } else {
      queryClient.setQueryData(
        ['customers', selectedBusiness],
        (customers: CustomerProps[] = []) =>
          customers.map((c) => (c.id === customer.id ? customer : c))
      )
    }

    onOpenChange(false)
  }

  if (!initialCustomer) return null

  return (
    <CustomerSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Edit Customer"
      description="Update the customer details below."
      customer={customer}
      onUpdateField={updateField}
      onUpdateAddress={updateAddress}
      onSave={handleSave}
      saveButtonText="Update Customer"
    />
  )
}

export default EditCustomerSheet
