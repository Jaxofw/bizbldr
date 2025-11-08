import { CustomerAddressProps } from '@/types/blocks'

export const getInitials = (first_name: string, last_name: string) => {
  return `${first_name[0]}${last_name[0]}`.toUpperCase()
}

export const formatAddress = (address?: CustomerAddressProps) => {
  if (!address) return 'No address'
  const parts = [address.city, address.state, address.zip].filter(Boolean)
  return parts.join(', ')
}
