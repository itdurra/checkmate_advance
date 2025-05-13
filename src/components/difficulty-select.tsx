import bosses from '@/config/practice-bosses.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { Difficulty } from '@/types/difficulty';

import { ButtonRetro } from './ui-retro/button-retro';

export const DifficultySelect = () => {
  const setDifficulty = useScoreStore((state) => state.setDifficulty);
  const difficulty = useScoreStore((state) => state.difficulty);
  const engine = useScoreStore((state) => state.engine);
  const newGamePlus = useScoreStore((state) => state.newGamePlus); 
  const { menu, setMenu, level } = useGame();
  const boss = bosses.bosses[0];

  function choice(choice: Difficulty) {
    setDifficulty(choice);
    //update boss and game position
    engine.setBossLevel(boss.level, newGamePlus, choice)
    if (menu === 'cutscene') {
      setMenu('storymode');
    }
    if (menu === 'practice_cutscene') {
      setMenu('practice');
    }
  }

  return (
    <>
      <div className='flex flex-row justify-center'>
      <ButtonRetro onClick={() => choice('easy')}>Easy</ButtonRetro>
      <ButtonRetro onClick={() => choice('medium')}>Medium</ButtonRetro>
      <ButtonRetro onClick={() => choice('hard')}>Hard</ButtonRetro>
      </div>
    </>
  );
};
