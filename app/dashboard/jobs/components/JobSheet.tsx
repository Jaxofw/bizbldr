import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { JobProps } from '@/types/blocks'

import JobForm from './JobForm'

type JobSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  job: JobProps
  onUpdateField: (field: keyof JobProps, value: string) => void
  onUpdateEmployees: (employeeId: number) => void
  onSave: () => void
  saveButtonText: string
  readOnly?: boolean
}

const JobSheet = ({
  isOpen,
  onOpenChange,
  title,
  description,
  job,
  onUpdateField,
  onUpdateEmployees,
  onSave,
  saveButtonText,
  readOnly,
}: JobSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <JobForm
          {...job}
          onUpdateField={onUpdateField}
          onUpdateEmployees={onUpdateEmployees}
          readOnly={readOnly}
        />

        <SheetFooter>
          {!readOnly && <Button onClick={onSave}>{saveButtonText}</Button>}
          <Button variant={readOnly ? 'default' : 'outline'} onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default JobSheet
