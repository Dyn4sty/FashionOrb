import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/Orb.svg';

const HeaderContainerFixed = css`
  position: sticky;
    z-index: 5;
    background: #000000de;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.09);
    top: 0;
      .st0 {
        fill: #c6c6c6;
      }
  }

`
const CartIconFixed = css`
     div > svg > g > path {
        fill: white !important;
      }
      span {
        color:white;
      }
`

export const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: white;
  position: sticky;
  padding: 0 1rem;
  transition: all .8s ease 0s;
  flex-wrap: wrap;
  z-index: 3; 
  ${({fixed}) => fixed === "fixed" ? HeaderContainerFixed : ''}
`
export const LogoContainer = styled.svg`
    height: auto;
    width: auto;
    @media screen and (max-width: 800px) {
      width: auto;
      padding: 0px;
    }
`
export const LogoImage = styled(Logo)`
    width: 5vw;
    height: auto;
    min-width: 70px;
    min-height: 35px;
    margin-right: auto;
`
export const OptionsContainer= styled.div`
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media screen and (max-width: 320px) {
        width: 50%
    }
    ${({fixed}) => fixed ? CartIconFixed : ''}
`
export const OptionLink = styled(Link)`
    padding: 10px 8px;
    cursor: pointer;
    color: ${({fixed}) => fixed ? 'white' : 'black'};
`