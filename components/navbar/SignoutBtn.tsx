import { logout } from '@/lib/signout'
import { LogOut } from 'lucide-react'

const SignoutBtn = () => {
  return (
    <form action={logout}>
      <button
        type='submit'
        className='p-2 bg-red-500 text-sm flex flex-1 justify-center items-center gap-2 rounded-md transition hover:bg-red-600'
      >
        <span className='hidden md:block'>Log Out</span>
        <LogOut size={25} color='white' />
      </button>
    </form>
  )
}

export default SignoutBtn
