import { deleteMember, leaveProject } from '@/lib/actions'

export const DeleteMember = ({
  projectId,
  memberId,
}: {
  projectId: string
  memberId: string
}) => {
  const deleteWithIds = deleteMember.bind(null, projectId, memberId)

  return (
    <form action={deleteWithIds}>
      <button
        type='submit'
        className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
      >
        Delete
      </button>
    </form>
  )
}

export const LeaveButton = ({ projectId }: { projectId: string }) => {
  const leave = leaveProject.bind(null, projectId)
  return (
    <form action={leave}>
      <button
        type='submit'
        className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
      >
        Leave Project
      </button>
    </form>
  )
}
