import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2em auto;

  .form-input{
    margin-bottom: 1em;
    padding: 1em 2em;
    border-style: none;
    border:2px solid #fe9801;
    background-color: #F4FEFE;
  }

  .form-button{
    padding: 1em 2em;
    border-style: none;
    background-color: #00E6FF;
    font-family: 'Sunflower', sans-serif;
    font-size: 1em;
    color:#fff;

    &:hover{
      background-color: #fe9801;
    }
  }

  .form-links{
    display: flex;
    justify-content: center;
    margin-top: 0.5em;
    font-family: 'Sunflower', sans-serif;
    color: #00E6FF;

    a{
      display: inline-block;

      &:hover{
        color: #fe9801;
      }
    }
  }
`;
