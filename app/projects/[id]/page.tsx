import Tasks from '@/components/projects/tasks'
import ProjectHeader from '@/components/projects/project-header'

import { fetchProjectInfo } from '@/lib/data'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const { project, membersNb } = await fetchProjectInfo(id)
  if (!project) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold text-gray-500'>Project not found.</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col flex-1 mx-auto py-3 pr-2'>
      <ProjectHeader project={project} membersNb={membersNb} />
      <Tasks id={id} />
    </div>
  )
}

export default Page
