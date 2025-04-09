import { ButtonRetro } from '@/components/ui-retro/button-retro';
import bosses from '@/config/bosses.json';
import themes from '@/config/themes.json';
import { useGame } from '@/context/game-context';
import { useScoreStore } from '@/stores/useScoreStore';

export const ToggleTooltips = () => {
  const showTooltips = useScoreStore((state) => state.showTooltips);

  const { theme, isShopOpen, menu } = useGame();
  const color =
    themes.themes.find((b) => b.theme === theme) || themes.themes[0];
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  function toggleShowTooltips() {
    useScoreStore.setState({ showTooltips: !showTooltips });
  }

  return (
    <ButtonRetro onClick={toggleShowTooltips}>
      {showTooltips ? 'Hide' : 'Show'}
    </ButtonRetro>
  );
};
