import { auth } from '@/auth'
import { fetchStats } from '@/lib/data'

const Dashboard = async () => {
  const session = await auth()
  const n = await fetchStats()

  return (
    <>
      <h1>Welcome {session?.user?.name}</h1>
      <p>ID: {session?.user?.id}</p>
      <p>Number of Projects: {n}</p>
    </>
  )
}

export default Dashboard
