import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import TypeSwitcher from '@/components/type-switcher'
import InvitesList from '@/components/invites/list'

export const metadata: Metadata = {
  title: 'Invites',
  description: 'Manage your project invites',
}

const InvitesPage = async (props: {
  searchParams?: Promise<{
    type?: string
  }>
}) => {
  const session = auth()
  if (!session) redirect('/signin')

  const searchParams = await props.searchParams
  const type = searchParams?.type || 'received'

  return (
    <div className='flex flex-col px-2 py-6 gap-6'>
      <div className='flex w-full justify-center'>
        <TypeSwitcher
          options={[
            { label: 'Sent', value: 'sent' },
            { label: 'Received', value: 'received' },
          ]}
        />
      </div>
      <InvitesList type={type} />
    </div>
  )
}

export default InvitesPage
