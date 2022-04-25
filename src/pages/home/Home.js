import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import FeatureIconTwo from '../../wrappers/feature-icon/FeatureIconTwo';
import ImageSliderTwo from '../../wrappers/image-slider/ImageSliderOne';
import BannerTwentyOne from '../../wrappers/banner/BannerTwentyOne';
import CountDownThree from '../../wrappers/countdown/CountDownThree';
import HeroSliderTwentyThree from '../../wrappers/hero-slider/HeroSliderTwentyThree';
import TabProductSix from '../../wrappers/product/TabProductSeven';
import BannerTwentyTwo from '../../wrappers/banner/BannerTwentyTwo';

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Qadri Meat</title>
        <meta
          name="description"
          content="Pet food home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderTwentyThree />
        {/* banner */}
        <BannerTwentyOne spaceTopClass="pt-60" spaceBottomClass="pb-60" />
        {/* tab product */}
        <TabProductSix category="" />

        {/* featured icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />
        {/* image slider */}
        <ImageSliderTwo />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
