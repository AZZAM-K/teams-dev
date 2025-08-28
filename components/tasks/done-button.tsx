import { completeSubtask } from '@/lib/actions'

const DoneButton = ({
  id,
  taskId,
  projectId,
}: {
  id: string
  taskId: string
  projectId: string
}) => {
  const formAction = completeSubtask.bind(null, id, taskId, projectId)

  return (
    <form action={formAction}>
      <button
        type='submit'
        className='px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer'
      >
        Mark as Done
      </button>
    </form>
  )
}

export default DoneButton
