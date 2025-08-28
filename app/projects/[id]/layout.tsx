import SideBar from '@/components/projects/sidebar'
import { isMember, isManager } from '@/lib/actions'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Dashboard',
  description: 'Manage your project dashboard',
}

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const member = await isMember(id)
  const manager = await isManager(id)

  if (!member && !manager) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold text-gray-500'>
          You are not a member of this project.
        </h1>
      </div>
    )
  }

  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50'>
      <div className='w-full flex-none md:w-fit md:mr-10 md:mt-1'>
        <SideBar projectId={id} isManager={manager} isMember={member} />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-8 md:pl-35'>
        {children}
      </div>
    </div>
  )
}

export default Layout
