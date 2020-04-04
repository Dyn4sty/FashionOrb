import styled from 'styled-components'

export const HomePageContainer = styled.div`
    a{
        width: auto !important;
        min-width: auto !important;
        display: inline-block;
        margin-top: 2rem;
    }
    button{
        margin: 2rem auto 0;
    }
`;

export const ArivalWrapper = styled.div`
    margin: 2rem 0 2rem;
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  .bannerItem{
    padding:0px 20px;
    h1{
        font-weight: 700;
        font-size: 40px;
        margin: 1rem 0;
    }
    p{ 
        margin: 0;
    }
    button{
        margin:2rem auto 0;
    }
    @media (min-width: 768px) {
    margin-left: 3rem!important;
    }
  }
    
`