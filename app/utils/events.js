import { app } from './config';

export const fire = name => app().emit(name);

export const off = (name, callback) => app().off(name, callback);

export const on = (name, callback) => app().on(name, callback);

export const once = (name, callback) => app().once(name, callback);
