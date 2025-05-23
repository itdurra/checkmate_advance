'use client';

import { useRouter } from 'next/navigation';

import { PrivacyPolicy } from '../privacy-policy';
import { ButtonRetro } from '../ui-retro/button-retro';

export const PrivacyServerPage = () => {
  const router = useRouter();

  return (
    <>
      <div className='mx-auto max-w-5xl space-y-6 px-4 text-left text-sm text-white'>
        <div className='w-full'></div>
        <ButtonRetro
          className='mr-auto hidden w-48 md:block'
          onClick={() => router.push('/')}
        >
          Main Menu
        </ButtonRetro>
        <PrivacyPolicy></PrivacyPolicy>

        <ButtonRetro className='mr-auto w-48' onClick={() => router.push('/')}>
          Main Menu
        </ButtonRetro>
      </div>
    </>
  );
};
