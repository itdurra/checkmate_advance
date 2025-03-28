import { CardRetro } from '@/components/ui-retro/card-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';
import { ButtonRetro } from '@/components/ui-retro/button-retro';

export const ToggleDisplay = () => {
  const showBuffs = useScoreStore((state) => state.showBuffs);

  const { theme, isShopOpen, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  function toggleShowBuffs() {
    useScoreStore.setState({ showBuffs: !showBuffs });
  }

  return (
    <ButtonRetro onClick={toggleShowBuffs}>
      {showBuffs ? 'Hide Buffs' : 'Show Buffs'}
    </ButtonRetro>
  );
};
