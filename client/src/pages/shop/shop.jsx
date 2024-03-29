import React, { lazy, Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import Spinner from "../../components/Spinner/Spinner";
import ProductContainer from "../../components/product-preview/product.container";
import PublicRoute from "../../routes/public-route";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

export const ShopPage = ({ match, location }) => {
  const dispatch = useDispatch(fetchCollectionsStart);
  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  const currentKey = location.pathname.split("/shop")[1] || "/";

  return (
    <Suspense fallback={<Spinner />}>
      <TransitionGroup>
        <CSSTransition
          key={currentKey}
          timeout={{ enter: 800, exit: 0 }}
          classNames="pageSlider"
        >
          <div className="fades">
            <Switch location={location}>
              <PublicRoute
                restricted={false}
                exact
                path={`${match.path}`}
                component={CollectionsOverviewContainer}
              />
              <PublicRoute
                restricted={false}
                exact
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
              />
              <PublicRoute
                restricted={false}
                path={`${match.path}/:collectionId/:itemId`}
                component={ProductContainer}
              />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  );
};

export default React.memo(ShopPage);
