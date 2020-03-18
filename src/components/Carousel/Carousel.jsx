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
      "https://www.forever21.com/images/f21/us/en/web/20200207/0305_SpringVacay_D_M_200516_f21.jpg?1",
    altText: "Slide 2",
    caption: ""
  },
  {
    src:
      "https://i1.adis.ws/i/missguided/Spring_10_03_desktop?bg=rgb(254,245,240)&w=1920&qlt=60&fmt.jpeg.interlaced=true&upscale=false",
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