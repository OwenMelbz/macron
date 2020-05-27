import { message } from 'antd';
import { clipboard } from 'electron';
import { app } from './config';

export const waitFor = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const emojiUrl = emoji => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.height = 64;
  canvas.width = 64;

  // Get the canvas context
  const context = canvas.getContext('2d');
  context.font = '64px serif';
  context.fillText(emoji, 0, 64);

  // Get the custom URL
  return canvas.toDataURL();
};

export const copy = text => {
  clipboard.writeText(text);
  message.info(`${text} copied to clipboard`);
};

const setDockVisible = visible => {
  const context = app();

  if (!context.dock) {
    return 'No dock support...';
  }

  if (visible) {
    context.dock.show();
  } else {
    context.dock.hide();
  }

  return true;
};

export const hideDock = () => setDockVisible(false);

export const showDock = () => setDockVisible(true);
