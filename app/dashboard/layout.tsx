import { QueryClient } from '@tanstack/query-core'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import Sidebar from './components/Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
})

const Layout = ({ children }: LayoutProps) => (
  <SidebarProvider>
    <Sidebar />
    <main className="w-full h-full">
      <SidebarTrigger />
      <div className="p-8">{children}</div>
    </main>
  </SidebarProvider>
)

export default Layout
