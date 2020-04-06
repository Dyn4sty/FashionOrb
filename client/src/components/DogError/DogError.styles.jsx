import styled from 'styled-components';

export const ErrorImageOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover; 
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const ErrorImageHead = styled.h1`
  font-size: 36px;
  color: rgb(92, 119, 172);
  text-align: center;
  margin-bottom: 1em;
`;

export const ErrorImageText = styled.h2`
  font-size: ${({size}) => size};
  color: rgb(92, 119, 172);
  text-align: center;
`;
