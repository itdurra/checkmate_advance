# ♟️ Checkmate Advance

A Balatro-inspired chess experiment built with React, TypeScript, and open-source libraries. This was my first project in React and was built solely to learn. It has many bugs to improve but I am moving onto other projects! Try the game here at [CheckmateAdvance.com](https://checkmateadvance.com)

## Features
- Chess gameplay + Roguelike deck building game
- 80 unique upgradeable cards
- 9 story levels, endless mode, practice mode
- Retro pixel art, music, and sound effects

## Unfinished/Skipped Features
- Animations: the browser has finite animation resources and React Chessboard uses a lot of them. Adding additional animations lags the game, and I wasn't able to optimize it correctly, so removed it.
- Boss effects. Would be nice to have the boss rewards be random instead of hardcoded.
- and many more...

## Bugs/Known Issues
- codebase has significant tech debt / complexity due to architecture choices
- drag and drop in practice mode has errors occasionally
- and many more...

## Dependencies
### Core Libraries
| Library | Purpose |
|---------|---------|
| [chess.js](https://github.com/jhlywa/chess.js) | Chess logic |
| [react-chessboard](https://github.com/Clariity/react-chessboard) | Board rendering |
| [Stockfish.js](https://github.com/official-stockfish/Stockfish) | Chess AI |
| [Howler.js](https://github.com/goldfire/howler.js) | Audio |

### UI/Animation
- TailwindCSS
- Framer Motion
- Zustand (State management)

## Assets
| Asset Type | Source |
|------------|--------|
| Pixel Neon Chess Set | [Sharechess Project: therealqtpi & caderek ](https://sharechess.github.io) |
| UI Elements | [RetroUI](https://www.retroui.io/) | 
| Textures | [Fupi](https://opengameart.org/content/shiny-window-pane) |
| Music | Matthew A. Ivic |
| Sound Effects | Kenney.nl |


ℹ️ This project is not affiliated with any official chess organization.
All trademarks belong to their respective owners.