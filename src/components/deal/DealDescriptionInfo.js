import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductCartQuantity } from '../../helpers/product';
import { addToCart1 } from '../../redux/actions/cart1Actions';
import Rating from '../product/sub-components/ProductRating';

const DealDescriptionInfo = ({
  deal,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalDealPrice,
  cart1Items,
  addToast,
  addToCart1,
}) => {
  const dealStock = deal.stock;
  const [quantityCount, setQuantityCount] = useState(1);

  const dealCartQty = getProductCartQuantity(cart1Items, deal);

  return (
    <div className="product-details-content ml-70">
      <h2>{deal.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{' '}
            <span className="old">
              {currency.currencySymbol + finalDealPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalDealPrice} </span>
        )}
      </div>
      {deal.rating && deal.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={deal.rating} />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="pro-details-list">
        <p>{deal.shortDescription}</p>
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount < dealStock - dealCartQty
                  ? quantityCount + 1
                  : quantityCount
              )
            }
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          {dealStock && dealStock > 0 ? (
            <button
              onClick={() => addToCart1(deal, addToast, quantityCount)}
              disabled={dealCartQty >= dealStock}
            >
              {' '}
              Add To Cart{' '}
            </button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
        </div>
      </div>
      {deal.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {deal.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + '/shop'}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {deal.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {deal.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + '/shop'}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

DealDescriptionInfo.propTypes = {
  addToCart1: PropTypes.func,
  addToast: PropTypes.func,
  cart1Items: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalDealPrice: PropTypes.number,
  deal: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart1: (item, addToast, quantityCount) => {
      dispatch(addToCart1(item, addToast, quantityCount));
    },
  };
};

export default connect(null, mapDispatchToProps)(DealDescriptionInfo);
