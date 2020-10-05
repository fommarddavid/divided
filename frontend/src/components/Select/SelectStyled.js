import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`
  position: relative;
  margin: 0.5rem 0;
  
  .label{
    color: transparent;
    display: block;
    position: absolute;
    z-index: 1;
    left: 1.2rem;
    top: 1.4rem;
    font-family: ${theme.font.section};
    font-weight: bold;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    /* border: 0 !important; */
    background: #2c3e50;
    background-image: none;

    &::-ms-expand {
      display: none;
    }
  }

  .select{
    position: relative;
    display: flex;
    width: 100%;
    height: 4rem;
    background: ${theme.color.border};
    overflow: hidden;
    border-radius: .5rem;

    & select:focus{
      border-radius: .5rem;
      border:2px solid ${theme.color.active};
      color: ${theme.color.dark};

      & + .label{
        color: ${theme.color.active};
        transform: translateY(-1rem);
      }

      & select:not([value=""]) + .label {
        color: ${theme.color.active};
      }
    }
  }

  select{
    flex: 1;
    padding: .8rem 1.2rem;
    color: ${theme.color.dark};
    cursor: pointer;
    background: ${theme.color.border};
    font-family: ${theme.font.section};
    font-weight: bold;
    font-size: 1em;
  }

  .select::after { 
    /* Le pointeur du select */
    content: '';
    position: absolute;
    top: 50%; 
    margin-top: -3px;
    right: .75em;  
    display: block; 
    width: 0; height: 0;
    border-color: transparent;
    border-top-color: #444; 
    border-width: 6px;
    border-style: solid;
    pointer-events: none;
  }

  .select:hover::after{
      border-top-color: ${theme.color.active}; 
    }
`;
