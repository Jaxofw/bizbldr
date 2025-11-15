import { Label } from '@/components/ui/label'
import { CustomerProps } from '@/types/blocks'

type CustomerInfoCardProps = {
  customer: CustomerProps
}

const CustomerInfoCard = ({ customer }: CustomerInfoCardProps) => (
  <div className="p-3 bg-background border border-input rounded-md space-y-2">
    <div>
      <Label>Customer Name</Label>
      <p className="text-foreground">
        {customer.first_name} {customer.last_name}
      </p>
    </div>

    {(customer.email || customer.phone) && (
      <div className="grid grid-cols-2 gap-4">
        {customer.email && (
          <div>
            <Label>Email</Label>
            <p className="text-foreground">{customer.email}</p>
          </div>
        )}
        {customer.phone && (
          <div>
            <Label>Phone</Label>
            <p className="text-foreground">{customer.phone}</p>
          </div>
        )}
      </div>
    )}

    {customer.address && (
      <div>
        <Label>Address</Label>
        <div className="text-foreground">
          <p>{customer.address.street_1}</p>
          {customer.address.street_2 && <p>{customer.address.street_2}</p>}
          <p>
            {customer.address.city}, {customer.address.state}{' '}
            {customer.address.zip}
          </p>
          <p>{customer.address.country}</p>
        </div>
      </div>
    )}
  </div>
)

export default CustomerInfoCard
