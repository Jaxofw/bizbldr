'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createClient } from '@/lib/supabase/client'

import { useSetBusinesses } from '../hooks/state'

const CreateBusinessDialog = () => {
  const setBusinesses = useSetBusinesses()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    []
  )

  const handleOnCreateClick = useCallback(async () => {
    const supabase = createClient()

    const trimmedName = name.trim()

    if (!trimmedName) {
      toast.error('Business name is required')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert({ name: trimmedName })
        .select()
        .single()

      if (error) throw error

      setBusinesses((prev) => [...prev, { id: data.id, name: trimmedName }])
      toast.success('Business created successfully')
    } catch (error) {
      console.error('Error creating business:', error)
      toast.error('Failed to create business')
    } finally {
      setLoading(false)
    }
  }, [name, setBusinesses])

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
          onKeyDown={(e) =>
            e.key === 'Enter' && !loading && handleOnCreateClick()
          }
        />
      </div>
      <Button
        variant="secondary"
        onClick={handleOnCreateClick}
        disabled={loading || !name.trim()}
      >
        {loading ? 'Creating...' : 'Create Business'}
      </Button>
    </DialogContent>
  )
}

export default CreateBusinessDialog
