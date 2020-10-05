import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.header`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
  
  .app-header-img {
    width: 5em;
    position: relative;
    left: 2.6em;
    z-index:1;
  }
  .app-header-title {
    font-family: ${theme.font.title};
    font-size: 3em;
    color: ${theme.color.border};
    background-color: ${theme.color.active};
    padding: 0 0 0 1.8em; 
    position: relative;
    left: -0.8em;
  }
`;
