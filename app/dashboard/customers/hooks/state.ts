import { atom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'

import { CustomerProps } from '@/types/blocks'
import { createClient } from '@/lib/supabase/client'

import { queryClient } from '@/app/dashboard/layout'

import { selectedBusinessAtom } from '@/app/dashboard/hooks/state'

const fetchCustomers = async (businessId: string) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business', businessId)

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
    return [] as CustomerProps[]
  }
}

const customersQueryAtom = atomWithQuery(
  (get) => ({
    queryKey: ['customers', get(selectedBusinessAtom)],
    queryFn: async () => {
      const businessId = get(selectedBusinessAtom)
      return await fetchCustomers(businessId)
    },
  }),
  () => queryClient
)

const customersAtom = atom<CustomerProps[]>((get) => {
  const { data = [] } = get(customersQueryAtom)
  return data
})

export const useCustomersValue = () => useAtomValue(customersAtom)