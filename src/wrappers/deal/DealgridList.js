import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCart1 } from '../../redux/actions/cart1Actions';
import DealGridListSingle from '../../components/deal/DealGridListSingle';

const DealGrid = ({
  deals,
  currency,
  addToCart1,
  cart1Items,
  sliderClassName,
  spaceBottomClass,
}) => {
  return (
    <Fragment>
      {deals.map((deal) => {
        return (
          <DealGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            deal={deal}
            currency={currency}
            addToCart1={addToCart1}
            cart1Item={
              cart1Items.filter((cart1Item) => cart1Item.id === deal.id)[0]
            }
            key={deal.id}
          />
        );
      })}
    </Fragment>
  );
};

DealGrid.propTypes = {
  addToCart1: PropTypes.func,
  cart1Items: PropTypes.array,
  currency: PropTypes.object,
  deals: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cart1Items: state.cart1Data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart1: (item, addToast, quantityCount) => {
      dispatch(addToCart1(item, addToast, quantityCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealGrid);
