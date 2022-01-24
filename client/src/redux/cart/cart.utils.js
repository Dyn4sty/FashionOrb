export const addItemToCart = (cartItems, cartItemToAdd, quantityToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === cartItemToAdd.id) {
        if (quantityToAdd) {
          return {
            ...cartItem,
            quantity: quantityToAdd,
          };
        }
        return {
          ...cartItem,
          quantity: cartItem.quantity + (quantityToAdd || 1),
        };
      }

      return cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem) {
    // FiLtering through the `CartItems`
    // Removing Cart Items that's under 1 Quantity.
    // Decrementing `Cartitem`.
    return cartItems
      .filter(
        (cartItem) =>
          cartItem.id !== cartItemToRemove.id || cartItem.quantity > 1
      )
      .map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
  }
};
