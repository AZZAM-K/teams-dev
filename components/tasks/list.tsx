import clsx from 'clsx'
import { MessageCircle, PlusSquare, Users } from 'lucide-react'
import Link from 'next/link'
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

const List = ({
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
    <div className='flex flex-col gap-3'>
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
      {tasks.map(task => (
        <Link
          key={task.id}
          href={`/projects/${id}/tasks/${task.id}`}
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
            {task.assignee?.user.image ? (
              <Image
                src={task.assignee.user.image}
                alt={task.assignee.user.name || 'User'}
                width={28}
                height={28}
                className='rounded-full'
              />
            ) : (
              <Users size={20} className='text-gray-400' />
            )}
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

export default List
