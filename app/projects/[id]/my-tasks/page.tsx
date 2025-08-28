import { fetchMyTasks } from '@/lib/data'
import { getProgress } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: projectId } = await params
  const tasks = await fetchMyTasks(projectId)
  const taskStatus = {
    PENDING: 'To Do',
    IN_PROGRESS: 'On Progress',
    DONE: 'Done',
  }

  if (tasks.length === 0)
    return (
      <h1 className='text-gray-800 text-2xl font-bold'>
        No tasks are assigned to you
      </h1>
    )

  return (
    <div className='flex flex-col gap-3'>
      {tasks.map(task => (
        <Link
          key={task.id}
          href={`/projects/${projectId}/tasks/${task.id}`}
          className='bg-white border p-3 rounded-xl shadow hover:shadow-md transition-all overflow-hidden'
        >
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-gray-800 font-semibold text-lg'>
              {task.title}
            </h2>
            <span className='text-gray-400'>
              {getProgress(task.subtasks).toFixed(0)}%
            </span>
          </div>
          <p className='text-gray-500 text-sm line-clamp-2'>
            {task.description}
          </p>
          <div className='flex justify-between items-center mt-6'>
            <span
              className={clsx('font-semibold', {
                'text-indigo-600': task.status === 'PENDING',
                'text-yellow-500': task.status === 'IN_PROGRESS',
                'text-green-600': task.status === 'DONE',
              })}
            >
              {taskStatus[task.status]}
            </span>
            <div className='flex items-center gap-2'>
              <MessageCircle size={18} className='text-gray-400' />
              <span className='text-gray-400 text-sm'>
                {task.comments.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Page
