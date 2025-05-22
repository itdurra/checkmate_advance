'use client';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { ButtonRetro } from '../ui-retro/button-retro';
import { CardRetroNoMotion } from '../ui-retro/card-retro-no-motion';

export const Privacy = () => {
  const { theme, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  return (
    <>
      <div className='mx-auto max-w-5xl space-y-6 px-4 text-left text-sm text-white'>
        <div className='w-full'></div>
        <ButtonRetro
          className='mr-auto hidden w-48 md:block'
          onClick={() => setMenu('main')}
        >
          Main Menu
        </ButtonRetro>
        <CardRetroNoMotion className='space-y-4 p-4'>
          <h1 className='font-minecraft-bold mb-4 text-center text-2xl'>
            Privacy Policy
          </h1>
          <p>
            This Privacy Policy governs the manner in which Ian Durra Games LLC
            collects, uses, maintains, and discloses information collected from
            users (each, a “User”) of checkmateadvance.com. This policy applies
            to the Website and all products and services offered by Ian Durra
            Games LLC.
          </p>

          <h2 className='font-minecraft-bold mb-4 text-xl'>Who I am</h2>
          <p>My website address is: https://checkmateadvance.com.</p>

          <h2 className='font-minecraft-bold mb-4 text-xl'>
            What personal data I collect and why I collect it
          </h2>
          <p>
            <strong>Mailing List Subscribers</strong>
          </p>
          <p>
            If a User voluntarily subscribes to my mailing list, I collect their
            email address for the purpose of sending newsletters, updates,
            promotions, and other information related to my products and
            services.
          </p>
          <p>
            Your email may be stored or processed by the following third-party
            services:
          </p>
          <ul className='ml-6 mt-2 list-disc'>
            <li>
              <strong>Mailchimp</strong> – manages and delivers emails (
              <a
                href='https://mailchimp.com/legal/privacy/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-200'
              >
                Privacy Policy
              </a>
              )
            </li>
            <li>
              <strong>Supabase</strong> – securely stores subscriber data (
              <a
                href='https://supabase.com/privacy'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-200'
              >
                Privacy Policy
              </a>
              )
            </li>
            <li>
              <strong>Vercel</strong> – hosts this website and may log technical
              request data such as IP addresses (
              <a
                href='https://vercel.com/legal/privacy-policy'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline hover:text-blue-200'
              >
                Privacy Policy
              </a>
              )
            </li>
          </ul>
          <p>
            I do not sell or share your email address with unrelated third
            parties. You may unsubscribe at any time using the link provided in
            each email.
          </p>

          <p>
            <strong>Local Storage</strong>
          </p>
          <p>
            I use your browser&apos;s local storage to save gameplay progress
            and preferences. This data stays on your device and is not shared or
            transmitted to my servers. You can clear this data anytime through
            your browser settings.
          </p>

          <p>
            <strong>Non-personal Identification Information</strong>
          </p>
          <p>
            I may collect non-personal identification information about Users
            whenever they interact with my Website. Non-personal identification
            information may include the browser name, the type of computer, and
            technical information about Users’ means of connection to our
            Website, such as the operating system and the Internet service
            providers utilized, and other similar information.
          </p>

          <p>
            <strong>How I Use Collected Information</strong>
          </p>
          <ul>
            <li>
              To run a promotion, contest, survey, or other Website feature: To
              send Users information they agreed to receive about topics I think
              will be of interest to them.
            </li>
            <li>
              If a User opts into my mailing list, they may receive emails that
              include company news, updates, product announcements, and other
              content. Each email includes an unsubscribe option.
            </li>
          </ul>

          <p>
            <strong>How I Protect Your Information</strong>
          </p>
          <p>
            I adopt appropriate data collection, storage, and processing
            practices and security measures to protect against unauthorized
            access, alteration, disclosure, or destruction of your personal
            information stored on my Website or through trusted third-party
            services.
          </p>

          <p>
            <strong>Sharing Your Personal Information</strong>
          </p>
          <p>
            I do not sell, trade, or rent Users’ personal identification
            information to others. However, I may share limited information
            (such as email addresses) with trusted third-party services like
            Mailchimp and Supabase, solely for the purpose of operating this
            Website and delivering email communications. These services are
            obligated to protect your data and use it only for the specific
            purposes described here.
          </p>

          <p>
            <strong>Changes to This Privacy Policy</strong>
          </p>
          <p>
            Ian Durra Games LLC has the discretion to update this privacy policy
            at any time. When I do, I will revise the updated date at the bottom
            of this page. I encourage Users to frequently check this page for
            any changes to stay informed about how I am helping to protect the
            personal information I collect. You acknowledge and agree that it is
            your responsibility to review this privacy policy periodically and
            become aware of modifications.
          </p>

          <p>
            <strong>Your Acceptance of These Terms</strong>
          </p>
          <p>
            By using this Website, you signify your acceptance of this policy.
            If you do not agree to this policy, please do not use my Website.
            Your continued use of the Website following the posting of changes
            to this policy will be deemed your acceptance of those changes.
          </p>

          <p>
            <strong>Contacting Us</strong>
          </p>
          <p>
            If you have any questions about this Privacy Policy, the practices
            of this Website, or your dealings with this Website, please contact
            me at ian@checkmateadvance.com
          </p>
          <p>
            <strong>Update Log</strong>
          </p>
          <p>
            5-22-25 I updated language to include the use of the third party
            services: Mailchimp, Supabase, and Vercel.
          </p>
        </CardRetroNoMotion>

        <ButtonRetro className='mr-auto w-48' onClick={() => setMenu('main')}>
          Main Menu
        </ButtonRetro>
      </div>
    </>
  );
};
