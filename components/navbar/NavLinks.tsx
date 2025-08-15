'use client'

import { Home, Mail, FolderKanban } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className='flex flex-1 md:flex-none gap-2 md:gap-6 text-lg'>
      <Link
        href={'/'}
        className={clsx(
          'flex flex-1 md:flex-none justify-center items-center gap-2 bg-gray-600 md:bg-transparent rounded-md p-2',
          {
            'text-blue-500': pathname === '/',
          }
        )}
      >
        <Home size={30} />
        <span className='text-lg hidden md:block'>Home</span>
      </Link>
      <Link
        href={'/projects'}
        className={clsx(
          'flex flex-1 md:flex-none justify-center items-center gap-2 bg-gray-600 md:bg-transparent rounded-md p-2',
          {
            'text-blue-500': pathname === '/projects',
          }
        )}
      >
        <FolderKanban size={30} />
        <span className='text-lg hidden md:block'>Projects</span>
      </Link>
      <Link
        href={'/invites'}
        className={clsx(
          'flex flex-1 md:flex-none justify-center items-center gap-2 bg-gray-600 md:bg-transparent rounded-md p-2',
          {
            'text-blue-500': pathname === '/invites',
          }
        )}
      >
        <Mail size={30} />
        <span className='text-lg hidden md:block'>Invites</span>
      </Link>
    </div>
  )
}

export default NavLinks
