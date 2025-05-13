'use client';

import { useState } from 'react';

import { supabase } from '@/lib/supabase';

export const EmailSignupForm = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

    const { error } = await supabase.from('emails').insert([{ email }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      localStorage.setItem('email_submitted', Date.now().toString());
      setEmail('');
      setStatus('success');
    }
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className='mx-auto max-w-md rounded'
    >
      <h2 className='mb-2 text-lg font-bold text-[#c381b5]'>
        Get Email Updates
      </h2>
      <div className='mb-2'>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded p-2 text-sm placeholder-gray-400 bg-[#fefcd0]'
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
      <div className='mt-2 text-sm'>I will only email you when I push a major update or release a new game</div>
      {status === 'success' && (
        <p className='mt-2 text-green-400'>Thanks! You&apos;re on the list.</p>
      )}
      {status === 'error' && (
        <p className='mt-2 text-red-400'>Error. Please try again later.</p>
      )}
    </form>
  );
};
