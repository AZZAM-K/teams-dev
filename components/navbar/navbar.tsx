import Link from 'next/link'
import { auth } from '@/auth'
import { UserPlus2 } from 'lucide-react'
import SignoutBtn from '@/components/navbar/signout'
import NavLinks from '@/components/navbar/nav-links'
import Image from 'next/image'

const Navbar = async () => {
  const session = await auth()

  return (
    <nav
      className='bg-black fixed w-[95%] md:w-full bottom-2 md:bottom-auto top-auto md:top-0 text-white px-3 py-3 md:px-5
       md:py-3 flex gap-2 justify-between items-center border-2 md:border-none rounded-2xl md:rounded-none border-indigo-600 left-1/2
        -translate-x-1/2 overflow-hidden'
    >
      <Link href={'/'} className='hidden md:block'>
        <p className='text-xl font-bold'>
          teams<span className='text-indigo-600'>-dev</span>
        </p>
      </Link>
      <NavLinks />
      <div className='flex flex-1 md:flex-none gap-2 items-center'>
        {session ? (
          <>
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt='User Avatar'
                width={50}
                height={50}
                className='rounded-full md:mr-2'
              />
            ) : null}
            <SignoutBtn />
          </>
        ) : (
          <>
            <Link
              href={'/signin'}
              className='p-2 bg-indigo-600 text-sm flex flex-1 justify-center items-center gap-2 rounded-md transition
               hover:bg-indigo-700'
            >
              <span className='hidden md:block'>Sign In</span>
              <UserPlus2 size={25} />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
