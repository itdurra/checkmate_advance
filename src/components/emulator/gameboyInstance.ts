import { Gameboy } from "gameboy-emulator";

export const gameboy = new Gameboy();

// Disable keyboard inputs
/*
gameboy.keyboardManager.left = null;
gameboy.keyboardManager.right = null;
gameboy.keyboardManager.up = null;
gameboy.keyboardManager.down = null;
gameboy.keyboardManager.a = null;
gameboy.keyboardManager.b = null;
gameboy.keyboardManager.start = null;
gameboy.keyboardManager.select = null;

// Disable controller inputs
gameboy.controllerManager.left = -1;
gameboy.controllerManager.right = -1;
gameboy.controllerManager.up = -1;
gameboy.controllerManager.down = -1;
gameboy.controllerManager.a = -1;
gameboy.controllerManager.b = -1;
gameboy.controllerManager.start = -1;
gameboy.controllerManager.select = -1;
*/
// Override reportInput if necessary
//const originalReportInput = gameboy.input.reportInput.bind(gameboy.input);
//gameboy.input.reportInput = () => {
  //originalReportInput();
//};

// Utility functions to manage input state
export function resetInputState(input: Gameboy["input"]): void {
    input.isPressingUp = false;
    input.isPressingDown = false;
    input.isPressingLeft = false;
    input.isPressingRight = false;
    input.isPressingSelect = false;
    input.isPressingStart = false;
    input.isPressingA = false;
    input.isPressingB = false;
  }
  
export function sendDirectionalInputs(direction: string, input: Gameboy["input"]): void {
    resetInputState(input); // Reset inputs before sending
    switch (direction) {
    case "UP":
        input.isPressingUp = true;
        break;
    case "DOWN":
        input.isPressingDown = true;
        break;
    case "LEFT":
        input.isPressingLeft = true;
        break;
    case "RIGHT":
        input.isPressingRight = true;
        break;
    }
    console.log(input)
}
  
export function pressButton(button: string, input: Gameboy["input"]): void {
    resetInputState(input); // Reset inputs before pressing the button
    switch (button) {
      case "SELECT":
        input.isPressingSelect = true;
        break;
      case "START":
        input.isPressingStart = true;
        break;
      case "A":
        input.isPressingA = true;
        break;
      case "B":
        input.isPressingB = true;
        break;
    }
    console.log(input);
}