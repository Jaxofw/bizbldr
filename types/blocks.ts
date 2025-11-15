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

// Employees

export type EmployeesProps = {
  employees: EmployeeProps[]
}

export type EmployeeProps = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  position: string
  department: string
  hire_date: string
  status: string
}

export type JobsProps = {
  jobs: JobProps[]
}

export type JobProps = {
  id: number
  service_id: number
  status: string
  priority: string
  customer_id: number
  employee_ids: number[]
  start_date: string
  end_date: string
  notes?: string
}
