// == Import npm
import React from 'react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

// == Import
import soleil from './soleil.svg';
import HeaderStyle from './HeaderStyle';

// == Composant

const Header = () => (
  <HeaderStyle>
    <Bounce top duration={2000}>
      <img className="app-header-img" src={soleil} alt="soleil" />
    </Bounce>
    <Fade right delay={1000}>
      <h1 className="app-header-title">D/v/ded</h1>
    </Fade>
  </HeaderStyle>
);

// == Export
export default Header;
