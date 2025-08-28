'use client'

import { sendInvite } from '@/lib/actions'
import { useActionState } from 'react'

const InviteForm = ({ projectId }: { projectId: string }) => {
  const [state, formAction, isPending] = useActionState(
    sendInvite.bind(null, projectId),
    { message: '', success: false }
  )
  return (
    <form action={formAction}>
      <div className='flex gap-2 flex-col md:flex-row'>
        <input
          type='email'
          name='email'
          placeholder='Email address'
          required
          disabled={isPending || state.success}
          className='border p-2 rounded mr-2 focus:outline-none focus:border-none focus:ring focus:ring-indigo-600'
        />
        <button
          type='submit'
          disabled={isPending || state.success}
          className='bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded disabled:opacity-50 cursor-pointer'
        >
          {isPending ? 'Sending...' : state.success ? 'Sent' : 'Send Invite'}
        </button>
      </div>
      {state.message && (
        <p
          className={`mt-2 ${
            state.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}

export default InviteForm
