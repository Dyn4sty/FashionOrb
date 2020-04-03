import styled, {css } from 'styled-components'
import CustomButton from '../custom-button/custom-button';

const CarDropDownShown = css`
visibility: visible;
transition-timing-function: ease-out;
transition: 0.25s;
/* Move into place */
transform: translateY(0);
`

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex !important;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  visibility: hidden;
  transition-timing-function: ease-in;
  transition: 0.2s;
  transform: translateY(-130%);
  ${({hidden}) => !hidden ? CarDropDownShown : ''}
`

export const EmptyMessageContainer = styled.span`
    font-size: 18px;
    margin: 50px auto;
`
export const CartDropdownButton = styled(CustomButton)`
  margin-top: auto;
`;
export const CartItemsContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    button {
    margin-top: auto;
    visibility: hidden;
  }
`