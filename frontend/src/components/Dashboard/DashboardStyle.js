import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`
  .plus {
    display: flex;
    justify-content: space-around;

    h1{
      font-family: ${theme.font.title};
      font-size: 1.8em;
      color: ${theme.color.border};
    }
  }
`;
