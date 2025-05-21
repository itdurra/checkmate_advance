import Image from 'next/image';

export const BioCard = () => {
  return (
    <div className='mx-auto max-w-xl rounded-2xl p-6'>
      <div className='flex flex-col sm:flex-row sm:items-start sm:space-x-6'>
        {/* Profile Section */}
        <div className='mx-auto w-fit flex-shrink-0 overflow-hidden rounded-xl border-2 border-[#c381b5] bg-[#c381b5] sm:mb-0'>
          <Image
            src='/img/bio/bio2.jpg'
            alt='Ian Durra'
            width={200}
            height={294}
            className='object-cover'
          />
          <div className='flex justify-center p-2'>
            <a
              href='https://ko-fi.com/G2G41EYH2P'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-opacity hover:opacity-80'
            >
              <Image
                src='https://storage.ko-fi.com/cdn/kofi1.png?v=6'
                alt='Buy Me a Coffee at ko-fi.com'
                width={140}
                height={36}
                priority
              />
            </a>
          </div>
        </div>

        {/* Bio Content */}
        <div className='space-y-4'>
          <p className='text-2xl font-extrabold text-[#c381b5]'>Ian Durra</p>
          <p className='text-sm text-gray-700'>
            I&apos;m a solo game developer and new dad. In between family time,
            I make games from my living room.
          </p>
          <p className='text-sm text-gray-700'>
            <span className='font-semibold text-[#c381b5]'>Contact:</span>{' '}
            <a
              href='mailto:iandurra@gmail.com'
              className='underline decoration-[#c381b5] hover:text-[#a86399]'
            >
              hello@iandurra.com
            </a>
          </p>

          <div>
            <p className='text-sm font-semibold text-[#c381b5]'>Games:</p>
            <ul className='list-inside list-disc text-sm text-gray-800'>
              <li>Checkmate Advance</li>
              <li>Possthumous – TBA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
