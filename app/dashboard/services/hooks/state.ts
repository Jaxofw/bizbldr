import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'

import { ServiceProps } from '@/types/blocks'
import { createClient } from '@/lib/supabase/client'

import { queryClient } from '@/app/dashboard/layout'

import { selectedBusinessAtom } from '@/app/dashboard/hooks/state'

const serviceEditingAtom = atom<ServiceProps | null>(null)
const isCreatingServiceAtom = atom<boolean>(false)

const fetchServices = async (businessId: string) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('business', businessId)

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
    return [] as ServiceProps[]
  }
}

const servicesQueryAtom = atomWithQuery(
  (get) => ({
    queryKey: ['services', get(selectedBusinessAtom)],
    queryFn: async () => {
      const businessId = get(selectedBusinessAtom)
      return await fetchServices(businessId)
    },
  }),
  () => queryClient
)

const servicesAtom = atom<ServiceProps[]>((get) => {
  const { data = [] } = get(servicesQueryAtom)
  return data
})

export const useServicesValue = () => useAtomValue(servicesAtom)

export const useServiceEditingValue = () => useAtomValue(serviceEditingAtom)
export const useSetServiceEditing = () => useSetAtom(serviceEditingAtom)
export const useServiceEditingState = () => useAtom(serviceEditingAtom)

export const useIsCreatingServiceState = () => useAtom(isCreatingServiceAtom)
