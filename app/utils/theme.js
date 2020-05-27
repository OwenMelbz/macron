import darkMode from 'antd/dist/antd.dark.css';
import lightMode from 'antd/dist/antd.css';
import store from './store';

const styleSheet = () => document.getElementById('theme');

const getTheme = () => store.get('theme', 'light');

const getStyleSheet = theme => (theme === 'dark' ? darkMode : lightMode);

const updateStylesheet = theme => {
  styleSheet().setAttribute('href', getStyleSheet(theme));
};

export default () => updateStylesheet(getTheme());
