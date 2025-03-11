'use client';

import { useRef } from 'react';
import localforage from 'localforage';
import {
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'pixel-retroui';

import { gameboy } from '@/components/emulator/gameboyInstance';
import { colors } from '@/components/emulator/pallete';
import bosses from '@/config/bosses.json';
import { useGame } from '@/context/game-context';

export const Emulator = () => {
  const { level } = useGame();
  const boss = bosses.bosses.find((b) => b.level === level) || bosses.bosses[0];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadRom = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files) return;

    const file = fileInputRef.current.files[0];
    if (!file) return;

    console.log('Loading ROM:', file.name);

    // Convert file to ArrayBuffer
    const rom = await fileToArrayBuffer(file);
    gameboy.loadGame(rom);

    // Enable sound
    gameboy.apu.enableSound();

    // Set color palette
    gameboy.gpu.colors = colors['retro'];

    // Log CPU operations
    for (const operation of gameboy.cpu.operationMap.values()) {
      console.log(operation.instruction);
    }

    // Handle rendering on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        gameboy.onFrameFinished((imageData: ImageData) => {
          context.putImageData(imageData, 0, 0);
        });
      }
    }

    // Run the emulator
    gameboy.run();
  };

  return (
    <Card
      bg={boss.bg}
      textColor={boss.textColor}
      borderColor={boss.borderColor}
      shadowColor={boss.shadowColor}
      className='h-full p-3 text-center'
    >
      <DropdownMenu>
        <DropdownMenuTrigger bg='#E0EFF2' className='transition-colors duration-200 hover:bg-blue-100'>
          File Options
        </DropdownMenuTrigger>
        <DropdownMenuContent bg='#E0EFF2' className='w-48'>
          <DropdownMenuItem className='transition-colors duration-200 hover:bg-blue-100'>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>📄</span>
              <span>New File</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className='transition-colors duration-200 hover:bg-blue-100'>
            <div
              className='flex items-center gap-2'
              onClick={() => fileInputRef.current?.click()} // This triggers file input
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type='file'
                className='hidden-file-input'
                style={{ display: 'none' }}
                accept='.gb,.gbc'
                onChange={loadRom}
              />
              <span className='text-lg'>📁</span>
              <span>Open Folder</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='transition-colors duration-200 hover:bg-blue-100'>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>💾</span>
              <span>Save</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='emulator-container'>
        <canvas 
            ref={canvasRef} 
            width={160} 
            height={144} 
            className='screen w-full' />
      </div>
    </Card>
  );
};

// Helper function to convert file to ArrayBuffer
const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error('Error parsing file'));
    };
    fileReader.readAsArrayBuffer(file);
  });
};
