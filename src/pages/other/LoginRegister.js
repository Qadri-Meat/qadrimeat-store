import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { login, register } from '../../redux/actions/authActions';
import { useToasts } from 'react-toast-notifications';
const LoginRegister = ({ location, history }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector((state) => state.authData);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ phone, password }, addToast));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register({ username, phone, password }, addToast));
  };

  const switchButtonHandler = (e) => {
    setPhone('');
    setUsername('');
    setPassword('');
  };
  return (
    <Fragment>
      <MetaTags>
        <title>tap-o | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="login"
                          onClick={switchButtonHandler}
                        >
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="register"
                          onClick={switchButtonHandler}
                        >
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={loginHandler}>
                              <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      '/forgot-password'
                                    }
                                  >
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={registerHandler}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
