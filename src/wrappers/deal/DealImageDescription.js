import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../helpers/product';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import DealDescriptionInfo from '../../components/deal/DealDescriptionInfo';

const DealImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  deal,
  currency,
  cart1Items,
}) => {
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(deal.price, deal.discount);
  const finalDealPrice = +(deal.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            <ProductImageGallery product={deal} />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <DealDescriptionInfo
              deal={deal}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalDealPrice={finalDealPrice}
              cart1Items={cart1Items}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

DealImageDescription.propTypes = {
  cart1Items: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  deal: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cart1Items: state.cart1Data,
  };
};

export default connect(mapStateToProps)(DealImageDescription);
