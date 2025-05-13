
import { useScoreStore } from '@/stores/useScoreStore';

import { FormulaDisplay } from './animations/formula-display';

const FormulaSequence = () => {
  const setAnimateFormula = useScoreStore((state) => state.setAnimateFormula);
  const animateFormula = useScoreStore((state) => state.animateFormula);
  const activeCards = useScoreStore((state) => state.activeCards);

  const score = useScoreStore((state) => state.score);
  const pieceScore = useScoreStore((state) => state.pieceScore);
  const squareScore = useScoreStore((state) => state.squareScore);
  const materialAdvantage = useScoreStore((state) =>
    state.getMaterialAdvantage()
  );

  const boardCards = activeCards.filter((c) => c.type === 'Board');
  const PieceCards = activeCards.filter((c) => {c.type === 'Buff' || c.type === 'Nerf'});
  const FormulaCards = activeCards.filter((c) => c.type === 'Formula');

  return (
    <>
      <FormulaDisplay
        show={animateFormula === 1}
        label='Piece Value'
        value={pieceScore}
        cards={PieceCards}
        onComplete={() => setAnimateFormula(2)}
      />
      <FormulaDisplay
        show={animateFormula === 2}
        label='Square Value'
        value={squareScore}
        cards={boardCards}
        onComplete={() => setAnimateFormula(3)}
      />
      <FormulaDisplay
        show={animateFormula === 3}
        label='Advantage'
        value={materialAdvantage}
        cards={FormulaCards}
        onComplete={() => setAnimateFormula(0)} //sequence over
      />
    </>
  );
};

export default FormulaSequence;
