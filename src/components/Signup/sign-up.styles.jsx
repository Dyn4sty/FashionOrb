import styled from 'styled-components'

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin: auto;
  @media (max-width: 1024px) {
    text-align: center;
    margin: 50px 0 0;
    width: auto;
  }
`
export const TitleContainer = styled.h2`
    margin: 10px 0;
`

export const SignInButtonsContainer = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    @media screen and (max-width: 1250px) {
        display: flex;
        flex-flow: column;
        justify-content: flex-start; 
    }

`