import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button';

export const CollectionItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 420px;
    align-items: center;
    position: relative;
  &:hover {
      opacity: 0.85;
      button {
      opacity: 0.85;
      display: flex;
    }
  }

  
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 320px;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    background-image: url(${({backgroundImage}) => backgroundImage});
`

export const CollectionFooterContainer = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 15px;
`
export const AddButton = styled(CustomButton)`
    width:80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none

`
export const NameSpan = styled.span`
    margin-bottom: 1px;
    margin-top: 1rem;
    display: block;
`
export const PriceSpan = styled.span`
    display: block;
    font-weight: 700;
`