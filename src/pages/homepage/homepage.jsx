import React from 'react';
import Directory from '../../components/directory/Directory'
import MyCarousel from '../../components/Carousel/Carousel'
import { HomePageContainer } from './hompage.styles'
// import './homepage.styles.scss';
const HomePage = () => {
  return (
  <HomePageContainer>
      <MyCarousel />
      <Directory/>
  </HomePageContainer>
  )
};

export default HomePage;