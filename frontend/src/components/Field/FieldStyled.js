import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`
  margin: 0.5rem 0;
  position: relative;

  .label {
    display: block;
    position: absolute;
    left: 1.2rem;
    top: 1.4rem;
    transition: transform .3s;
    font-family: ${theme.font.section};
    font-weight: bold;
    color: ${theme.color.dark};
  }

  .input {
    height: 4rem;
    font-size: 1.2em;
    padding: .8rem 1rem;
    border-radius: .5rem;
    border: 2px solid ${theme.color.dark};
    width: 100%;
    color: ${theme.color.dark};

    &:focus, &:not([value=""]) {
      padding-top: 2rem;
      border-color: ${theme.color.active};

      & + .label {
        color: ${theme.color.active};
        transform: translateY(-1rem);
      }

      &:not([value=""]) + .label {
        color: ${theme.color.active};
      }
    }

`;
