import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2'>
      <Image
        src='/logo.png'
        width={40}
        height={40}
        priority
        quality={100}
<<<<<<< HEAD
        alt='Checkmate Advance logo mark'
      />
      <span className='font-alt text-xl text-white'>Checkmate Advance</span>
=======
        alt='UPDATE_THIS_WITH_YOUR_APP_DISPLAY_NAME logo mark'
      />
      <span className='font-alt text-xl text-white'>UPDATE_THIS_WITH_YOUR_APP_DISPLAY_NAME</span>
>>>>>>> 4a0b634e739f4f42b77cf08b5a976a79225b7eb5
    </Link>
  );
}
