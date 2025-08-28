import { fetchManager, fetchMembers } from '@/lib/data'
import { isManager } from '@/lib/actions'
import Image from 'next/image'
import { DeleteMember } from '@/components/projects/buttons'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const members = await fetchMembers(id)
  const manager = await fetchManager(id)
  const canDeleteMember = await isManager(id)

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6 text-black'>Project Members</h2>
      <div className='space-y-4'>
        {manager?.owner.image && manager?.owner.name && (
          <div className='flex-col gap-5 p-2 border rounded-lg bg-white'>
            <div className='flex items-center space-x-4'>
              <Image
                src={manager?.owner?.image}
                alt={manager?.owner.name}
                width={40}
                height={40}
                className='rounded-full'
              />
              <p className='text-lg font-semibold text-black'>
                {manager.owner.name}
              </p>
            </div>
            <div>
              <p>{manager.owner.email}</p>
              <p className='text-sm text-indigo-600 font-medium'>Manager</p>
            </div>
          </div>
        )}
        {members.map(member => (
          <div
            key={member.id}
            className='flex flex-col sm:flex-row sm:items-center gap-4 justify-between p-2 border rounded-lg bg-white'
          >
            <div className='flex-col gap-5'>
              <div className='flex items-center space-x-4'>
                {member?.user.image && member?.user.name && (
                  <Image
                    src={member.user.image}
                    alt={member.user.name}
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                )}
                <p className='text-lg font-semibold text-black'>
                  {member.user.name}
                </p>
              </div>
              <div>
                <p>{member.user.email}</p>
                <p className='text-sm text-gray-600'>Member</p>
              </div>
            </div>
            {canDeleteMember && (
              <DeleteMember projectId={id} memberId={member.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
