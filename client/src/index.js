import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './components/Spinner/Spinner'
import { store, persistor } from "./redux/store";
import * as serivceWorker from "./serviceWorker";
import "./index.css";
import App from "./App";
// import "./Internationalization/i18n";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serivceWorker.register();
