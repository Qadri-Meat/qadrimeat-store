import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { getDiscountPrice } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { createOrder, ORDER_RESET } from '../../redux/actions/orderActions';

import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Loader from '../../components/loader/Loader';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  country: yup.string().required('Country is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Email is not valid'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
});

const Checkout = ({ location, cartItems, currency, history }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { success, order, loading, shippingDetails } = useSelector(
    (state) => state.orderData
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...shippingDetails,
      country: 'Pakistan',
      city: 'Lahore, Punjab',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_RESET });
      history.push(`/order/${order.id}`);
    }
  }, [history, success]);

  const onSubmit = (shippingDetails) => {
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    const orderItems = cartItems.map((item) => {
      return {
        product: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0,
        image: item.image,
      };
    });
    const newOrder = {
      orderItems: orderItems,
      shippingDetails: shippingDetails,
      paymentMethod: 'Cash on delivery',
      shippingPrice: 0,
      totalPrice: cartTotalPrice,
      isPaid: false,
    };
    dispatch(createOrder(newOrder, addToast));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>1sbc | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>First Name*</label>
                            <input
                              type="text"
                              {...register('firstName')}
                              className={`${
                                errors.firstName ? 'is-invalid' : ''
                              }`}
                            />
                            <div className="invalid-feedback">
                              {errors.firstName?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Last Name*</label>
                            <input
                              type="text"
                              {...register('lastName')}
                              className={`${
                                errors.lastName ? 'is-invalid' : ''
                              }`}
                            />
                            <div className="invalid-feedback">
                              {errors.lastName?.message}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address*</label>
                            <input
                              className={`billing-address ${
                                errors.country ? 'is-invalid' : ''
                              }`}
                              placeholder="House number and street name"
                              type="text"
                              {...register('address')}
                            />
                            <input type="text" {...register('city')} disabled />
                            <div className="invalid-feedback">
                              {errors.address?.message}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>Country*</label>
                            <select
                              {...register('country')}
                              className={`${
                                errors.country ? 'is-invalid' : ''
                              }`}
                              disabled
                            >
                              <option value="Pakistan">Pakistan</option>
                              {/* <option>Pakistan</option>
                              <option>Bahamas</option>
                              <option>Bahrain</option>
                              <option>Bangladesh</option>
                              <option>Barbados</option> */}
                            </select>

                            <div className="invalid-feedback">
                              {errors.country?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input type="text" {...register('postalCode')} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone*</label>
                            <input
                              type="text"
                              {...register('phone')}
                              className={`${errors.phone ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">
                              {errors.phone?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address</label>
                            <input
                              type="text"
                              {...register('email')}
                              className={`${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">
                              {errors.email?.message}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            placeholder="Notes about your order, e.g. special notes for delivery. "
                            name="message"
                            defaultValue={''}
                            {...register('notes')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );
                                const finalProductPrice = (
                                  cartItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{' '}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? currency.currencySymbol +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol +
                                  cartTotalPrice.toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button className="btn-hover" type="submit">
                          {loading ? <Loader /> : <span>Place Order</span>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/shop'}>
                        Shop Now
                      </Link>
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
