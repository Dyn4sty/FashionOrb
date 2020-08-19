import styled from "styled-components";
import { ReactComponent as Orb } from "../../assets/Orb.svg";
export const SignPageContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0px 1rem;
  min-height: 60vh;
  justify-content: flex-start;
  margin: 30px auto;
  input {
    font-size: 14px;
  }
`;

export const RoutesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 47%;
  margin: 2rem auto;
  max-width: 10rem;
  a {
    font-weight: 500;
    font-size: 16px;
    color: #adadad;
    text-decoration: none;
    &.activetab {
      border-bottom: 2px solid #000;
      color: #000;
    }
  }
`;
export const Logo = styled(Orb)`
  height: auto;
  width: 150px;
  max-width: 230px;
  margin: 0rem auto 1rem;
  display: block;
  text-align: center;
`;
