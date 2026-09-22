import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./products-slice/product.slice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from "redux-persist";
import storage from "./storage";


const rootReducer = combineReducers({
  product : productReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist : ['product']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const createBaseStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export type AppStore = ReturnType<typeof createBaseStore> & {
  __persistor: Persistor;
};


export const makeStore = (): AppStore => {
  const store = createBaseStore();
  (store as any).__persistor = persistStore(store);
  return store as AppStore;
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createBaseStore>["dispatch"];