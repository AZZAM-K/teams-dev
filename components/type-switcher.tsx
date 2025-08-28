'use client'

import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

type Options = { label: string; value: string }

const TypeSwitcher = ({ options }: { options: Options[] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentType = searchParams.get('type') || 'all'

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', value)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex gap-3 mb-4'>
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleTypeChange(option.value)}
          className={clsx(
            'px-4 py-2 rounded text-lg font-bold cursor-pointer',
            currentType === option.value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 border border-indigo-600'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TypeSwitcher
