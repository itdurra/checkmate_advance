'use client';
import { CardRetroAlt } from '@/components/ui-retro/card-retro-alt';
import { AnimatedCountDown } from '@/components/ui-scoring/animated-count-down';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const BoxCountDown = ({ value, text }: { value: number, text: string }) => {
  const { theme } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

    const isUrgent = value <= 3 && value > -1;

  return (
    <CardRetroAlt   className={`text-center ${
      isUrgent ? 'animate-pulse bg-[#c381b5],' : ''
    }`}>
      <div className=''>
        <div className='text-xl md:text-4xl drop-shadow-md'>
          <AnimatedCountDown value={value} />
        </div>
        <div className='text-sm md:text-base text-gray-700'>{text}</div>
      </div>
    </CardRetroAlt>
  );
};
