import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import FooterCopyright from '../../components/footer/FooterCopyright';
import FooterNewsletter from '../../components/footer/FooterNewsletter';

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ''
      } ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      } ${extraFooterClass ? extraFooterClass : ''} ${
        spaceLeftClass ? spaceLeftClass : ''
      } ${spaceRightClass ? spaceRightClass : ''}`}
    >
      <div className={`${containerClass ? containerClass : 'container'}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? 'col-xl-5 col-sm-8' : 'col-lg-4 col-sm-10'
            }`}
          >
            <div className="p-1">
              <i className="fa fa-phone" style={{ paddingRight: '8px' }} />
              <span>+92 304 4014345</span>
            </div>
            <div className="p-1">
              <i className="fa fa-envelope" style={{ paddingRight: '8px' }} />
              <span>
                <a href="mailto:qadrimeat@gmail.com">qadrimeat@gmail.com</a>
              </span>
            </div>
            <div className="p-1">
              <i
                className="fa fa-map-marker"
                style={{ paddingRight: '13px' }}
              />
              <span>
                Street 113, Sector N Dha Phase 1, Lahore, Punjab 54030,
                Pakistan.
              </span>
            </div>
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/logo.png"
              spaceBottomClass=""
            />
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
            }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/about'}>About us</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/contact'}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? 'footer-widget mb-30 ml-95'
                  : 'footer-widget mb-30 ml-50'
              }`}
            >
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>Returns</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '#/'}>
                      Support Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`${
              sideMenu ? 'col-xl-3 col-sm-8' : 'col-lg-4 col-sm-6'
            }`}
          >
            <div className="">
              <div className="contact-social text-center">
                <h3>Follow Us</h3>
                <ul>
                  <li>
                    <a href="//facebook.com">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="//pinterest.com">
                      <i className="fa fa-pinterest-p" />
                    </a>
                  </li>
                  <li>
                    <a href="//thumblr.com">
                      <i className="fa fa-tumblr" />
                    </a>
                  </li>
                  <li>
                    <a href="//vimeo.com">
                      <i className="fa fa-vimeo" />
                    </a>
                  </li>
                  <li>
                    <a href="//twitter.com">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? 'show' : ''}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default FooterOne;
