import { Briefcase, Edit, Mail, Phone, Trash2, Users } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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

import { getInitials } from '@/lib/formatting'
import { EmployeeProps } from '@/types/blocks'

import { Badge } from '@/components/ui/badge'

type EmployeeTableProps = {
  employees: EmployeeProps[]
  onEditClick: (employee: EmployeeProps) => void
  onDeleteClick: (employee: EmployeeProps) => void
}

const headers = [
  'Employee',
  'Position',
  'Department',
  'Contact',
  'Status',
  'Actions',
]

const EmployeeTable = ({ employees, onEditClick, onDeleteClick }: EmployeeTableProps) =>
  employees.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee, key) => (
          <TableRow key={key}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(employee.first_name, employee.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {employee.first_name} {employee.last_name}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Briefcase className="w-3 h-3 text-muted-foreground" />
                <span>{employee.position}</span>
              </div>
            </TableCell>
            <TableCell>
              {employee.department ? (
                <Badge>{employee.department}</Badge>
              ) : (
                <span className="text-muted-foreground">Not specified</span>
              )}
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {employee.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span className="text-foreground">{employee.email}</span>
                  </div>
                )}
                {employee.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span className="text-foreground">{employee.phone}</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={employee.status === 'active' ? 'default' : 'secondary'}
              >
                {employee.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditClick(employee)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteClick(employee)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>
        <EmptyTitle>No employees found</EmptyTitle>
        <EmptyDescription>
          You have not added any employees yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

export default EmployeeTable
