import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import App from './components/App';
import './app.global.css';
import loadTheme from './utils/theme';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();

  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
});
