export const ADD_TO_CART1 = 'ADD_TO_CART1';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const DELETE_FROM_CART1 = 'DELETE_FROM_CART1';
export const DELETE_ALL_FROM_CART1 = 'DELETE_ALL_FROM_CART1';

//add to cart1
export const addToCart1 = (item, addToast, quantityCount) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Added To Cart', { appearance: 'success', autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART1,
      payload: {
        ...item,
        quantity: quantityCount,
      },
    });
  };
};
//decrease from cart1
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Item Decremented From Cart1', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart1
export const deleteFromCart1 = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed From Cart1', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_CART1, payload: item });
  };
};
//delete all from cart1
export const deleteAllFromCart1 = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed All From Cart1', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART1 });
  };
};

// get stock of cart1 item
export const cart1ItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};
