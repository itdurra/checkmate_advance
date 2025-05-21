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
            If a User voluntarily subscribes to my mailing list, I collect
            their email address for the purpose of sending newsletters, updates,
            promotions, and other information related to my products and
            services. I want to assure our mailing list subscribers that I
            will never sell or provide their information to third parties
            without their consent.
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
            <strong>How I Use Collected Information</strong>
          </p>
          <ul>
            <li>
              To run a promotion, contest, survey, or other Website feature: To
              send Users information they agreed to receive about topics I
              think will be of interest to them.
            </li>
            <li>
              {' '}
              If User decides to opt-in to my mailing list, they will receive
              emails that may include company news, updates, related product or
              service information, tailored advertisements, etc. If at any time
              the User would like to unsubscribe from receiving future emails,
              I include detailed unsubscribe instructions at the bottom of each
              email.
            </li>
          </ul>
          <p>
            <strong>How I Protect Your Information</strong>
          </p>
          <p>
            I adopt appropriate data collection, storage, and processing
            practices and security measures to protect against unauthorized
            access, alteration, disclosure, or destruction of your personal
            information stored on my Website.
          </p>
          <p>
            <strong>Sharing Your Personal Information</strong>
          </p>
          <p>
            I do not sell, trade, or rent Users’ personal identification
            information to others.
          </p>
          <p>
            <strong>Changes to This Privacy Policy</strong>
          </p>
          <p>
            Ian Durra Games LLC has the discretion to update this privacy policy
            at any time. When I do, I will revise the updated date at the
            bottom of this page. I encourage Users to frequently check this
            page for any changes to stay informed about how I am helping to
            protect the personal information I collect. You acknowledge and
            agree that it is your responsibility to review this privacy policy
            periodically and become aware of modifications.
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
        </CardRetroNoMotion>

        <ButtonRetro className='mr-auto w-48' onClick={() => setMenu('main')}>
          Main Menu
        </ButtonRetro>
      </div>
    </>
  );
};
