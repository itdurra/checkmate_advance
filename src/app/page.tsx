import { MainMenu } from '@/components/gamepages/main-menu';
import { GameProvider } from '@/context/game-context';

export default async function HomePage() {
  return (
    <GameProvider>
      <MainMenu></MainMenu>
    </GameProvider>
  );
}
