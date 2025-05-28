'use client';

import { useState } from 'react';

import { useGame } from '@/context/game-context';

export const EmailSignupForm = () => {
  const { setMenu } = useGame();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [monthly, setMonthly] = useState(true);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Rate-limit: 1 per 10 minutes per browser
    const last = localStorage.getItem('email_submitted');
    if (last && Date.now() - parseInt(last) < 10 * 60 * 1000) {
      setStatus('error');
      return;
    }

    // Block spam bots
    if (honeypot) {
      setStatus('error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('EMAIL', email);

      const response = await fetch(
        'https://checkmateadvance.us5.list-manage.com/subscribe/post?u=7b96c4b1a9d2c87f5882b1985&amp;id=e47b71f0c1&amp;f_id=0026edebf0',
        {
          method: 'POST',
          mode: 'no-cors', // required for Mailchimp
          body: formData,
        }
      );

      localStorage.setItem('email_submitted', Date.now().toString());
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleEmailSubmit} className='mx-auto max-w-md rounded'>
      <h2 className='mb-2 text-lg font-bold text-[#c381b5]'>
        Get Your Free Stuff
      </h2>

      <p className='mb-2 text-sm text-gray-700'>
        Sign up for my newsletter to get monthly development logs. As a special
        thank you for signing up, I will send you{' '}
        <span className='font-semibold text-[#c381b5]'>
          behind-the-scenes art & cut content
        </span>{' '}
        from the making of <span className='italic'>Checkmate Advance</span>.
      </p>
      <div className='mb-2'>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded bg-[#fefcd0] p-2 text-sm placeholder-gray-400'
          placeholder='you@example.com'
        />
        {/* Honeypot field to trap bots */}
        <input
          type='text'
          className='hidden'
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete='off'
        />
      </div>

      <button
        type='submit'
        disabled={status === 'loading'}
        className='w-full rounded bg-[#c381b5] py-2 text-sm font-bold text-white transition hover:bg-[#a86399]'
      >
        {status === 'loading' ? 'Submitting...' : 'Subscribe'}
      </button>
      {status === 'success' && (
        <p className='mt-2 text-green-400'>Thanks! You&apos;re on the list.</p>
      )}
      {status === 'error' && (
        <p className='mt-2 text-red-400'>Error. Please try again later.</p>
      )}
      <div
        onClick={() => setMenu('privacy')}
        className='mt-2 cursor-pointer text-sm text-gray-700 hover:underline'
      >
        Privacy Policy
      </div>
    </form>
  );
};
