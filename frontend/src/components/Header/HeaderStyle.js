import styled from 'styled-components';

export default styled.header`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em auto;
  
  .app-header-img {
    width: 5em;
    position: relative;
    left: 2.6em;
    z-index:1;
  }
  .app-header-title {
    font-family: 'Sunflower', sans-serif;
    font-size: 3em;
    color: #fff;
    background-color: #00E6FF;
    padding: 0 0 0 1.8em; 
    position: relative;
    left: -0.8em;
  }
`;
