import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`
  border-radius: 0.2em;
  border-left: 0.6em solid ${theme.color.border};
  border-right: 0.6em solid ${theme.color.border};
  width: 80%;
  margin: 1em auto;
  padding: 4em 1em;
  background-color: ${theme.color.active};

  .group-card-title{
    font-weight: bold;
    font-family: ${theme.font.section};
    color : ${theme.color.font};
    text-align: center;
  }

`;
