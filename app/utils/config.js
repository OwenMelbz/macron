import { app as electron, remote } from 'electron';
import pkg from '../package.json';

export const appPath = dir => {
  return (
    (process.env.NODE_ENV === 'development' ? `${__dirname}/..` : __dirname) +
    (dir ? `/${dir}` : '')
  );
};

export const app = () => electron || remote.app;

export const version = () => pkg.version;
