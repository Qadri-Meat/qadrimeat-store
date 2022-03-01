import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import bannerData from '../../data/banner/banner-twenty-two.json';
import BannerTwentyTwoSingle from '../../components/banner/BannerTwentyTwoSingle.js';

const BannerTwentyTwo = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-12"></div>
          <div className="col-sm-6 col-12">
            <div className={`single-banner`}>
              <Link>
                <img src="/assets/img/others/chicken.jpeg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerTwentyTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerTwentyTwo;
