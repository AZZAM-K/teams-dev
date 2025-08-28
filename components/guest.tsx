import Link from 'next/link'
import { File, Handshake, Check } from 'lucide-react'
import Footer from '@/components/footer'

const features = [
  {
    title: 'Project Management',
    desc: 'Create and manage multiple projects.',
    icon: <File size={30} />,
  },
  {
    title: 'Task Tracking',
    desc: 'Assign tasks, set deadlines, track progress.',
    icon: <Check size={30} />,
  },
  {
    title: 'Collaboration',
    desc: 'Comment, invite team members, stay in sync.',
    icon: <Handshake size={30} />,
  },
]

const Guest = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <section className='py-16 px-4 text-center bg-gradient-to-br from-indigo-600 to-indigo-400 text-white'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Organize your team, track your tasks, and hit deadlines.
        </h1>
        <p className='text-lg md:text-xl mb-8'>
          Manage projects, collaborate with teammates, and stay on top of every
          task.
        </p>
        <div className='flex justify-center gap-4 mb-8'>
          <Link
            href='/signin'
            className='px-6 py-3 bg-indigo-800 text-white font-semibold rounded shadow hover:bg-indigo-700'
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className='py-12 px-4 max-w-5xl mx-auto'>
        <h2 className='text-2xl font-bold text-center mb-8'>Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map(f => (
            <div
              key={f.title}
              className='bg-white rounded-lg shadow p-6 flex flex-col items-center border-2 border-indigo-600'
            >
              <span className='text-4xl mb-2'>{f.icon}</span>
              <h3 className='font-semibold mb-1 text-black'>{f.title}</h3>
              <p className='text-gray-600 text-sm text-center'>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Guest
