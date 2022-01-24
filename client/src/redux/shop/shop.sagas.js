import { call, put, takeLatest, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
  addCommentFailure,
  addCommentSuccess,
} from "./shop.actions";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export function* fetchCollections() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* addCommentToFireStore({ payload: { item, comment } }) {
  try {
    const collectionRef = firestore
      .collection("collections")
      .doc(item.category.slice(0, 1).toUpperCase() + item.category.slice(1));
    const snapShot = yield collectionRef.get();
    const data = snapShot.data();
    data.items = data.items.map((productToFind) => {
      console.log(item.id, productToFind.id);
      if (productToFind.id === item.id) {
        return {
          ...productToFind,
          comments: [...productToFind.comments, comment],
        };
      }
      return productToFind;
    });
    collectionRef.set(data);
    yield put(addCommentSuccess(data));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}
export function* onFetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
}

export function* onAddCommentStart() {
  yield takeLatest(ShopActionTypes.ADD_COMMENT_START, addCommentToFireStore);
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart), call(onAddCommentStart)]);
}
