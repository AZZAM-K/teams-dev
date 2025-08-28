import { fetchProjects } from '@/lib/data'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const ProjectsList = async ({ type }: { type: string }) => {
  const projects = await fetchProjects(type)

  return (
    <div className='w-full py-8 px-4'>
      <div className='flex justify-between items-center mb-4 w-full'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <Link
          href='/projects/create'
          className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex gap-2 justify-center items-center'
        >
          Create Project
          <Plus size={20} color='white' />
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.length === 0 ? (
          <p className='text-gray-400 text-lg'>No projects found.</p>
        ) : (
          projects.map(project => (
            <div
              key={project.id}
              className='bg-white rounded-lg shadow p-6 flex flex-col justify-between border-2 border-indigo-600'
            >
              <div>
                <h3 className='text-2xl font-bold mb-3 text-black'>
                  {project.name}
                </h3>
                <p className='text-gray-600 text-lg mb-2'>
                  {project.description || 'No description'}
                </p>
                <p className='text-sm text-gray-500 mb-2'>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <p className='text-sm text-gray-500 mb-2'>
                  Members: {project.members.length}
                </p>
              </div>
              <Link
                href={`/projects/${project.id}`}
                className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center font-semibold cursor-pointer'
              >
                See Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectsList
