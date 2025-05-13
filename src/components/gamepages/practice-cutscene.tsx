import { useState } from 'react';

import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

import { TutorialPopup } from '../popups/tutorial-popup';


export const PracticeCutScene = () => {
  const { theme, setMenu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];

  const [tutorialPopup, setTutorialPopup] = useState(true);

  return (
    <TutorialPopup
      isOpen={tutorialPopup}
      closeTutorialPopup={() => setTutorialPopup(false)}
    />
  );
};
