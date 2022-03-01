import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { fetchOrder } from '../../redux/actions/orderActions';

const Order = ({ location, currency, match, history }) => {
  const { pathname } = location;
  const orderId = match.params.id;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderData);
  const { user } = useSelector((state) => state.authData);

  useEffect(() => {
    if (!order || order.id !== orderId) {
      dispatch(fetchOrder(orderId, addToast));
    }
  }, [dispatch, history, orderId, order, user]);

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
            {order ? (
              <Fragment>
                <div className="row pb-20">
                  <div className="col-md-6">
                    <h3>Shipping Details</h3>
                    <p>
                      <strong>Name: </strong> {order.shippingDetails.firstName}{' '}
                      {order.shippingDetails.lastName}
                    </p>
                    <p>
                      <strong>Email: </strong>{' '}
                      <a href={`mailto:${order.shippingDetails.email}`}>
                        {order.shippingDetails.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingDetails.address},{' '}
                      {order.shippingDetails.city}{' '}
                      {order.shippingDetails.postalCode},{' '}
                      {order.shippingDetails.country}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Payment Details</h3>

                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                      <p>
                        <strong>Payment Status: </strong>Paid on{' '}
                        {order.paidAt.substring(0, 10)}
                      </p>
                    ) : (
                      <p>
                        <strong>Payment Status: </strong>Not Paid
                      </p>
                    )}
                    {order.isDelivered ? (
                      <p>
                        <strong>Delivery Status: </strong>Delivered on{' '}
                        {order.deliveredAt.substring(0, 10)}
                      </p>
                    ) : (
                      <p>
                        <strong>Delivery Status: </strong>Not Delivered
                      </p>
                    )}
                  </div>
                </div>
                <h3 className="cart-page-title">Your Ordered Items</h3>

                <div className="row pb-20">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((item, key) => {
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      '/product/' +
                                      item.product
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.REACT_APP_API_URL +
                                        item.image[0]
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
                                      item.product
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                </td>
                                <td className="product-price-cart">
                                  <span className="amount">{item.price}</span>
                                </td>
                                <td className="product-price-cart">
                                  <span className="amount">
                                    {item.discount}
                                  </span>
                                </td>

                                <td className="product-quantity">
                                  {item.quantity}
                                </td>
                                <td className="product-subtotal">
                                  {item.quantity * (item.price - item.discount)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6"></div>

                  <div className="col-lg-4 col-md-6"></div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Order Total
                        </h4>
                      </div>
                      <h5>
                        Total products{' '}
                        <span>
                          {currency.currencySymbol +
                            order.totalPrice.toFixed(2)}
                        </span>
                      </h5>
                      <h5>
                        Shipping Price{' '}
                        <span>
                          {currency.currencySymbol +
                            order.shippingPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{' '}
                        <span>
                          {currency.currencySymbol +
                            (
                              Number(order.totalPrice) +
                              Number(order.shippingPrice)
                            ).toFixed(2)}
                        </span>
                      </h4>
                    </div>
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
