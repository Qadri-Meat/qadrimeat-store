import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ''} ${
        colorClass ? colorClass : ''
      }`}
    >
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + '/'}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://hasthemes.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Qadri Meat
        </a>
        . All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
