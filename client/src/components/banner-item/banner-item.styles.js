import styled,{ css } from 'styled-components'

export const BannerWrapper = styled.div`
    background: url(${props => props.background});
    height: ${props => props.bannerheight ? props.bannerheight : '400px'};
    border-radius: 7px;
    background-position: center;
    background-size: cover;
    display:flex;
    margin: 0 2rem 1.5vw ;
    &:last-child {
        margin: 2rem;
    }
    &:nth-last-child(2) {
        margin: 2rem
    }
    @media (max-width: 768px) {
        margin: 2rem 0 !important;
    }
    ${props => props.bannertype === "center" ? 
    css`
        align-items: center;
        text-align:center;
        justify-content:center;
    ` : props.bannertype === "left" ? 
    css`
        align-items: center;
        justify-content:flex-start;
    `: css`
    align-items:center
    `
    };
    
    h1{
        font-weight: 700;
        font-size: 43px;
        margin: 1rem 0;
    }
    p{ 
        margin: 0;
    }
`