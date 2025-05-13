import React from 'react';
import Image from 'next/image';

import { PopupRetro } from '@/components/ui-retro/popup-retro';
import hints from '@/config/hints.json';
import { useGame } from '@/context/game-context';

import { DifficultySelect } from '../difficulty-select';

interface TutorialPopupProps {
  isOpen: boolean;
  closeTutorialPopup: () => void;
}

export const TutorialPopup = ({
  isOpen,
  closeTutorialPopup,
}: TutorialPopupProps) => {
  const { menu, setMenu } = useGame();
  const randomHint =
    hints.hints[Math.floor(Math.random() * hints.hints.length)];

  return (
    <PopupRetro
      isOpen={isOpen}
      onClose={() => {
        closeTutorialPopup;
        if (menu === 'cutscene') {
          setMenu('storymode');
        }
        if (menu === 'practice_cutscene') {
          setMenu('practice');
        }
      }}
    >
      <div className='popup-body-div'>
        <p className='popup-title'>Tutorial</p>
        {menu === 'practice_cutscene' ? (
          <p className='popup-subtitle'>
            Practice Mode lets you hone your skills with any deck combo.
          </p>
        ) : (
          <p className='popup-subtitle'>
            CheckMate Advance combines chess gameplay with roguelike
            deckbuilding.
          </p>
        )}
      </div>
      <hr className='my-2 border-2 border-dashed border-[#c381b5]'></hr>
      <div className='h-[300px] space-y-2 overflow-y-scroll'>
        {/* How to Play Section */}
        <div className='text-center text-sm'>
          <p className='font-minecraft-bold text-base'>How to Play:</p>
          <ol className='mt-2 w-full max-w-md list-inside list-decimal px-2 text-left'>
            <li>Make a legal chess move each turn using the white pieces.</li>
            <li>
              Earn points based on your move&apos;s{' '}
              <span className='popup-tutorial-emphasis'>Piece Value</span> and{' '}
              <span className='popup-tutorial-emphasis'>Square Value</span>,
              boosted by your{' '}
              <span className='popup-tutorial-emphasis'>Advantage</span>{' '}
              multiplier.
            </li>
            <li>
              Reach the target{' '}
              <span className='popup-tutorial-emphasis'>Score</span> within 10
              turns to win the match.
            </li>
            <li>
              Buy <span className='popup-tutorial-emphasis'>Cards</span> to
              improve scoring, create combos, or trigger special effects.
            </li>
          </ol>
          {/* Image Section */}
          <div className='mt-2 flex flex-row items-center justify-center gap-2'>
            <Image
              src='/img/tutorial/image14.png'
              alt='Piece Value'
              width={200}
              height={120}
              className='rounded'
            />
            <Image
              src='/img/tutorial/image10.png'
              alt='Card Effect'
              width={200}
              height={120}
              className='rounded'
            />
          </div>
        </div>

        <div className='mt-2 text-left text-sm'>
          {/* Table Section */}
          <div className='text-center'>
            <p className='font-minecraft-bold text-base'>Key Terms:</p>
          </div>
          <table className='w-full max-w-md border-separate border-spacing-y-2'>
            <tbody>
              <tr>
                <td className='popup-tutorial-emphasis'>Piece Value</td>
                <td className='popup-tutorial'>
                  The value of a chess piece. The Queen has the highest base
                  value at 9.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Square Value</td>
                <td className='popup-tutorial'>
                  The value of a square on the board.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Advantage</td>
                <td className='popup-tutorial'>
                  A multiplier based on how many enemy pieces you&apos;ve
                  captured.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Score</td>
                <td className='popup-tutorial'>
                  (<span className='popup-tutorial-emphasis'>Piece Value</span>{' '}
                  +{' '}
                  <span className='popup-tutorial-emphasis'>Square Value</span>)
                  × <span className='popup-tutorial-emphasis'>Advantage</span>.
                  Reach the target Score to win a game.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Money</td>
                <td className='popup-tutorial'>
                  Used to purchase Cards. Each turn earns money, depending on
                  the piece moved.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Cards</td>
                <td className='popup-tutorial'>
                  Purchase cards in the shop for different effects. Cards modify
                  the values above.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        

        {/* Advanced Rules Section */}
        <div className='mt-4 text-left text-sm'>
          <p className='font-minecraft-bold text-center text-base'>Advanced:</p>
          <table className='w-full max-w-md border-separate border-spacing-y-2'>
            <tbody>
              <tr>
                <td className='popup-tutorial-emphasis'>Base Piece Values</td>
                <td className='popup-tutorial'>
                  Prior to any modifications piece values default to: Pawn (1),
                  Knight (3), Bishop (3), Rook (5), Queen (9). King (0)
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>Money Formula</td>
                <td className='popup-tutorial'>
                  You earn money at the end of each turn equal to the selected
                  piece&apos;s{' '}
                  <span className='popup-tutorial-emphasis'> Piece Value</span>{' '}
                  * 10 + 4.
                </td>
              </tr>
              <tr>
                <td className='popup-tutorial-emphasis'>
                  Advantage Calculation
                </td>
                <td className='popup-tutorial'>
                  Calculated as the total of your{' '}
                  <span className='popup-tutorial-emphasis'>Piece Values</span>{' '}
                  minus the total of your opponent&apos;s. Tied or losing
                  material results in your points being reduced by half.{' '}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr className='my-2 border-2 border-dashed border-[#c381b5]'></hr>

      {(menu === 'cutscene' || menu === 'practice_cutscene') && (
        <>
          <div className='font-minecraft-bold mb-2 text-center'>
            Choose your difficulty:
          </div>
          <DifficultySelect></DifficultySelect>
          <div className='popup-subtitle max-w-md'>
            Affects how strong your chess opponent is.
          </div>
        </>
      )}
    </PopupRetro>
  );
};
