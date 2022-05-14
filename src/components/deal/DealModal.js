import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import { getProductCartQuantity } from '../../helpers/product';
import { Modal } from 'react-bootstrap';
import Rating from '../product/sub-components/ProductRating';
import { connect } from 'react-redux';

function DealModal(props) {
  const { deal } = props;
  const { currency } = props;
  const { discountedprice } = props;
  const { finaldealprice } = props;
  const { finaldiscountedprice } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  const [dealStock, setDealStock] = useState(deal.stock);
  const [quantityCount, setQuantityCount] = useState(1);

  const addToCart1 = props.addtocart1;

  const addToast = props.addtoast;
  const cart1Items = props.cartitems;

  const dealCartQty = getProductCartQuantity(cart1Items, deal);

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {deal.image &&
                    deal.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.REACT_APP_API_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {deal.image &&
                    deal.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.REACT_APP_API_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{deal.name}</h2>
                <div className="product-details-price">
                  {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + finaldiscountedprice}
                      </span>{' '}
                      <span className="old">
                        {currency.currencySymbol + finaldealprice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finaldealprice} </span>
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
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
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
                        onClick={() =>
                          addToCart1(deal, addToast, quantityCount)
                        }
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
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

DealModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart1: PropTypes.func,
  cart1items: PropTypes.array,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finaldealprice: PropTypes.number,
  onHide: PropTypes.func,
  deal: PropTypes.object,
  show: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cartData,
  };
};

export default connect(mapStateToProps)(DealModal);
