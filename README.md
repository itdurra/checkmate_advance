# ♟️ Checkmate Advance by Ian Durra

 Try the game here at [CheckmateAdvance.com](https://checkmateadvance.com)

A Balatro-inspired chess experiment built with React, TypeScript, and open-source libraries. This is the first game I have made, and was built solely to learn. If you would like me to continue development on this project, let me know on [kofi: iandurra](https://ko-fi.com/iandurra#)

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
| Card Art | [Henrique Lazarini](https://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg) |
| UI Elements | [RetroUI](https://www.retroui.io/) | 
| Textures | [Fupi](https://opengameart.org/content/shiny-window-pane) |
| Music | Matthew A. Ivic |
| Sound Effects | Kenney.nl |


ℹ️ This project is not affiliated with any official chess organization.
All trademarks belong to their respective owners.