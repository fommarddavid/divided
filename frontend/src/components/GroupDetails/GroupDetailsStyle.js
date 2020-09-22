import styled from 'styled-components';

export default styled.div`

  .group-card {
    border-radius: 0.2em;
    box-shadow: 0px 0px 5px 2px rgba(0,230,255,0.50);
    width: 80%;
    margin: 1em auto;
    padding: 1em;
  }

  .group-title{
    border-radius: 0.2em;
    box-shadow: 0px 0px 5px 2px rgba(0,230,255,0.50);
    width: 95%;
    margin: 1em auto;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    font-family: 'Sunflower', sans-serif;
    color : #fe9801;
  }

  .group-member{
    border-radius: 0.2em;
    box-shadow: 0px 0px 5px 2px rgba(0,230,255,0.50);
    width: 95%;
    margin: 1em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-family: 'Sunflower', sans-serif;
      font-weight: bold;
      color : #fe9801;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5em;
    }

    &-list{
      font-weight: bold;

      &-item{
        display: flex;
        justify-content: space-between;
      }
    }

    &-add{
      text-align: center;
    }
  }

  .group-expense{
    border-radius: 0.2em;
    box-shadow: 0px 0px 5px 2px rgba(0,230,255,0.50);
    width: 95%;
    margin: 1em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-weight: bold;
      font-family: 'Sunflower', sans-serif;
      margin-bottom: 1.5em;
      color : #fe9801;
    }

    &-list{
      font-weight: bold;

      &-item{
        margin-bottom: 1.5em;
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
      font-weight: bold;
    }

    &-add{
      text-align: center;
    }
  }

  .group-debt{
    border-radius: 0.2em;
    box-shadow: 0px 0px 5px 2px rgba(0,230,255,0.50);
    width: 95%;
    margin: 1em auto;
    padding: 1em;

    &-title{
      text-align: center;
      font-weight: bold;
      font-family: 'Sunflower', sans-serif;
      margin-bottom: 1.5em;
      color : #fe9801;
    }

    &-details{
      
      &-item{
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5em;

        &-value{
          color : #fe9801;
        }
      }
    }
  }

  .nav-links{
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
