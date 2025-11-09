import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { EmployeeProps } from '@/types/blocks'
import { Briefcase, Mail, User } from 'lucide-react'

const POSITIONS = [
  'Pool Technician',
  'Senior Pool Technician',
  'Pool Maintenance Specialist',
  'Pool Cleaner',
  'Equipment Repair Technician',
  'Chemical Treatment Specialist',
  'Route Manager',
  'Customer Service Representative',
  'Sales Representative',
  'Operations Manager',
  'Office Administrator',
  'General Manager',
]

const DEPARTMENTS = [
  { value: 'none', label: 'Not specified' },
  { value: 'Pool Maintenance', label: 'Pool Maintenance' },
  { value: 'Pool Cleaning', label: 'Pool Cleaning' },
  { value: 'Equipment Repair', label: 'Equipment Repair' },
  { value: 'Chemical Treatment', label: 'Chemical Treatment' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Administration', label: 'Administration' },
]

type EmployeeFormProps = EmployeeProps & {
  onUpdateField: (field: keyof EmployeeProps, value: string) => void
}

const EmployeeForm = ({
  first_name,
  last_name,
  email,
  phone,
  position,
  department,
  hire_date,
  status,
  onUpdateField,
}: EmployeeFormProps) => (
  <div className="grid gap-6 p-4 max-h-full overflow-y-auto">
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

      <div className="grid grid-cols-2 gap-4">
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
        <Briefcase className="w-4 h-4" />
        Employment Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Select
            value={position}
            onValueChange={(value) => onUpdateField('position', value)}
          >
            <SelectTrigger id="position" className="w-full">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {POSITIONS.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={department || 'none'}
            onValueChange={(value) => onUpdateField('department', value)}
          >
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hire_date">Hire Date</Label>
          <Input
            id="hire_date"
            type="date"
            value={hire_date || ''}
            onChange={(e) => onUpdateField('hire_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Employment Status</Label>
          <Select
            value={status}
            onValueChange={(value) =>
              onUpdateField('status', value as 'active' | 'inactive')
            }
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
)

export default EmployeeForm
