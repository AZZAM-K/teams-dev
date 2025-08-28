import { AcceptButton, DeclineButton } from '@/components/invites/buttons'
import { fetchInvites } from '@/lib/data'
import clsx from 'clsx'

const InvitesList = async ({ type }: { type: string }) => {
  const invites = await fetchInvites(type)

  return (
    <div className='w-full py-8 px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {invites.length === 0 ? (
          <p className='text-black text-lg'>No invites {type}.</p>
        ) : (
          invites.map(invite => (
            <div
              key={invite.id}
              className='border rounded-xl shadow-sm bg-white p-4 flex flex-col justify-between'
            >
              <div className='mb-3'>
                <h2 className='text-lg font-semibold'>
                  Invitation to {invite.project.name}
                </h2>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>From:</span>{' '}
                  {type === 'sent' ? 'You' : invite.inviter.email}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>To:</span>{' '}
                  {type === 'received' ? 'You' : invite.receiver.email}
                </p>
                <p className='text-sm text-gray-500'>
                  <span className='font-medium'>Date:</span>{' '}
                  {new Date(invite.createdAt).toLocaleString()}
                </p>
              </div>

              {invite.status === 'PENDING' ? (
                type === 'received' ? (
                  <div className='flex gap-3'>
                    <AcceptButton id={invite.id} />
                    <DeclineButton id={invite.id} />
                  </div>
                ) : (
                  <p className='mt-2 text-lg font-semibold text-yellow-500'>
                    PENDING
                  </p>
                )
              ) : (
                <p
                  className={clsx('mt-2 text-sm font-semibold', {
                    'text-green-600': invite.status === 'ACCEPTED',
                    'text-red-600': invite.status === 'DECLINED',
                  })}
                >
                  {invite.status}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InvitesList
