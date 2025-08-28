import TaskForm from '@/components/tasks/form'
import { isManager } from '@/lib/actions'
import { fetchMembers } from '@/lib/data'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const manager = await isManager(id)

  if (!manager) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold text-black'>
          You are not authorized to create tasks in this project.
        </h1>
      </div>
    )
  }
  const members = await fetchMembers(id)

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6 text-black'>Create a New Task</h2>
      <TaskForm members={members} projectId={id} />
    </div>
  )
}

export default Page
