import { useState } from 'react';
import { Button, Card } from 'pixel-retroui';

import story from '@/config/story.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { cutScenePicture } from '../portraits';

export const CutScene = () => {
  const { theme, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  // Initialize the slide state with the first story slide
  const [slideIndex, setSlideIndex] = useState(0);

  // Get the current slide from the story JSON
  const slide = story.story[slideIndex];

  function handleNextSlide() {
    if (slideIndex < story.story.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setMenu('storymode');
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
            {slideIndex < story.story.length - 1 ? 'Next' : 'Start Game'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
