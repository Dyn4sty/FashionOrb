import React from 'react';
import './homepage.styles.scss';
import Directory from '../../components/directory/Directory'
import MyCarousel from '../../components/Carousel/Carousel'
// import {Container, Row, Col } from 'react-bootstrap'
const HomePage = () => {
  return (
    
  <div className='container-fluid homepage'>
      <MyCarousel />
      <Directory/>
  </div>
  )
};

export default HomePage;