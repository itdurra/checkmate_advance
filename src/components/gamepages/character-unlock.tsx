import { useState } from 'react';
import { Button, Card } from 'pixel-retroui';

import bosses from '@/config/bosses.json';
import story from '@/config/story.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { cutScenePicture } from '../portraits';

export const CharacterUnlock = () => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const { theme, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  // Initialize the slide state with the first story slide
  const [slideIndex, setSlideIndex] = useState(0);

  // Get the current slide from the story JSON
  const slide = boss.cutscene[slideIndex];

  function handleNextSlide() {
    if (slideIndex < boss.cutscene.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setMenu('game');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <Card
        bg={color.bg}
        textColor={color.textColor}
        borderColor={color.borderColor}
        shadowColor={color.shadowColor}
        className='mt-4 max-w-sm p-5 text-center'
      >
        {cutScenePicture(slide.image)}
        <div className='py-4 text-center'>
          <p className='font-minecraft-bold min-h-72px pb-4 text-xl'>
            {slide.title}
          </p>
          <p className='min-h-[72px]'>{slide.text}</p>
        </div>
        <div className='text-center'>
          <Button
            bg={color.bg}
            textColor={color.textColor}
            borderColor={color.borderColor}
            shadow={color.shadowColor}
            onClick={handleNextSlide}
            className='text-sm'
          >
            {slideIndex < boss.cutscene.length - 1 ? 'Next' : 'Start Game'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
