'use client';
import { CardRetro } from '@/components/ui-retro/card-retro';
import { AnimatedCountUp } from '@/components/ui-scoring/animated-count-up';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const BoxCountUp = ({ value, text }: { value: number, text: string }) => {
  const { theme } = useGame();
  const color = themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const isHighValue = value > 1000; // Visual feedback threshold

  return (
    <CardRetro className={`text-center${
      isHighValue ? 'bg-[#f8e5c8]' : '' // Light orange background for high values
    }`}>
      <div className=''>
        <div className='text-5xl drop-shadow-md'>
          <AnimatedCountUp value={value} />
        </div>
        <div className='text-base text-gray-700'>{text}</div>
      </div>
    </CardRetro>
  );
};