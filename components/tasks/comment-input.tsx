'use client'

import { addComment } from '@/lib/actions'
import { useActionState } from 'react'

const CommentInput = ({
  taskId,
  projectId,
}: {
  taskId: string
  projectId: string
}) => {
  const addCommentAction = addComment.bind(null, taskId, projectId)
  const [state, formAction, isPending] = useActionState(addCommentAction, null)

  return (
    <form action={formAction} className='flex gap-2 items-center mt-4'>
      <input
        type='text'
        name='content'
        required
        className='border rounded-md px-3 py-2 text-black'
      />
      <button
        type='submit'
        disabled={isPending}
        className='bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md disabled:opacity-50 cursor-pointer'
      >
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default CommentInput
