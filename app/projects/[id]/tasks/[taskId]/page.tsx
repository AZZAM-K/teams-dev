import { fetchTask } from '@/lib/data'
import clsx from 'clsx'
import { auth } from '@/auth'
import { isManager } from '@/lib/actions'
import DoneButton from '@/components/tasks/done-button'
import Image from 'next/image'
import CommentInput from '@/components/tasks/comment-input'

const Page = async ({
  params,
}: {
  params: Promise<{
    taskId: string
    id: string
  }>
}) => {
  const { taskId, id: projectId } = await params
  const task = await fetchTask(taskId)
  const session = await auth()
  const userId = session?.user?.id
  const manager = await isManager(projectId)

  return (
    <div>
      <h1 className='text-3xl font-bold'>{task?.title}</h1>
      <p className='text-gray-600 text-lg mt-3'>{task?.description}</p>
      <h2 className='text-xl font-semibold mt-4'>Subtasks</h2>
      <ul className='mt-2'>
        {task?.subtasks.map(subtask => (
          <li
            key={subtask.id}
            className='flex items-center justify-between p-3 rounded-xl shadow-sm border mb-3'
          >
            <span
              className={clsx(
                'text-base',
                subtask.status === 'DONE'
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              )}
            >
              {subtask.title}
            </span>

            {subtask.status === 'PENDING' &&
              (!task.assignee ||
                task.assignee?.user.id === userId ||
                manager) && (
                <DoneButton
                  id={subtask.id}
                  taskId={task.id}
                  projectId={projectId}
                />
              )}
          </li>
        ))}
      </ul>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Comments</h2>
        <div className='mt-3'>
          {task?.comments.length === 0 ? (
            <p className='text-lg text-gray-600'>no comments</p>
          ) : (
            task?.comments.map(comment => (
              <div
                key={comment.id}
                className='flex w-fit mb-3 items-center gap-2'
              >
                {comment.author.image && comment.author.name && (
                  <Image
                    src={comment.author.image}
                    alt={comment.author.name}
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                )}
                <div className='flex-1 py-1 px-3 rounded-lg bg-gray-50 border'>
                  <p className='text-lg text-gray-800'>{comment.content}</p>
                  <div className='mt-1 flex items-center gap-3 text-sm text-indigo-600'>
                    <span>
                      —{' '}
                      {comment.author.id === userId
                        ? 'You'
                        : comment.author.name}
                      ,
                    </span>{' '}
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <CommentInput taskId={taskId} projectId={projectId} />
    </div>
  )
}

export default Page
