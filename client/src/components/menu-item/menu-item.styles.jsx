import styled from 'styled-components'

export const MenuItemContainer = styled.div`
height: ${({ size }) => (size ? '380px' : '240px')};
min-width: 30%;
height: 350px;
flex: 1 1 auto;
display: flex;
align-items: flex-end;
justify-content: flex-end;
background-position: center;
background-size: cover; 
margin: 0 7.5px 15px;
overflow: hidden;

&:hover {
    cursor: pointer;
    & .background-image{
        transform: scale(1.1);
        transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}
&:first-child {
margin-right: 7.5px;
}
&:last-child {
margin-left: 7.5px;
}
`;
MenuItemContainer.displayName = 'MenuItemContainer';

export const BackgroundImageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-blend-mode: overlay;
    background-color: #ffffff36; 
    background-size: cover ;
    background-position: center;
background-image: url(${({ imageUrl }) => imageUrl});
`;
BackgroundImageContainer.displayName = "BackgroundImageContainer"

export const ContentContainer = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute ;
`;

export const ContentTitle = styled.h1`
    font-weight: 800;
    margin-bottom: 6px;
    font-size: 23px;
    text-transform: capitalize;
    color: #000;
`;

export const ContentSubtitle = styled.h2`
    font-weight: lighter;
    font-size: 13px;
    color: #000;
`;
