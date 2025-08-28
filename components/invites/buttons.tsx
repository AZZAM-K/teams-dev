import { declineInvite, acceptInvite } from '@/lib/actions'

export const AcceptButton = ({ id }: { id: string }) => {
  const accept = acceptInvite.bind(null, id)

  return (
    <form action={accept}>
      <button
        className='flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition'
        type='submit'
      >
        Accept
      </button>
    </form>
  )
}

export const DeclineButton = ({ id }: { id: string }) => {
  const decline = declineInvite.bind(null, id)

  return (
    <form action={decline}>
      <button className='flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'>
        Decline
      </button>
    </form>
  )
}
