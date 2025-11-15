import { Label } from '@/components/ui/label'
import { ServiceProps } from '@/types/blocks'

type ServiceInfoCardProps = {
  service: ServiceProps
}

const ServiceInfoCard = ({ service }: ServiceInfoCardProps) => (
  <div className="p-3 bg-background border border-input rounded-md space-y-2">
    <div>
      <Label>Service Name</Label>
      <p className="text-foreground">{service.name}</p>
    </div>
    <div>
      <Label>Description</Label>
      <p className="text-muted-foreground">{service.description}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Price</Label>
        <p className="text-foreground">${service.price.toLocaleString()}</p>
      </div>
      <div>
        <Label>Duration</Label>
        <p className="text-foreground">{service.duration}</p>
      </div>
    </div>
  </div>
)

export default ServiceInfoCard
