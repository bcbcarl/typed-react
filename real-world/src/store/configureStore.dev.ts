import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import api from "../middleware/api";
import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      let reducers: any = require("../reducers");
      const nextRootReducer = reducers.default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
