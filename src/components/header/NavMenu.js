import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? 'sidebar-menu'
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ''}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL}>{strings['home']}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/shop'}>
              {strings['shop']}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + '/shop?category=beef'}>
                  Beef
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/shop?category=mutton'}>
                  Mutton
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/shop?category=chicken'}>
                  Chicken
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + '/about'}>
              {strings['about_us']}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/contact'}>
              {strings['contact_us']}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
