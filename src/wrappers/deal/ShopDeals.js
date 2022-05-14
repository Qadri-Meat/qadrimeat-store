import PropTypes from 'prop-types';
import React from 'react';
import DealgridList from './DealgridList';

const ShopDeals = ({ deals, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ''}`}>
        <DealgridList deals={deals} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopDeals.propTypes = {
  layout: PropTypes.string,
  deals: PropTypes.array,
};

export default ShopDeals;
