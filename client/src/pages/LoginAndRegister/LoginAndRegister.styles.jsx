import styled from 'styled-components'


export const SignPageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 30px;
    @media (max-width: 1024px) {
            display: flex;
            flex-flow: column;
            justify-content: center; 
    }
`;