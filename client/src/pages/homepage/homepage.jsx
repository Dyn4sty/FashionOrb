import React from "react";
import { Link } from "react-router-dom";
import Directory from "../../components/directory/Directory";
import BannerItem from "../../components/banner-item/banner-item";
import { HomePageContainer, ArivalWrapper } from "./hompage.styles";
import CustomButton from "../../components/custom-button/custom-button";
import { useTranslation } from "react-i18next";
import rootBanner from '../../assets/rootBanner.jpg'
import newArrivalBanner from '../../assets/MenuItems/newArrivalBanner.jpg'
import summerSale from '../../assets/MenuItems/SummerSaleBanner.jpg'

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <HomePageContainer>
      <BannerItem
        background={rootBanner}
        bannerheight="680px"
        bannertype="center"
      >
        <div className="flex_arrange">
          <p>{t(`homepage.Arrivals`)}</p>
          <h1>{t("homepage.Summer Trends")}</h1>
          <p> {t(`homepage.Eligible Items`)}</p>
          <CustomButton as={Link} to="/shop">
            Shop Now
          </CustomButton>
        </div>
      </BannerItem>
      <Directory />
      <ArivalWrapper>
        <BannerItem
          className="bannerItem"
          background={newArrivalBanner}
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
          background={summerSale}
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
