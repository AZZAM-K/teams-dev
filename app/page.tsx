import { auth } from '@/auth'
import Dashboard from '@/components/dashboard'
import Guest from '@/components/guest'

export default async function Home() {
  const session = await auth()
  if (session) return <Dashboard />
  else return <Guest />
}
