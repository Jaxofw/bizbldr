import { atom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'

import { EmployeeProps } from '@/types/blocks'
import { createClient } from '@/lib/supabase/client'

import { queryClient } from '@/app/dashboard/layout'

import { selectedBusinessAtom } from '@/app/dashboard/hooks/state'

const fetchEmployees = async (businessId: string) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('business', businessId)

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
    return [] as EmployeeProps[]
  }
}

const employeesQueryAtom = atomWithQuery(
  (get) => ({
    queryKey: ['employees', get(selectedBusinessAtom)],
    queryFn: async () => {
      const businessId = get(selectedBusinessAtom)
      return await fetchEmployees(businessId)
    },
  }),
  () => queryClient
)

const employeesAtom = atom<EmployeeProps[]>((get) => {
  const { data = [] } = get(employeesQueryAtom)
  return data
})

export const useEmployeesValue = () => useAtomValue(employeesAtom)
