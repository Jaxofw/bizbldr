import { Edit, Trash2, Users, User, Calendar, Eye } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { JobProps } from '@/types/blocks'

import { useServicesValue } from '../../services/hooks/state'
import { useCustomersValue } from '../../customers/hooks/state'
import { useEmployeesValue } from '../../employees/hooks/state'

import {
  formatDateToLocaleString,
  getPriorityColor,
  getStatusColor,
} from '../utils/misc'

type JobTableProps = {
  jobs: JobProps[]
  onViewClick: (job: JobProps) => void
  onEditClick: (job: JobProps) => void
  onDeleteClick: (job: JobProps) => void
}

const headers = [
  'Title',
  'Customer',
  'Employees Assigned',
  'Start Time',
  'End Time',
  'Priority',
  'Status',
  'Actions',
]

const JobTable = ({
  jobs,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: JobTableProps) => {
  const services = useServicesValue()
  const customers = useCustomersValue()
  const employees = useEmployeesValue()

  const getServiceById = (id: number) => services.find((s) => s.id === id)
  const getCustomerById = (id: number) => customers.find((c) => c.id === id)
  const getAssignedEmployees = (ids: number[]) =>
    employees.filter((e) => ids.includes(e.id))

  return jobs.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const service = getServiceById(Number(job.service_id))
          const customer = getCustomerById(Number(job.customer_id))
          const assignedEmployees = getAssignedEmployees(job.employee_ids)

          return (
            <TableRow key={job.id}>
              <TableCell>
                <div>{service?.name || 'No service found'}</div>
                {service?.description && (
                  <div className="text-gray-500 line-clamp-1">
                    {service.description}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {customer ? (
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="capitalize">
                      {customer.first_name} {customer.last_name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">No customer found</span>
                )}
              </TableCell>
              <TableCell>
                {assignedEmployees.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {assignedEmployees.slice(0, 2).map((employee, key) => (
                        <Badge key={key} variant="outline">
                          <span className="capitalize">
                            {employee.first_name} {employee.last_name}
                          </span>
                        </Badge>
                      ))}
                      {assignedEmployees.length > 2 && (
                        <Badge variant="outline">
                          +{assignedEmployees.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">No employees assigned</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>{formatDateToLocaleString(job.start_date)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>{formatDateToLocaleString(job.end_date)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getPriorityColor(job.priority)}>
                  <span className="capitalize">{job.priority}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(job.status)}>
                  <span className="capitalize">
                    {job.status.replace('_', ' ')}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewClick(job)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClick(job)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteClick(job)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  ) : (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>
        <EmptyTitle>No jobs found</EmptyTitle>
        <EmptyDescription>You have not added any jobs yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default JobTable
