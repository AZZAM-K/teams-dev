const Footer = () => {
  return (
    <footer className='py-8 px-6 bg-black text-white mt-auto'>
      <div className='my-0 mx-auto'>
        <div className='flex flex-col md:flex-row justify-between gap-8 mb-12'>
          <p className='text-xl font-bold'>
            teams<span className='text-indigo-600'>-dev</span>
          </p>

          <div>
            <p className='text-2xl text-white font-bold mb-4'>Media</p>
            <div className='flex gap-4'>
              <a
                href='https://github.com/AZZAM-K'
                target='_blank'
                className='hover:text-indigo-600'
              >
                GitHub
              </a>
              <a
                href='http://linkedin.com/in/azzam-al-kahil'
                target='_blank'
                className='hover:text-indigo-600'
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <p className='text-center text-gray-400 text-lg mb-3'>
          © Copyright 2025. Made by azzam-k
        </p>
      </div>
    </footer>
  )
}

export default Footer
