import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2em auto;

  .form-button{
    margin: 0.5rem 0;
    height: 4rem;
    padding: 1em 2em;
    font-size: 1.2em;
    border-style: none;
    border-radius: .5rem;
    background-color: ${theme.color.active};
    font-family: ${theme.font.section};
    font-size: 1em;
    font-weight: bold;
    color:${theme.color.border};

    &:hover{
      background-color: ${theme.color.border};
      color:  ${theme.color.active};
    }
  }

  .form-links{
    display: flex;
    justify-content: space-around;
    margin-top: 0.5em;
    font-family: ${theme.font.section};
    font-weight: bold;
    color: ${theme.color.border};

    a{
      display: inline-block;

      &:hover{
        color: ${theme.color.active};
      }
    }
  }

  .confirmation-message{
    text-align: center;
    color: green;
    font-family: ${theme.font.section};
    font-weight: bold;

    a {
      color: ${theme.color.font};

      &:hover {
        color: ${theme.color.active};
      }
    }
  }
`;
