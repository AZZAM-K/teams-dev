import { auth } from '@/auth'
import ProjectForm from '@/components/projects/project-form'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Project',
  description: 'Create a new project in the application',
}

const Page = async () => {
  const session = await auth()
  if (!session) redirect('/signin')

  return (
    <div className='max-w-xl mx-auto py-12 px-4'>
      <h2 className='text-2xl font-bold mb-6'>Create a New Project</h2>
      <ProjectForm />
    </div>
  )
}

export default Page
