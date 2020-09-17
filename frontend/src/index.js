// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Reset } from 'styled-reset';

// == Import : local
import store from './store';
import GlobalStyle from './components/GlobalStyle';
import App from './containers/App';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <BrowserRouter>
      <Reset />
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);

render(rootReactElement, document.getElementById('root'));
