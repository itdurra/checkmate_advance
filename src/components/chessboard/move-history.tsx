import { useScoreStore } from '@/stores/useScoreStore';

import { ButtonRetro } from '../ui-retro/button-retro';

export const MoveHistory = () => {
  const isPlayerTurn = useScoreStore((state) => state.isPlayerTurn);
  const bossProgress = useScoreStore((state) => state.bossProgress);
  const game = useScoreStore((state) => state.game);
  const historyPointer = useScoreStore((state) => state.historyPointer);
  const setHistoryPointer = useScoreStore((state) => state.setHistoryPointer);

  const moveCount = game.history().length;

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <div className="grid grid-cols-3 gap-2 w-full">
        <ButtonRetro
          onClick={() => {
            if (historyPointer != null && historyPointer > 0) {
              setHistoryPointer(historyPointer - 1);
            }
          }}
        >
          {'<'}
        </ButtonRetro>

        <ButtonRetro
          onClick={() => {
            setHistoryPointer(moveCount);
          }}
        >
          Live
        </ButtonRetro>

        <ButtonRetro
          onClick={() => {
            if (historyPointer != null && historyPointer < moveCount) {
              setHistoryPointer(historyPointer + 1);
            }
          }}
        >
          {'>'}
        </ButtonRetro>
      </div>
    </div>
  );
};
