import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { EmployeeProps } from '@/types/blocks'
import EmployeeForm from './EmployeeForm'

type EmployeeSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  employee: EmployeeProps
  onUpdateField: (field: keyof EmployeeProps, value: string) => void
  onSave: () => void
  saveButtonText?: string
}

const EmployeeSheet = ({
  isOpen,
  onOpenChange,
  title,
  description,
  employee,
  onUpdateField,
  onSave,
  saveButtonText = 'Save changes',
}: EmployeeSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <EmployeeForm {...employee} onUpdateField={onUpdateField} />

        <SheetFooter>
          <Button type="submit" onClick={onSave}>
            {saveButtonText}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EmployeeSheet
