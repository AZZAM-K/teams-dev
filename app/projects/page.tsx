import { auth } from '@/auth'
import ProjectsList from '@/components/projects/projects-list'
import TypeSwitcher from '@/components/type-switcher'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects effectively',
}

const ProjectsPage = async (props: {
  searchParams?: Promise<{
    type?: string
  }>
}) => {
  const session = auth()
  if (!session) redirect('/signin')

  const searchParams = await props.searchParams
  const type = searchParams?.type || 'all'

  return (
    <div className='flex flex-col px-4 py-6 gap-6'>
      <div className='flex w-full justify-center'>
        <TypeSwitcher
          options={[
            { label: 'All', value: 'all' },
            { label: 'Owned', value: 'owned' },
            { label: 'Contributed', value: 'contributed' },
          ]}
        />
      </div>
      <ProjectsList type={type} />
    </div>
  )
}

export default ProjectsPage
