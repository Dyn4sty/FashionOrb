import { call, put, takeLatest, all } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions'
import {
    firestore,
    convertCollectionsSnapshotToMap
  } from '../../firebase/firebase.utils';
  
export function* fetchCollections() {
  try {
    const collectionRef = firestore.collection('collections');
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

export function* onFetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
  }

export function* shopSagas() {
  yield all([
    call(onFetchCollectionsStart)
  ]);
}