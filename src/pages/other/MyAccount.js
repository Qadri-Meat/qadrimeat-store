import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useToasts } from 'react-toast-notifications';
import { updateUser, USER_RESET } from '../../redux/actions/userActions';
import { fetchOrders } from '../../redux/actions/orderActions';
const MyAccount = ({ location, history }) => {
  const { pathname } = location;

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user } = useSelector((state) => state.authData);
  const { success } = useSelector((state) => state.userData);
  const { results } = useSelector((state) => state.orderData);

  useEffect(() => {
    if (!user) {
      history.push('/login-register?redirect=my-account');
    } else if (success) {
      dispatch({ type: USER_RESET });
      setPassword('');
      setConfirmPassword('');
    } else {
      dispatch(fetchOrders(user.email, 1, 10, addToast));
    }
  }, [history, user, success]);

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(updateUser({ password }));
    } else {
      addToast("Password and Confirm Password doesn't match", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  return (
    <Fragment>
      <MetaTags>
        <title>tap-o | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form onSubmit={updatePasswordHandler}>
                            <div className="myaccount-info-wrapper">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password</label>
                                    <input
                                      type="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Password Confirm</label>
                                    <input
                                      type="password"
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Continue</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> My Orders{' '}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Fullname</th>
                                  <th scope="col">Paid</th>
                                  <th scope="col">Delivered</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {results ? (
                                  <>
                                    {results.map((order) => (
                                      <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
                                        <td>
                                          {order.shippingDetails.firstName}{' '}
                                          {order.shippingDetails.lastName}
                                        </td>
                                        <td>
                                          {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                          ) : (
                                            <i
                                              className="fa fa-times"
                                              style={{ color: 'red' }}
                                            ></i>
                                          )}
                                        </td>
                                        <td>
                                          {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                          ) : (
                                            <i
                                              className="fa fa-times"
                                              style={{ color: 'red' }}
                                            ></i>
                                          )}
                                        </td>
                                        <td>
                                          <Link
                                            to={
                                              process.env.PUBLIC_URL +
                                              '/order/' +
                                              order.id
                                            }
                                            className="btn btn-outline-secondary"
                                          >
                                            Details
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
