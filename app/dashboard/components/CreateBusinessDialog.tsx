'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createClient } from '@/lib/supabase/client'

const CreateBusinessDialog = () => {
  const supabase = createClient()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleOnCreateClick = async () => {
    setLoading(true)

    const { error } = await supabase.from('businesses').insert({ name })

    if (error) {
      console.error('Error creating business:', error.message)
    } else {
      setName('')
    }

    setLoading(false)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Business</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-y-2.5">
        <Label htmlFor="business-name">Name</Label>
        <Input
          id="business-name"
          placeholder="Acme Inc."
          value={name}
          onChange={handleOnNameChange}
        />
      </div>
      <Button
        variant="secondary"
        onClick={handleOnCreateClick}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Business'}
      </Button>
    </DialogContent>
  )
}

export default CreateBusinessDialog
