import { Briefcase, Calendar, User, Users, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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
import { Textarea } from '@/components/ui/textarea'

import { JobProps } from '@/types/blocks'

import { useServicesValue } from '../../services/hooks/state'
import { useCustomersValue } from '../../customers/hooks/state'
import { useEmployeesValue } from '../../employees/hooks/state'

import { STATUSES, PRIORITIES } from '../constants/jobOptions'

import ServiceInfoCard from './ServiceInfoCard'
import CustomerInfoCard from './CustomerInfoCard'

type JobFormProps = JobProps & {
  onUpdateField: (field: keyof JobProps, value: string) => void
  onUpdateEmployees: (employeeId: number) => void
  readOnly?: boolean
}

const JobForm = ({
  service_id,
  status,
  priority,
  customer_id,
  employee_ids,
  start_date,
  end_date,
  notes,
  onUpdateField,
  onUpdateEmployees,
  readOnly,
}: JobFormProps) => {
  const services = useServicesValue()
  const customers = useCustomersValue()
  const employees = useEmployeesValue()

  const service = services.find(({ id }) => id === Number(service_id))
  const customer = customers.find(({ id }) => id === Number(customer_id))
  const relatedEmployees = employees.filter(({ id }) =>
    employee_ids.includes(id)
  )

  return (
    <div className="grid gap-5 p-4 max-h-full overflow-y-auto">
      <div className="space-y-4">
        <h3 className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Service Selection
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Select Service *</Label>
            <Select
              value={service_id?.toString() || 'none'}
              onValueChange={(value) => onUpdateField('service_id', value)}
              disabled={readOnly}
            >
              <SelectTrigger id="service" className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No service selected</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name} - ${service.price.toLocaleString()} (
                    {service.duration})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {service && <ServiceInfoCard service={service} />}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status || STATUSES[0].value}
                onValueChange={(value) => onUpdateField('status', value)}
                disabled={readOnly}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority || PRIORITIES[0].value}
                onValueChange={(value) => onUpdateField('priority', value)}
                disabled={readOnly}
              >
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Customer
        </h3>

        <div className="space-y-2">
          <Label htmlFor="customer">Assigned Customer</Label>
          <Select
            value={customer_id?.toString() || 'none'}
            onValueChange={(value) => onUpdateField('customer_id', value)}
            disabled={readOnly}
          >
            <SelectTrigger id="customer" className="w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No customer assigned</SelectItem>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  {customer.first_name} {customer.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {customer && <CustomerInfoCard customer={customer} />}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Assigned Employees
        </h3>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {relatedEmployees.length > 0 ? (
              relatedEmployees.map(({ id, first_name, last_name }, key) => (
                <Badge key={key} variant="secondary" className="gap-1">
                  <span className="capitalize">
                    {`${first_name} ${last_name}` || `Employee ${id}`}
                  </span>
                  {!readOnly && (
                    <button
                      type="button"
                      className="ml-1 hover:bg-gray-600 rounded-full p-0.5"
                      onClick={() => onUpdateEmployees(Number(id))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No employees assigned</p>
            )}
          </div>

          <Select
            onValueChange={(value) => onUpdateEmployees(Number(value))}
            disabled={readOnly}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Add an employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map(({ id, first_name, last_name }) => (
                <SelectItem key={id} value={id.toString()}>
                  {first_name} {last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Timeline
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Time</Label>
            <Input
              id="start_date"
              type="datetime-local"
              value={start_date || ''}
              onChange={(e) => onUpdateField('start_date', e.target.value)}
              disabled={readOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date">End Time</Label>
            <Input
              id="end_date"
              type="datetime-local"
              value={end_date || ''}
              onChange={(e) => onUpdateField('end_date', e.target.value)}
              disabled={readOnly}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={notes || ''}
          placeholder="Add any additional notes or comments"
          rows={4}
          onChange={(e) => onUpdateField('notes', e.target.value)}
          disabled={readOnly}
        />
      </div>
    </div>
  )
}

export default JobForm
