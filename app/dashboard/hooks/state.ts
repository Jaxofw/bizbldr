import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { BusinessProps } from '@/types/business'

export const businesses = atom<BusinessProps[]>([])

export const selectedBusinessAtom = atom<string>('')

export const useSetBusinesses = () => useSetAtom(businesses)
export const useBusinessesState = () => useAtom(businesses)

export const useSelectedBusinessValue = () => useAtomValue(selectedBusinessAtom)
export const useSetSelectedBusiness = () => useSetAtom(selectedBusinessAtom)
