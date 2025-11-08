'use client'

import { useEffect, useState } from 'react'

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

import { BusinessProps } from '@/types/business'

import { useSetSelectedBusiness } from '../hooks/state'

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
  }
]

const Sidebar = () => {
  const router = useRouter()
  const supabase = createClient()

  const setSelectedBusiness = useSetSelectedBusiness()

  const [businesses, setBusinesses] = useState<BusinessProps[]>([])

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name')

      if (error) {
        console.error('Error fetching businesses:', error)
      } else {
        setBusinesses(data)
        setSelectedBusiness(data[0].name)
      }
    }

    fetchBusinesses()
  }, [supabase, setSelectedBusiness])

  const handleOnActionSelect = (business: string, action: string) => {
    setSelectedBusiness(business)
    router.push(`/dashboard/${action}`)
  }

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Businesses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <SidebarMenuButton>
                      <Plus />
                      <span>Create Business</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <CreateBusinessDialog />
                </Dialog>
              </SidebarMenuItem>
              {businesses.map(({ id, name }) => (
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ThemeSwitcher />
      </SidebarContent>
    </ShadcnSidebar>
  )
}

export default Sidebar
