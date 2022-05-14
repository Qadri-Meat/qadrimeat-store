import uuid from 'uuid/v4';
import {
  ADD_TO_CART1,
  DECREASE_QUANTITY,
  DELETE_FROM_CART1,
  DELETE_ALL_FROM_CART1,
} from '../actions/cart1Actions';

const initState = [];

const cart1Reducer = (state = initState, action) => {
  const cart1Items = state,
    product = action.payload;

  if (action.type === ADD_TO_CART1) {
    // for non variant products
    if (product.variation === undefined) {
      const cart1Item = cart1Items.filter((item) => item.id === product.id)[0];
      if (cart1Item === undefined) {
        return [
          ...cart1Items,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cart1ItemId: uuid(),
          },
        ];
      } else {
        return cart1Items.map((item) =>
          item.cart1ItemId === cart1Item.cart1ItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
      // for variant products
    } else {
      const cart1Item = cart1Items.filter(
        (item) =>
          item.id === product.id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cart1ItemId
            ? product.cart1ItemId === item.cart1ItemId
            : true)
      )[0];

      if (cart1Item === undefined) {
        return [
          ...cart1Items,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cart1ItemId: uuid(),
          },
        ];
      } else if (
        cart1Item !== undefined &&
        (cart1Item.selectedProductColor !== product.selectedProductColor ||
          cart1Item.selectedProductSize !== product.selectedProductSize)
      ) {
        return [
          ...cart1Items,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cart1ItemId: uuid(),
          },
        ];
      } else {
        return cart1Items.map((item) =>
          item.cart1ItemId === cart1Item.cart1ItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cart1Items, product) =>
        cart1Items.filter(
          (cart1Item) => cart1Item.cart1ItemId !== product.cart1ItemId
        );
      return remainingItems(cart1Items, product);
    } else {
      return cart1Items.map((item) =>
        item.cart1ItemId === product.cart1ItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART1) {
    const remainingItems = (cart1Items, product) =>
      cart1Items.filter(
        (cart1Item) => cart1Item.cart1ItemId !== product.cart1ItemId
      );
    return remainingItems(cart1Items, product);
  }

  if (action.type === DELETE_ALL_FROM_CART1) {
    return cart1Items.filter((item) => {
      return false;
    });
  }

  return state;
};

export default cart1Reducer;
