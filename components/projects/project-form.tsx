'use client'

import { useActionState } from 'react'
import { createProject } from '@/lib/actions'

const ProjectForm = () => {
  const [state, formAction, isPending] = useActionState(createProject, null)
  return (
    <form
      action={formAction}
      className='bg-white rounded-lg shadow p-6 flex flex-col gap-4 border-2 border-indigo-600'
    >
      <div>
        <label htmlFor='name' className='block font-semibold mb-2'>
          Project Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          className='w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
        />
      </div>
      <div>
        <label htmlFor='description' className='block font-semibold mb-2'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          rows={4}
          required
          className='w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
        />
      </div>
      <button
        type='submit'
        className='px-6 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 cursor-pointer'
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  )
}

export default ProjectForm
