import { isManager } from '@/lib/actions'
import Link from 'next/link'
import { PlusSquare } from 'lucide-react'
import { LeaveButton } from '@/components/projects/buttons'

const ProjectHeader = async ({
  project,
  membersNb,
}: {
  project: { name: string; id: string; description: string | null }
  membersNb: number
}) => {
  const manager = await isManager(project.id)

  return (
    <div className='flex flex-col sm:flex-row justify-between mb-4 gap-3 border-b border-gray-400 pb-3'>
      <h1 className='text-2xl md:text-3xl font-extrabold text-gray-800'>
        {project?.name}
      </h1>
      <div className='flex flex-col space-y-2'>
        <span className='text-gray-500 text-sm sm:text-lg'>
          members: {membersNb}
        </span>
        {manager ? (
          <Link
            href={`/projects/${project.id}/invite`}
            className='flex gap-2 items-center text-indigo-600 font-semibold'
          >
            <PlusSquare />
            <span>Invite</span>
          </Link>
        ) : (
          <LeaveButton projectId={project.id} />
        )}
      </div>
    </div>
  )
}

export default ProjectHeader
