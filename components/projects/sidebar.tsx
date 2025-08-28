'use client'

import clsx from 'clsx'
import { Layout, ListTodo, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBar = ({
  projectId,
  isMember,
  isManager,
}: {
  projectId: string
  isMember: boolean
  isManager: boolean
}) => {
  const pathname = usePathname()

  const links = [
    {
      name: 'Dashboard',
      href: `/projects/${projectId}`,
      icon: Layout,
      show: true,
    },
    {
      name: 'Members',
      href: `/projects/${projectId}/members`,
      icon: Users,
      show: true,
    },
    {
      name: 'Settings',
      href: `/projects/${projectId}/settings`,
      icon: Settings,
      show: isManager,
    },
    {
      name: 'My Tasks',
      href: `/projects/${projectId}/my-tasks`,
      icon: ListTodo,
      show: isMember,
    },
  ]
  return (
    <div
      className='flex flex-row h-full justify-between md:justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-12
     px-3 py-4 md:pl-3 md:pr-6 md:fixed left-0 border-b md:border-r md:border-b-0 border-gray-400'
    >
      {links.map(
        link =>
          link.show && (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center space-x-3 mt-5 font-semibold',
                {
                  'text-indigo-600': pathname === link.href,
                  'text-gray-500': pathname !== link.href,
                }
              )}
            >
              <link.icon size={25} />
              <span className='hidden md:block'>{link.name}</span>
            </Link>
          )
      )}
    </div>
  )
}

export default SideBar
