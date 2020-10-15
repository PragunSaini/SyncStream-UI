import React from 'react';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/HelloWorld/HelloWorld';

const App = () => {
  return <HelloWorld title="Hello from React Webpack" />;
};

export default hot(App);
