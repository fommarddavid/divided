import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`
    .form-error{
      text-align: center;
      font-family: ${theme.font.section};
      font-weight: bold;
      color:${theme.color.active};

      &-message--link{
        color: ${theme.color.border};

        &:hover{
          font-style: italic;
        }
      }
    }
`;
