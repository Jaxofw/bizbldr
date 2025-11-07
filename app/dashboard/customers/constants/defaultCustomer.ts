import { CustomerProps } from '@/types/blocks'

export const DEFAULT_CUSTOMER: Partial<CustomerProps> = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: {
    street_1: '',
    street_2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
  },
}
