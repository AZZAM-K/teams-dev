'use client'

import { useEffect } from 'react'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <h2 className='text-red-500 text-2xl font-bold text-center'>
        {error.message}
      </h2>
      <button
        onClick={() => window.location.reload()}
        className='mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-700 cursor-pointer'
      >
        Try again
      </button>
    </div>
  )
}
