'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ServiceProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../hooks/state'

import CreateServiceDialog from './components/CreateServiceDialog'
import DeleteServiceDialog from './components/DeleteServiceDialog'
import EditServiceDialog from './components/EditServiceDialog'
import ServiceTable from './components/ServiceTable'

import {
  useIsCreatingServiceState,
  useServiceEditingValue,
  useServicesValue,
  useSetServiceEditing,
} from './hooks/state'

const Page = () => {
  const router = useRouter()

  const selectedBusiness = useSelectedBusinessValue()
  const services = useServicesValue()

  const [isCreatingService, setIsCreatingService] = useIsCreatingServiceState()
  const [isEditingService, setIsEditingService] = useState(false)
  const [isDeletingService, setIsDeletingService] = useState(false)

  const serviceEditing = useServiceEditingValue()
  const setServiceEditing = useSetServiceEditing()

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!selectedBusiness) return router.push('/dashboard')
  }, [selectedBusiness, router])

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateService = () => {
    setServiceEditing(null)
    setIsCreatingService(true)
  }

  const handleEditService = (service: ServiceProps) => {
    setServiceEditing(service)
    setIsEditingService(true)
  }

  const handleDeleteService = (service: ServiceProps) => {
    setServiceEditing(service)
    setIsDeletingService(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Services Overview - {selectedBusiness}</CardTitle>
              <CardDescription>
                Manage and track all your service offerings for{' '}
                {selectedBusiness}
              </CardDescription>
            </div>
            <Button onClick={handleCreateService}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ServiceTable
            services={filteredServices}
            onEditClick={handleEditService}
            onDeleteClick={handleDeleteService}
          />
        </CardContent>
      </Card>

      <Dialog open={isCreatingService} onOpenChange={setIsCreatingService}>
        {isCreatingService && (
          <CreateServiceDialog setIsDialogOpen={setIsCreatingService} />
        )}
      </Dialog>

      <Dialog open={isEditingService} onOpenChange={setIsEditingService}>
        {serviceEditing && (
          <EditServiceDialog setIsDialogOpen={setIsEditingService} />
        )}
      </Dialog>

      <Dialog open={isDeletingService} onOpenChange={setIsDeletingService}>
        {serviceEditing && (
          <DeleteServiceDialog setIsDialogOpen={setIsDeletingService} />
        )}
      </Dialog>
    </div>
  )
}

export default Page
