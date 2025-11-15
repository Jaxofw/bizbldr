import { atom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'

import { JobProps } from '@/types/blocks'
import { createClient } from '@/lib/supabase/client'

import { queryClient } from '@/app/dashboard/layout'

import { selectedBusinessAtom } from '@/app/dashboard/hooks/state'

const fetchJobs = async (businessId: string) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('business', businessId)

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
    return [] as JobProps[]
  }
}

const jobsQueryAtom = atomWithQuery(
  (get) => ({
    queryKey: ['jobs', get(selectedBusinessAtom)],
    queryFn: async () => {
      const businessId = get(selectedBusinessAtom)
      return await fetchJobs(businessId)
    },
  }),
  () => queryClient
)

const jobsAtom = atom<JobProps[]>((get) => {
  const { data = [] } = get(jobsQueryAtom)
  return data
})

export const useJobsValue = () => useAtomValue(jobsAtom)
