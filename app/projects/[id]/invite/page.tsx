import { isManager } from '@/lib/actions'
import InviteForm from '@/components/invites/invite-form'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const manager = await isManager(id)

  if (!manager)
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold text-black'>
          You are not authorized to invite members to this project.
        </h1>
      </div>
    )

  return (
    <div>
      <p className='text-lg text-gray-600'>
        Invite team members to collaborate on this project.
      </p>
      <p className='text-black mt-2 mb-4'>
        Please make sure that the email address is registered in teams-dev.
      </p>
      <InviteForm projectId={id} />
    </div>
  )
}

export default Page
