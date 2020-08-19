import styled from "styled-components";

export const SignInContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin: auto 0 auto;
  text-align: center;
`;
export const TitleContainer = styled.h2`
  margin: 10px 0;
  font-family: blorado;
  font-weight: 800;
  text-align: center;
`;

export const SignInButtonsContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  @media screen and (max-width: 1250px) {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
  }
`;
