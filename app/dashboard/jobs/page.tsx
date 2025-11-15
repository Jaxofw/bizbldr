'use client'

import { useState } from 'react'

import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'

import { JobProps } from '@/types/blocks'

import { useSelectedBusinessValue } from '../hooks/state'

import { useJobsValue } from './hooks/state'
import JobTable from './components/JobTable'
import CreateJobSheet from './components/CreateJobSheet'
import EditJobSheet from './components/EditJobSheet'
import DeleteJobDialog from './components/DeleteJobDialog'

const Page = () => {
  const selectedBusiness = useSelectedBusinessValue()
  const jobs = useJobsValue()

  const [search, setSearch] = useState('')
  const [isCreatingJob, setIsCreatingJob] = useState(false)
  const [editingJob, setEditingJob] = useState<
    { job: JobProps; readOnly: boolean } | null
  >(null)
  const [jobDeleting, setJobDeleting] = useState<JobProps | null>(null)

  const handleCreateJob = () => {
    setIsCreatingJob(true)
  }

  const handleViewClick = (job: JobProps) => {
    setEditingJob({ job, readOnly: true })
  }

  const handleEditClick = (job: JobProps) => {
    setEditingJob({ job, readOnly: false })
  }

  const handleDeleteClick = (job: JobProps) => {
    setJobDeleting(job)
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Job Overview - {selectedBusiness}</CardTitle>
                <CardDescription>
                  Manage and track all your job postings for {selectedBusiness}
                </CardDescription>
              </div>
              <Button onClick={handleCreateJob}>
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <JobTable
              jobs={jobs}
              onViewClick={handleViewClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </CardContent>
        </Card>
      </div>

      <CreateJobSheet isOpen={isCreatingJob} onOpenChange={setIsCreatingJob} />

      {editingJob && (
        <EditJobSheet
          isOpen={true}
          onOpenChange={() => setEditingJob(null)}
          job={editingJob.job}
          readOnly={editingJob.readOnly}
        />
      )}

      {jobDeleting && (
        <Dialog
          open={true}
          onOpenChange={(open) => !open && setJobDeleting(null)}
        >
          <DeleteJobDialog
            job={jobDeleting}
            onClose={() => setJobDeleting(null)}
          />
        </Dialog>
      )}
    </>
  )
}

export default Page
