import styled from 'styled-components';
import theme from '../../styles/theme';

export default styled.div`

  .group-card {
    color : ${theme.color.font};
  }

  .group-title{
    border-radius: 0.2em;
    border-left: 0.6em solid ${theme.color.border};
    border-right: 0.6em solid ${theme.color.border};
    width: 80%;
    margin: 0 auto;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    font-family:${theme.font.title};
    background-color: ${theme.color.active};
  }

  .group-member{
    border-radius: 0.2em;
    border-left: 0.6em solid ${theme.color.border};
    border-right: 0.6em solid ${theme.color.border};
    width: 80%;
    background-color: ${theme.color.active};
    margin: 0.5em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-family: ${theme.font.title};
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.9em;
    }

    &-list{
      font-family: ${theme.font.section};

      &-item{
        display: flex;
        margin-bottom: 0.2em;
        justify-content: space-between;

        &-balance{
          font-weight: bold;
        }
      }
    }

    &-add{
      text-align: center;
    }
  }

  .group-expense{
    border-radius: 0.2em;
    border-left: 0.6em solid ${theme.color.border};
    border-right: 0.6em solid ${theme.color.border};
    background-color: ${theme.color.active};
    width: 80%;
    margin: 0.5em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-family: ${theme.font.title};
      margin-bottom: 0.9em;
    }

    &-list{
      font-weight: bold;
      font-family: ${theme.font.section};

      &-item{
        margin-bottom: 0.8em;
      }

      &-itemNameValue{
        display: flex;
        justify-content: space-between;
      }

      &-itemPayer{
        font-weight: normal;
      }
    }

    &-resume{
      display: flex;
      justify-content: space-between;

      &-title{
        font-family: ${theme.font.title};
        margin-bottom: 0.6em; 
      }

      &-value{
        font-family: ${theme.font.section};
        font-weight: bold;
        margin-bottom: 0.6em;
      }
    }

    &-add{
      text-align: center;
    }
  }

  .group-debt{
    border-radius: 0.2em;
    border-left: 0.6em solid ${theme.color.border};
    border-right: 0.6em solid ${theme.color.border};
    background-color: ${theme.color.active};
    width: 80%;
    margin: 0.5em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-family: ${theme.font.title};
      margin-bottom: 0.9em;
    }

    &-details{
      
      &-item{
        font-family: ${theme.font.section};
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5em;

        &-value{
          font-weight: bold;
        }
      }
    }
  }

  .nav-links{
    display: flex;
    justify-content: center;
    margin-top: 0.5em;
    font-family: ${theme.font.section};
    color: ${theme.color.font};
    a{
      display: inline-block;

      &:hover{
        color: ${theme.color.active};
      }
    }
  }
`;
