import { signIn } from '@/auth'
import GithubIcon from '@/components/github-icon'

const SignWithGithub = () => {
  return (
    <button
      className='flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg p-3 transition
       cursor-pointer'
      formAction={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <GithubIcon />
      Sign in with GitHub
    </button>
  )
}

export default SignWithGithub
