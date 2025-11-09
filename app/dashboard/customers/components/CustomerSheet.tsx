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
import { CustomerProps, CustomerAddressProps } from '@/types/blocks'
import CustomerForm from './CustomerForm'

type CustomerSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  customer: CustomerProps
  onUpdateField: (field: keyof CustomerProps, value: string) => void
  onUpdateAddress: (field: keyof CustomerAddressProps, value: string) => void
  onSave: () => void
  saveButtonText?: string
}

const CustomerSheet = ({
  isOpen,
  onOpenChange,
  title,
  description,
  customer,
  onUpdateField,
  onUpdateAddress,
  onSave,
  saveButtonText = 'Save changes',
}: CustomerSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <CustomerForm
          {...customer}
          onUpdateField={onUpdateField}
          onUpdateAddress={onUpdateAddress}
        />

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

export default CustomerSheet
