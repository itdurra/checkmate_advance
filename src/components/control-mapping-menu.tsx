'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'pixel-retroui';

import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

export const ControlMappingMenu = () => {
  const { level, mapping, setMapping } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const chessFiles = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const gameboyButtons = ["A", "B", "Start", "Select", "Up", "Down", "Left", "Right"];

  // Handles setting the mapping for a specific file index
  const handleSelect = (fileIndex: number, value: string) => {
    const newMapping = [...mapping];
    newMapping[fileIndex] = value;
    setMapping(newMapping);
    document.body.click(); // Simulate outside click to close the dropdown
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Chessboard Column</th>
          <th>Gameboy Button</th>
        </tr>
      </thead>
      <tbody>
        {chessFiles.map((file, index) => (
          <tr key={file}>
            <td>{file} File</td>
            <td>
              <DropdownMenu
                bg={boss.bg}
                textColor={boss.textColor}
                borderColor={boss.borderColor}
                shadowColor={boss.shadowColor}
              >
                <DropdownMenuTrigger>
                  {mapping[index] || "Select"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {gameboyButtons.map((button) => (
                    <DropdownMenuItem key={button}>
                      <div onClick={() => handleSelect(index, button)} className="w-full h-full cursor-pointer">
                        {button}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
