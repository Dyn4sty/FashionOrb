import React from "react";
import './Carousel.styles.scss'
// reactstrap components
import { UncontrolledCarousel } from "reactstrap";

const carouselItems = [
  {
    src:
      "https://i1.adis.ws/i/boohooamplience/UK_IE_EU_Desktop_Primary?$homesplash_desktop_full_1x$",
    altText: "Slide 1",
    caption: ""
  },
  {
    src:
      "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    altText: "Slide 2",
    caption: ""
  },
  {
    src:
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    altText: "Slide 3",
    caption: ""
  }
];

class Carousel extends React.Component {
  render() {
    return (
      <>
        <UncontrolledCarousel items={carouselItems} />
      </>
    );
  }
}

export default Carousel;