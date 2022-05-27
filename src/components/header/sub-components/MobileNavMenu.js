import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL}>{strings['home']}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/shop'}>{strings['shop']}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/deals'}>Deals</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/about'}>About Us</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/contact'}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
