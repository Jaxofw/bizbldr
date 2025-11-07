import { Edit, Mail, MapPin, Phone, Trash2, Users } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CustomerProps } from '@/types/blocks'

import { formatAddress, getInitials } from '../utils/misc'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

type CustomerTableProps = {
  customers: CustomerProps[]
  onEditClick: (customer: CustomerProps) => void
  onDeleteClick: (customer: CustomerProps) => void
}

const headers = ['Customer', 'Email', 'Phone', 'Location', 'Actions']

const CustomerTable = ({
  customers,
  onEditClick,
  onDeleteClick,
}: CustomerTableProps) =>
  customers.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, key) => (
          <TableRow key={key}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(customer.first_name, customer.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="capitalize">
                  {customer.first_name} {customer.last_name}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {customer.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
              ) : (
                <span className="text-gray-400">No email</span>
              )}
            </TableCell>
            <TableCell>
              {customer.phone ? (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              ) : (
                <span className="text-gray-400">No phone</span>
              )}
            </TableCell>
            <TableCell>
              {customer.address ? (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{formatAddress(customer.address)}</span>
                </div>
              ) : (
                <span className="text-gray-400">No address</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditClick(customer)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteClick(customer)}
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
        <EmptyTitle>No customers found</EmptyTitle>
        <EmptyDescription>
          You have not added any customers yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

export default CustomerTable
