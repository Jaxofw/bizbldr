import { useState, useCallback } from 'react'
import { CustomerProps, CustomerAddressProps } from '@/types/blocks'

export const useCustomerForm = (initialCustomer: Partial<CustomerProps>) => {
  const [customer, setCustomer] = useState<CustomerProps>(
    initialCustomer as CustomerProps
  )

  const updateField = useCallback(
    (field: keyof CustomerProps, value: string) => {
      setCustomer((prev) => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  )

  const updateAddress = useCallback(
    (field: keyof CustomerAddressProps, value: string) => {
      setCustomer((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        } as CustomerAddressProps,
      }))
    },
    []
  )

  const resetForm = useCallback(() => {
    setCustomer(initialCustomer as CustomerProps)
  }, [initialCustomer])

  return {
    customer,
    updateField,
    updateAddress,
    resetForm,
    setCustomer,
  }
}
