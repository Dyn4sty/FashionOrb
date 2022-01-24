import ShopActionTypes from "./shop.types";
import { addCommentToProduct } from "./shop.utils";
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
  isAdding: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.ADD_COMMENT_START:
      return {
        ...state,
        isAdding: true,
      };
    case ShopActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAdding: false,
        collections: addCommentToProduct(state.collections, action.payload),
      };
    case ShopActionTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
