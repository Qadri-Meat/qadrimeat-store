import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ProductDescriptionTab from '../../wrappers/product/ProductDescriptionTab';
import DealImageDescription from '../../wrappers/deal/DealImageDescription';

const Deal = ({ location, deal }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Qadri Meat</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Deal
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <DealImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          deal={deal}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={deal.fullDescription}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

Deal.propTypes = {
  location: PropTypes.object,
  deal: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    deal: state.dealData.deals.filter((single) => single.id === itemId)[0],
  };
};

export default connect(mapStateToProps)(Deal);
