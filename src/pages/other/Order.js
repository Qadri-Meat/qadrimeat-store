import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getOrder } from '../../redux/actions/orderActions';
import { getDiscountPrice } from '../../helpers/product';

const Order = ({ location, currency, match, history }) => {
  const { pathname } = location;
  const orderId = match.params.id;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.orderData);
  const { user } = useSelector((state) => state.authData);

  useEffect(() => {
    dispatch(getOrder(orderId, addToast));
  }, [dispatch, history, orderId, user]);

  return (
    <Fragment>
      <MetaTags>
        <title>tap-o | Order</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Order
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {selectedOrder ? (
              <Fragment>
                <div className="row pb-20">
                  <div className="col-md-6">
                    <h3>Shipping Details</h3>
                    <p>
                      <strong>Name: </strong>{' '}
                      {selectedOrder.shippingDetails.firstName}{' '}
                      {selectedOrder.shippingDetails.lastName}
                    </p>
                    <p>
                      <strong>Phone: </strong>{' '}
                      {selectedOrder.shippingDetails.phone}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {selectedOrder.shippingDetails.address},{' '}
                      {selectedOrder.shippingDetails.city}{' '}
                      {selectedOrder.shippingDetails.postalCode},{' '}
                      {selectedOrder.shippingDetails.country}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Order Status</h3>

                    {selectedOrder.isPaid ? (
                      <p>
                        <strong>Paid: </strong>
                        <i
                          className="fa fa-check"
                          style={{ color: 'green' }}
                        ></i>
                      </p>
                    ) : (
                      <p>
                        <strong>Paid: </strong>
                        <i className="fa fa-times" style={{ color: 'red' }}></i>
                      </p>
                    )}
                    {selectedOrder.approvedAt ? (
                      <p>
                        <strong>Approved on: </strong>
                        {new Date(
                          selectedOrder.approvedAt
                        ).toLocaleDateString()}
                        ,{' '}
                        {new Date(
                          selectedOrder.approvedAt
                        ).toLocaleTimeString()}
                      </p>
                    ) : (
                      <p>
                        <strong>Approved: </strong>
                        <i className="fa fa-times" style={{ color: 'red' }}></i>
                      </p>
                    )}
                    {selectedOrder.deliveredAt ? (
                      <p>
                        <strong>Delivered on: </strong>
                        {new Date(
                          selectedOrder.deliveredAt
                        ).toLocaleDateString()}
                        ,{' '}
                        {new Date(
                          selectedOrder.deliveredAt
                        ).toLocaleTimeString()}
                      </p>
                    ) : (
                      <p>
                        <strong>Delivered: </strong>
                        <i className="fa fa-times" style={{ color: 'red' }}></i>
                      </p>
                    )}
                  </div>
                </div>
                <h3 className="cart-page-title">Your Ordered Items</h3>

                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.orderItems.map((orderItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              orderItem.price,
                              orderItem.discount
                            );
                            const finalProductPrice =
                              orderItem.price.toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice || 0
                            ).toFixed(2);

                            discountedPrice != null
                              ? (selectedOrder.totalPrice +=
                                  finalDiscountedPrice * orderItem.quantity)
                              : (selectedOrder.totalPrice +=
                                  finalProductPrice * orderItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      '/product/' +
                                      orderItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.REACT_APP_API_URL +
                                        orderItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      '/product/' +
                                      orderItem.id
                                    }
                                  >
                                    {orderItem.name}
                                  </Link>
                                  {orderItem.selectedProductColor &&
                                  orderItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {orderItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {orderItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {'Rs' + finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {'Rs' + finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {'Rs' + finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  {orderItem.quantity}
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        orderItem.quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (
                                        finalProductPrice * orderItem.quantity
                                      ).toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 mt-20">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products{' '}
                      <span>
                        {currency.currencySymbol +
                          selectedOrder.totalPrice.toFixed(2)}
                      </span>
                    </h5>
                    <h5>
                      Shipping Price{' '}
                      <span>
                        {currency.currencySymbol +
                          selectedOrder.shippingPrice.toFixed(2)}
                      </span>
                    </h5>
                    <h4 className="grand-totall-title">
                      Grand Total{' '}
                      <span>
                        {currency.currencySymbol +
                          selectedOrder.totalPrice.toFixed(2)}
                      </span>
                    </h4>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="error-area pt-40 pb-100">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 text-center">
                      <div className="error">
                        <h1>404</h1>
                        <h2>OPPS! PAGE NOT FOUND</h2>
                        <p>
                          Sorry but the page you are looking for does not exist,
                          have been removed, name changed or is temporarity
                          unavailable.
                        </p>
                        <form className="searchform mb-50">
                          <input
                            type="text"
                            name="search"
                            id="error_search"
                            placeholder="Search..."
                            className="searchform__input"
                          />
                          <button type="submit" className="searchform__submit">
                            <i className="fa fa-search" />
                          </button>
                        </form>
                        <Link
                          to={process.env.PUBLIC_URL + '/'}
                          className="error-btn"
                        >
                          Back to home page
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Order.propTypes = {
  currency: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Order);
