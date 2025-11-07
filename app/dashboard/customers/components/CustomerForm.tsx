import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CustomerAddressProps, CustomerProps } from '@/types/blocks'
import { Mail, MapPin, User } from 'lucide-react'

type CustomerFormProps = CustomerProps & {
  onUpdateField: (field: keyof CustomerProps, value: string) => void
  onUpdateAddress: (field: keyof CustomerAddressProps, value: string) => void
}

const CustomerForm = ({
  first_name,
  last_name,
  email,
  phone,
  address,
  onUpdateField,
  onUpdateAddress,
}: CustomerFormProps) => (
  <div className="grid gap-6 p-4">
    <div className="space-y-4">
      <h3 className="flex items-center gap-2">
        <User className="w-4 h-4" />
        Personal Information
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={first_name}
            onChange={(e) => onUpdateField('first_name', e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={last_name}
            onChange={(e) => onUpdateField('last_name', e.target.value)}
            placeholder="Enter last name"
          />
        </div>
      </div>
    </div>

    <Separator />

    <div className="space-y-4">
      <h3 className="flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Contact Information
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email || ''}
            onChange={(e) => onUpdateField('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone || ''}
            onChange={(e) => onUpdateField('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
    </div>

    <Separator />

    <div className="space-y-4">
      <h3 className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Address
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street_1">Street Address</Label>
          <Input
            id="street_1"
            value={address?.street_1 || ''}
            onChange={(e) => onUpdateAddress('street_1', e.target.value)}
            placeholder="123 Main Street"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street_2">Street Address 2 (Optional)</Label>
          <Input
            id="street_2"
            value={address?.street_2 || ''}
            onChange={(e) => onUpdateAddress('street_2', e.target.value)}
            placeholder="Apt, Suite, Floor, etc."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={address?.city || ''}
              onChange={(e) => onUpdateAddress('city', e.target.value)}
              placeholder="City"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={address?.state || ''}
              onChange={(e) => onUpdateAddress('state', e.target.value)}
              placeholder="State"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              value={address?.zip || ''}
              onChange={(e) => onUpdateAddress('zip', e.target.value)}
              placeholder="12345"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={address?.country || ''}
              onChange={(e) => onUpdateAddress('country', e.target.value)}
              placeholder="USA"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CustomerForm
