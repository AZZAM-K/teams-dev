import { isManager } from '@/lib/actions'
import { fetchProjectInfo } from '@/lib/data'
import EditForm from '@/components/projects/edit-form'
import DeleteProject from '@/components/projects/delete-project'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: projectId } = await params

  const manager = await isManager(projectId)
  if (!manager)
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold text-black'>
          You are not authorized to see this page.
        </h1>
      </div>
    )

  const { project } = await fetchProjectInfo(projectId)
  if (!project) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold text-black'>
          Error when getting settings.
        </h1>
      </div>
    )
  }
  return (
    <div>
      <EditForm project={project} />
      <h1 className='mt-5 mb-4 text-red-500 text-2xl font-bold'>
        Danger Zone:
      </h1>
      <DeleteProject projectId={projectId} />
    </div>
  )
}

export default Page
