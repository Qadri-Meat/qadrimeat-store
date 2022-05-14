import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../helpers/product';
import Rating from '../product/sub-components/ProductRating';
import DealModal from './DealModal';

const DealGridListSingle = ({
  deal,
  currency,
  addToCart1,
  cart1Item,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(deal.price, deal.discount);
  const finalProductPrice = +(deal.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + '/deal/' + deal.id}>
              <img
                className="default-img"
                src={process.env.REACT_APP_API_URL + deal.image[0]}
                alt=""
                style={{
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              {deal.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.REACT_APP_API_URL + deal.image[1]}
                  alt=""
                />
              ) : (
                ''
              )}
            </Link>
            {deal.discount || deal.new ? (
              <div className="product-img-badges">
                {deal.discount ? (
                  <span className="pink">-{deal.discount}%</span>
                ) : (
                  ''
                )}
                {deal.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-action">
              {/* <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? 'active' : ''}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? 'Added to wishlist'
                      : 'Add to wishlist'
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div> */}
              <div className="pro-same-action pro-cart">
                {deal.stock && deal.stock > 0 ? (
                  <button
                    onClick={() => addToCart1(deal, addToast)}
                    className={
                      cart1Item !== undefined && cart1Item.quantity > 0
                        ? 'active'
                        : ''
                    }
                    disabled={cart1Item !== undefined && cart1Item.quantity > 0}
                    title={
                      cart1Item !== undefined ? 'Added to cart' : 'Add to cart'
                    }
                  >
                    {' '}
                    <i className="pe-7s-cart"></i>{' '}
                    {cart1Item !== undefined && cart1Item.quantity > 0
                      ? 'Added'
                      : 'Add to cart'}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              {/* <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div> */}
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + '/deal/' + deal.id}>
                {deal.name}
              </Link>
            </h3>
            {deal.rating && deal.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={deal.rating} />
              </div>
            ) : (
              ''
            )}
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>{' '}
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={process.env.PUBLIC_URL + '/deal/' + deal.id}>
                    <img
                      className="default-img img-fluid"
                      src={process.env.REACT_APP_API_URL + deal.image[0]}
                      alt=""
                    />
                    {deal.image.length > 1 ? (
                      <img
                        className="hover-img img-fluid"
                        src={process.env.REACT_APP_API_URL + deal.image[1]}
                        alt=""
                      />
                    ) : (
                      ''
                    )}
                  </Link>
                  {deal.discount || deal.new ? (
                    <div className="product-img-badges">
                      {deal.discount ? (
                        <span className="pink">-{deal.discount}%</span>
                      ) : (
                        ''
                      )}
                      {deal.new ? <span className="purple">New</span> : ''}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={process.env.PUBLIC_URL + '/deal/' + deal.id}>
                    {deal.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {discountedPrice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + finalDiscountedPrice}
                      </span>{' '}
                      <span className="old">
                        {currency.currencySymbol + finalProductPrice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finalProductPrice} </span>
                  )}
                </div>
                {deal.rating && deal.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={deal.rating} />
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {deal.shortDescription ? <p>{deal.shortDescription}</p> : ''}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {deal.stock && deal.stock > 0 ? (
                      <button
                        onClick={() => addToCart1(deal, addToast)}
                        className={
                          cart1Item !== undefined && cart1Item.quantity > 0
                            ? 'active'
                            : ''
                        }
                        disabled={
                          cart1Item !== undefined && cart1Item.quantity > 0
                        }
                        title={
                          cart1Item !== undefined
                            ? 'Added to cart'
                            : 'Add to cart'
                        }
                      >
                        {' '}
                        <i className="pe-7s-cart"></i>{' '}
                        {cart1Item !== undefined && cart1Item.quantity > 0
                          ? 'Added'
                          : 'Add to cart'}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Out of Stock
                      </button>
                    )}
                  </div>

                  <div className="shop-list-wishlist ml-10"></div>
                  <div className="shop-list-compare ml-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <DealModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deal={deal}
        currency={currency}
        discountedprice={discountedPrice}
        finaldealprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cart1item={cart1Item}
        addtocart1={addToCart1}
        addtoast={addToast}
      />
    </Fragment>
  );
};

DealGridListSingle.propTypes = {
  addToCart1: PropTypes.func,
  cart1Item: PropTypes.object,
  currency: PropTypes.object,
  deal: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default DealGridListSingle;
