'use client'

import { useActionState, useState } from 'react'
import { createTask } from '@/lib/actions'
import { X } from 'lucide-react'

type Member = {
  id: string
  user: {
    name: string | null
    image: string | null
    email: string | null
  }
}

const TaskForm = ({
  members,
  projectId,
}: {
  members: Member[]
  projectId: string
}) => {
  const [state, formAction, isPending] = useActionState(
    createTask.bind(null, projectId),
    null
  )

  const [subtasks, setSubtasks] = useState([''])

  const addSubtask = () => setSubtasks([...subtasks, ''])
  const removeSubtask = (i: number) =>
    setSubtasks(subtasks.filter((_, idx) => idx !== i))
  const handleSubtaskChange = (i: number, val: string) => {
    const copy = [...subtasks]
    copy[i] = val
    setSubtasks(copy)
  }

  return (
    <form action={formAction}>
      <div className='mb-3'>
        <label className='block text-sm font-medium'>Title</label>
        <input
          name='title'
          required
          className='mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
        />
      </div>

      <div className='mb-3'>
        <label className='block text-sm font-medium'>Description</label>
        <textarea
          name='description'
          rows={3}
          required
          className='mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
        />
      </div>

      {members.length > 0 && (
        <div>
          <label className='block text-sm font-medium'>Assignee</label>
          <select
            name='assignee'
            className='mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-none focus:ring-indigo-600'
          >
            <option value=''>Unassigned</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>
                {m.user.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='mb-3'>
        <label className='block text-sm font-medium'>Subtasks</label>
        <div className='space-y-2'>
          {subtasks.map((s, idx) => (
            <div key={idx} className='flex gap-2'>
              <input
                type='text'
                name='subtasks'
                value={s}
                required
                onChange={e => handleSubtaskChange(idx, e.target.value)}
                className='flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
              />
              {subtasks.length > 1 && (
                <button
                  onClick={() => removeSubtask(idx)}
                  className='px-2 text-red-600'
                >
                  <X />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type='button'
          onClick={addSubtask}
          className='mt-2 text-sm text-indigo-600 hover:underline'
        >
          + Add subtask
        </button>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md disabled:opacity-50 mt-4 cursor-pointer'
      >
        {isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  )
}

export default TaskForm
