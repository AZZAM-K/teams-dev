'use client'
import { editProject } from '@/lib/actions'
import { useActionState } from 'react'

const EditForm = ({
  project,
}: {
  project: { name: string; id: string; description: string | null }
}) => {
  const [state, formAction, isPending] = useActionState(
    editProject.bind(null, project.id),
    null
  )
  return (
    <form action={formAction}>
      <div className='mb-3'>
        <label className='block text-sm font-medium'>Title</label>
        <input
          name='title'
          required
          className='mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
          defaultValue={project.name}
        />
      </div>

      <div className='mb-3'>
        <label className='block text-sm font-medium'>Description</label>
        <textarea
          name='description'
          rows={3}
          required
          className='mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
          defaultValue={project.description || ''}
        />
      </div>
      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md disabled:opacity-50 mt-4 cursor-pointer'
      >
        {isPending ? 'Editing...' : 'Edit project'}
      </button>
    </form>
  )
}

export default EditForm
