import { auth } from '@/auth'
import { fetchStats } from '@/lib/data'
import Link from 'next/link'
import Footer from '@/components/footer'

const Dashboard = async () => {
  const session = await auth()
  const { projectsOwned, projectsContributed, invitesSent, invitesReceived } =
    await fetchStats()

  const cards = [
    {
      title: 'Projects Owned',
      value: projectsOwned,
      details: '/projects?type=owned',
      desc: 'Projects you created and manage.',
    },
    {
      title: 'Projects Contributed',
      value: projectsContributed,
      details: '/projects?type=contributed',
      desc: 'Projects you are a member of.',
    },
    {
      title: 'Invites Sent',
      value: invitesSent,
      details: '/invites?type=sent',
      desc: 'Invitations you have sent to others.',
    },
    {
      title: 'Invites Received',
      value: invitesReceived,
      details: '/invites?type=received',
      desc: 'Invitations you have received.',
    },
  ]

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-1 max-w-5xl mx-auto py-12 px-4'>
        <h1 className='text-3xl font-bold mb-6'>
          Welcome {session?.user?.name}
        </h1>
        <h2 className='text-xl font-semibold mb-8'>Your Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {cards.map(card => (
            <div
              key={card.title}
              className='bg-white rounded-lg shadow p-6 flex flex-col justify-between border-2 border-indigo-600'
            >
              <div>
                <h3 className='text-lg font-bold mb-2'>{card.title}</h3>
                <p className='text-4xl font-extrabold text-indigo-600 mb-2'>
                  {card.value}
                </p>
                <p className='text-gray-600 text-sm mb-4'>{card.desc}</p>
              </div>
              <Link
                href={card.details}
                className='mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center font-semibold'
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
