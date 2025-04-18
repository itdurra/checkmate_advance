import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkmate Advance',
  description: 'Retro game meets modern chess',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body
      >
        <div className='relative min-h-screen flex flex-col font-minecraft'>
          <AppBar />
          <main className='flex flex-col gap-5 p-4 flex-1 justify-center'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

async function AppBar() {
  return (<></>
    /*
    <header className='h-16 backdrop-blur-lg fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-transparent px-4'>
      <Logo/>
      {//<a href="https://www.flaticon.com/free-icons/retro" title="retro icons">Retro icons created by Freepik - Flaticon</a>
      }
      <Navigation />
    </header>
    */
  );
}

function Footer() {
  return (<></>
  /*
    <footer className='hidden md:flex md:flex-col mt-auto px-4 justify-center'>
      <div className='flex flex-row justify-center text-center space-x-6'>
        <Link href='/pricing'>Pricing</Link>
        <Link href='/about-us'>About Us</Link>
        <Link href='/privacy'>Privacy</Link>
        <Link href='/support'>Get Support</Link>
      </div>
      <div className='flex flex-row justify-center text-center space-x-6 text-gray-400'>
        <Link href='/pricing'>Discord</Link>
        <Link href='/about-us'>Bluesky</Link>
        <Link href='/privacy'>Github</Link>
      </div>

      </footer>
  */

  );
}  
