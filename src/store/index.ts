import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import saga from "./saga/saga";
const sagamiddleware = createSagaMiddleware();
const store= configureStore({
  reducer: rootReducer,
  middleware: () => [sagamiddleware, ...getDefaultMiddleware()],
});
sagamiddleware.run(saga);

export { store };
