import React from "react";
import { Link } from "react-router-dom";
import Directory from "../../components/directory/Directory";
import BannerItem from "../../components/banner-item/banner-item";
import { HomePageContainer, ArivalWrapper } from "./hompage.styles";
import CustomButton from "../../components/custom-button/custom-button";

const HomePage = () => {
  return (
    <HomePageContainer>
      <BannerItem
        background="https://i.ibb.co/nP6R16G/S1.jpg"
        bannerheight="680px"
        bannertype="center"
      >
        <div className="flex_arrange">
          <p>New Arrivals</p>
          <h1>
            Enjoy This <br /> Summer Trends
          </h1>
          <p>On Eligible Items in order of $100 or more</p>
          <CustomButton as={Link} to="/shop">
            Shop Now
          </CustomButton>
        </div>
      </BannerItem>
      <Directory />
      <ArivalWrapper>
        <BannerItem
          className="bannerItem"
          background="https://i.ibb.co/vBBdqxq/slider1-hp4.jpg"
          bannerheight="400px"
          bannertype="left"
        >
          <div>
            <h1>
              New <br /> Arrival
            </h1>
            <p>On Eligible Items in stock for now</p>
          </div>
        </BannerItem>
        <BannerItem
          className="bannerItem"
          background="https://i.ibb.co/V9P7SDS/slider3-hp4.jpg"
          bannerheight="400px"
          bannertype="left"
        >
          <div>
            <h1>
              Summer <br /> Sales Off
            </h1>
            <p>On Eligible Items off pricess in stock</p>
          </div>
        </BannerItem>
      </ArivalWrapper>
    </HomePageContainer>
  );
};

export default HomePage;
