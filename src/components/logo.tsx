'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose, IoMenu } from 'react-icons/io5';

export function Logo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className='block md:hidden' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
      </button>
      <div>
        <Link href='/' className='flex w-fit items-center gap-2'>
          <Image
            src='/logo.png'
            width={40}
            height={40}
            priority
            quality={100}
            alt='Checkmate Advance logo mark'
            className='hidden md:flex'
          />
          <h1 className='font-minecraft-bold ml-2 text-xl'>
            Checkmate Advance
          </h1>
        </Link>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute left-0 right-0 top-16 flex flex-col items-center space-y-4 bg-white py-6'>
          <Link href='/pricing'>Pricing</Link>
          <Link href='/about-us'>About Us</Link>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/support'>Support</Link>
        </div>
      )}
    </>
  );
}
