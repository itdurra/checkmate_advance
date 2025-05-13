import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

import { ButtonRetro } from '@/components/ui-retro/button-retro';

import { ButtonFlashRetro } from '../ui-retro/button-flash-retro';

import { Stats } from './stats';

interface StatsAndButtonsProps {
  text: string;
  onContinue: () => void;
}

export const StatsAndButtons = ({
  text,
  onContinue,
}: StatsAndButtonsProps) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (summaryRef.current) {
      const dataUrl = await toPng(summaryRef.current, {
        cacheBust: true,
        backgroundColor: '#f5e7c1',
      });

      const link = document.createElement('a');
      link.download = 'checkmate-run-summary.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <>
      <div className='my-4'>
        <div className='mx-auto inline-block max-w-md text-center'>
          <div
            ref={summaryRef}
            className='inline-block rounded-lg bg-[#f5e7c1] px-2 py-4 text-black sm:px-6'
          >
            <Stats></Stats>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-center gap-2'>
        <ButtonRetro onClick={handleExportImage}>
          📸 Download
        </ButtonRetro>
        <ButtonFlashRetro onClick={onContinue}>{text}</ButtonFlashRetro>
      </div>
    </>
  );
};
