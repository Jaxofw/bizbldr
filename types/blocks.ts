// Services

export type ServicesProps = {
  services: ServiceProps[]
}

export type ServiceProps = {
  id: number
  name: string
  price: number
  duration: string
  status: string
  description: string
}

export type ServiceCreateProps = ServiceProps & {
  business: string
}

// Customers

export type CustomersProps = {
  customers: CustomerProps[]
}

export type CustomerProps = {
  id: number
  first_name: string
  last_name: string
  email?: string
  phone?: string
  address?: CustomerAddressProps
}

export type CustomerAddressProps = {
  street_1: string
  street_2?: string
  city: string
  state: string
  zip: string
  country: string
}
