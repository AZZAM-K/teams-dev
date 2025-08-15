import type { Metadata } from 'next'
import SignWithGithub from '@/components/auth/github-sign'
import SignWithGoogle from '@/components/auth/google-sign'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'teams-dev | Sign In',
  description: 'Create a new account on teams-dev',
}

const SignUpPage = async () => {
  const session = await auth()
  if (session) redirect('/')
  return (
    <div className='w-full h-screen flex justify-center items-center px-2'>
      <div className='bg-gray-700 p-6 border-2 border-blue-500 flex flex-col gap-6 rounded-2xl w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center'>Sign In</h1>
        <form className='text-lg flex flex-col gap-3 w-full'>
          <div className='flex flex-col gap-6'>
            <SignWithGoogle />
            <SignWithGithub />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
