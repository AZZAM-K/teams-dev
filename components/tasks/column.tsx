import clsx from 'clsx'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link'
import { MessageCircle, Users } from 'lucide-react'
import Image from 'next/image'
import { getProgress } from '@/lib/utils'

type Task = {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string | null
  projectId: string
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE'
  title: string
  assigneeId: string | null
  assignee: {
    user: {
      image: string | null
      name: string | null
    }
  } | null
  comments: {
    id: string
  }[]
  subtasks: {
    status: 'PENDING' | 'DONE'
  }[]
}

const Column = ({
  tasks,
  title,
  canAdd,
  id,
}: {
  tasks: Task[]
  title: string
  canAdd?: boolean
  id: string
}) => {
  return (
    <div className='bg-gray-300 p-5 rounded-xl'>
      <div
        className={clsx('flex items-center justify-between border-b-4 pb-5', {
          'border-indigo-600': title === 'To Do',
          'border-yellow-500': title === 'On Progress',
          'border-green-600': title === 'Done',
        })}
      >
        <div className='flex gap-3 items-center'>
          <div
            className={clsx('w-2 h-2 rounded-full', {
              'bg-indigo-600': title === 'To Do',
              'bg-yellow-500': title === 'On Progress',
              'bg-green-600': title === 'Done',
            })}
          ></div>
          <span className='text-gray-800 font-semibold'>{title}</span>
          <div className='h-3 w-3 rounded-full flex justify-center p-3 items-center text-black bg-gray-400 text-sm'>
            {tasks.length}
          </div>
        </div>
        {canAdd && (
          <Link href={`/projects/${id}/tasks/create`}>
            <PlusSquare
              className='text-indigo-600 hover:text-indigo-700 cursor-pointer'
              size={25}
            />
          </Link>
        )}
      </div>
      <div className='flex flex-col gap-3 mt-6'>
        {tasks.map(task => (
          <Link
            key={task.id}
            href={`/projects/${id}/tasks/${task.id}`}
            className='bg-white p-5 rounded-xl shadow hover:shadow-md transition-all overflow-hidden'
          >
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-gray-800 font-semibold text-xl'>
                {task.title}
              </h2>
              <span className='text-gray-400'>
                {getProgress(task.subtasks).toFixed(0)}%
              </span>
            </div>
            <p className='text-gray-500'>{task.description}</p>
            <div className='flex justify-between items-center mt-8'>
              {task.assignee?.user.image && task.assignee?.user.name ? (
                <Image
                  src={task?.assignee?.user?.image}
                  alt={task.assignee.user.name}
                  width={30}
                  height={30}
                  className='rounded-full'
                />
              ) : (
                <Users size={20} className='text-gray-400' />
              )}
              <div className='flex items-center gap-2'>
                <MessageCircle size={20} className='text-gray-400' />
                <span className='text-gray-400'>{task.comments.length}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Column
