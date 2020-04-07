import React, { useState, lazy, Suspense, useEffect} from 'react';
import { Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from '../../components/Spinner/Spinner';
import Product from '../../components/product-preview/Product'
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'))

const ShopPage = ({ fetchCollectionsStart, match, location}) => {

  useState(() => fetchCollectionsStart(), [fetchCollectionsStart])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const currentKey = location.pathname.split('/shop')[1] || '/'

  return (
    <Suspense fallback={<Spinner/>}>
      <TransitionGroup>
        <CSSTransition key={currentKey} timeout={{ enter:800, exit: 0 }} classNames="pageSlider">
        <div className="fades">
        <Switch>
          <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
          <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
          <Route path={`${match.path}/:collectionId/:itemId`} component={Product} />
        </Switch>
        </div>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  )

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default connect(null, mapDispatchToProps)(React.memo(ShopPage))
