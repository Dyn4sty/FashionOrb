import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (prevoiusQuantity, { quantity: newQuantity}) =>
         prevoiusQuantity + newQuantity, 0
         )
)

export const SelectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (previousPrice, { price: newPrice, quantity: newQuantity}) =>
        previousPrice + (newPrice * newQuantity), 0
         )
)