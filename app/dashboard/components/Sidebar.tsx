'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Package, Plus, UserCircle, Users } from 'lucide-react'

import { ThemeSwitcher } from '@/components/theme-switcher'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import { createClient } from '@/lib/supabase/client'

import { useBusinessesState, useSetSelectedBusiness } from '../hooks/state'

import CreateBusinessDialog from './CreateBusinessDialog'

const businessActions = [
  {
    label: 'Services',
    path: 'services',
    icon: Package,
  },
  {
    label: 'Customers',
    path: 'customers',
    icon: Users,
  },
  {
    label: 'Employees',
    path: 'employees',
    icon: UserCircle,
  },
  {
    label: 'Jobs',
    path: 'jobs',
    icon: Package,
  },
]

const Sidebar = () => {
  const router = useRouter()
  const supabase = createClient()

  const [businesses, setBusinesses] = useBusinessesState()
  const setSelectedBusiness = useSetSelectedBusiness()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleOnActionSelect = useCallback(
    (business: string, action: string) => {
      setSelectedBusiness(business)
      router.push(`/dashboard/${action}`)
    },
    [router, setSelectedBusiness]
  )

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name')

      if (error) {
        console.error('Error fetching businesses:', error)
        return
      }

      if (!data) return

      setBusinesses(data)
      setSelectedBusiness(data[0].name)
    }

    fetchBusinesses()
  }, [setBusinesses, setSelectedBusiness, supabase])

  const businessMenuItems = useMemo(
    () =>
      businesses.map(({ id, name }) => (
        <Collapsible key={id} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <span>{name}</span>
                <ChevronDown className="transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {businessActions.map(({ label, path, icon: Icon }) => (
                  <SidebarMenuSubItem key={`${id}-${label}`}>
                    <SidebarMenuButton
                      onClick={() => handleOnActionSelect(name, path)}
                    >
                      <Icon size="lg" />
                      {label}
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      )),
    [businesses, handleOnActionSelect]
  )

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Businesses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <SidebarMenuButton>
                      <Plus />
                      <span>Create Business</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <CreateBusinessDialog />
                </Dialog>
              </SidebarMenuItem>
              {businessMenuItems}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ThemeSwitcher />
      </SidebarContent>
    </ShadcnSidebar>
  )
}

export default Sidebar
