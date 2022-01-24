// import "./assets/css/vendor/bootstrap.min.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/Spinner/Spinner";
import "./index.css";
import App from "./App";
import "./Internationalization/i18n";
import { store, persistor } from "./redux/store";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
