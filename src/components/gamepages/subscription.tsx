'use client';

import { useRouter } from 'next/navigation';

import { ButtonRetro } from '../ui-retro/button-retro';
import { CardRetroNoMotion } from '../ui-retro/card-retro-no-motion';

export const Subscription = () => {
  const router = useRouter();

  return (
    <>
      <div className='mx-auto max-w-5xl space-y-6 px-4 text-left text-sm text-white'>
        <div className='w-full'></div>
        <CardRetroNoMotion className='space-y-4 p-4'>
          <h1 className='font-minecraft-bold mb-4 text-center text-2xl'>
            Subscription Confirmed!
          </h1>
          <p>Check your inbox for more updates shortly.</p>
        </CardRetroNoMotion>
      </div>
    </>
  );
};
