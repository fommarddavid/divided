import { createGlobalStyle } from 'styled-components';
import theme from '../../styles/theme';

export default createGlobalStyle`
  body {
    background-color: ${theme.color.dark};
  }
`;
