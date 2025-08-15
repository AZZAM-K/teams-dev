import { signIn } from '@/auth'
import GoogleIcon from '@/components/GoogleIcon'

const SignWithGoogle = () => {
  return (
    <button
      className='flex items-center justify-center gap-3 bg-white text-black rounded-lg p-3 transition cursor-pointer'
      formAction={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <GoogleIcon />
      Sign in with Google
    </button>
  )
}

export default SignWithGoogle
