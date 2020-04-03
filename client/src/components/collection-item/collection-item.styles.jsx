import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button';

export const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  @media screen and (max-width: 800px) {
      width: 40vw;
  }

  &:hover {
      opacity: 0.85;
      display: flex;
      button {
      opacity: 0.85;
      display: flex;
    }
  }

  
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    border: 1px solid #000;
    background-image: url(${({backgroundImage}) => backgroundImage});
`

export const CollectionFooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`
export const AddButton = styled(CustomButton)`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 237px;
    display: none;

`
export const NameSpan = styled.span`
    width: 90%;
    margin-bottom: 15px;
`
export const PriceSpan = styled.span`
    width: 10%;
`