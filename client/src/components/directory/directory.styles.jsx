import styled from 'styled-components';

export const DirectoryMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 756px) {
    display: flex;
    flex-flow: column;
    justify-content: flex-start; 
  }
`