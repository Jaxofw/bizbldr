import { Edit, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ServiceProps } from '@/types/blocks'

type ServiceTableProps = {
  services: ServiceProps[]
  onEditClick: (service: ServiceProps) => void
  onDeleteClick: (service: ServiceProps) => void
}

const headers = ['Name', 'Price', 'Duration', 'Status', 'Actions']

const ServiceTable = ({
  services,
  onEditClick,
  onDeleteClick,
}: ServiceTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {services.map((service) => (
        <TableRow key={service.id}>
          <TableCell>
            <div>
              <div>{service.name}</div>
              <div className="text-gray-500">{service.description}</div>
            </div>
          </TableCell>
          <TableCell>${service.price.toLocaleString()}</TableCell>
          <TableCell>{service.duration}</TableCell>
          <TableCell>
            <Badge
              variant={service.status === 'active' ? 'default' : 'secondary'}
            >
              {service.status}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditClick(service)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteClick(service)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default ServiceTable
