import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';

export const BossName = () => {

  const { theme, isShopOpen, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];


  // Determine what to display based on the current menu state
  let title = '';
  switch (menu) {
    case 'storymode':
      if (isShopOpen) {
        title = 'Shop';
      } else {
        title = 'Level Select';
      }
      break;
    case 'game':
      title = boss.name;
      break;
    default:
      title = 'Menu';
  }

  return (
    <>
      <div>
        <CardRetro className='items-center text-center gap-4 md:p-3'>
          {/* Center: Title */}
          <div className='font-minecraft-bold flex-grow text-center text-3xl'>
            {title}
          </div>
          {menu === 'game' && (<div>Score <strong>{boss.score}</strong> or more to win</div>)}
        </CardRetro>
      </div>
    </>
  );
};
