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
