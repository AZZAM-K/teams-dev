'use client'

import { useActionState } from 'react'
import { deleteProject } from '@/lib/actions'

const DeleteProject = ({ projectId }: { projectId: string }) => {
  const [state, formAction, isPending] = useActionState(
    deleteProject.bind(null, projectId),
    { error: false }
  )
  return (
    <form action={formAction}>
      <h2 className='text-lg font-semibold text-gray-800 mb-2'>
        Enter project name to confirm deletion
      </h2>
      <div className='flex gap-2 flex-col md:flex-row'>
        <input
          type='text'
          name='name'
          required
          disabled={isPending}
          className='border p-2 rounded mr-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
        />
        <button
          type='submit'
          disabled={isPending}
          className='bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded disabled:opacity-50 cursor-pointer'
        >
          {isPending ? 'Deleting...' : 'Delete Project'}
        </button>
      </div>
      {state.error && <p className='mt-3 text-red-500'>Name is inCorrect</p>}
    </form>
  )
}

export default DeleteProject
