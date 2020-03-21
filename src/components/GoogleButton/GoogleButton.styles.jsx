import styled from 'styled-components'

export const GoogleButtonContainer = styled.button`
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.54);
    width: auto!important;
    min-width: 240px;
    margin-left: 1vw!important;
    border: none; 
    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;
    font-size: 16px;
    line-height: 48px;
    display: block;
    border-radius: 1px;
    transition: background-color 0.218s ease 0s,
    border-color 0.218s ease 0s,
    box-shadow 0.218s ease 0s;
    font-family: Roboto,
    arial,
    sans-serif;
    cursor: pointer;
    user-select: none;
    padding: 0px;
    &:hover {
    box-shadow: rgba(66, 133, 244, 0.3) 0px 0px 3px 3px;
  }
    @media screen and (max-width: 1250px) {
        margin-left: 0 !important;
        margin-top: 3vw;
    }

`
export const GoogleIconWrapper = styled.div`
    width: 48px;
    height: 48px;
    text-align: center;
    display: block;
    margin-top: 1px;
    margin-left: 1px;
    float: left;
    background-color: rgb(255, 255, 255);
    border-radius: 1px;
    white-space: nowrap;
`