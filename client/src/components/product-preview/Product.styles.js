import styled from "styled-components";
import { Col } from "react-bootstrap";
export const MyContainer = styled.div`
  height: 100vh;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;
export const NewArrivalBadge = styled.p`
  background: green;
  width: 50px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  font-family: blorado !important;
  text-align: center;
  @media screen and (max-width: 768px) {
    align-self: center;
  }
`;
export const PriceContent = styled.p`
  color: #d01345;
  font-size: 26px;
  font-weight: bold;
  padding-top: 10px;
`;
export const StyledCol = styled(Col)`
  margin-top: 2em;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    text-align: center;
    ${"" /* align-items: center; */}
    flex-flow: column;
    margin-bottom: 2px;
    height: 50vh;
  }
`;
