import { atom, useAtomValue, useSetAtom } from 'jotai'

export const selectedBusinessAtom = atom<string>('')

export const useSelectedBusinessValue = () => useAtomValue(selectedBusinessAtom)
export const useSetSelectedBusiness = () => useSetAtom(selectedBusinessAtom)
