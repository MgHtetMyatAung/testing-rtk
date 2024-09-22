import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { PERSIST } from "redux-persist";
import { persistConfig } from "./persist";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/extra/postSlice";
import errorReducer, {
  // removeErrorInfo,
  setErrorInfo,
} from "./slices/errorSlice";
import { baseApi } from "../api/config/baseApi";

// Step 2.1: Create an object to hold the reducers
const reducers = {
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

// Create the persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

// error handle
const rtkQueryErrorLogger = () => (next) => (action) => {
  if (action.type.endsWith("rejected")) {
    // console.log(action); // Log the rejected action
    if (action.payload?.status === 401) {
      // console.log(action.payload?.data?.message);
      next(setErrorInfo("global api error"));
    }
  } else if (action.type.endsWith("fulfilled")) {
    // console.log(action); // Log the fulfilled action
    // next(removeErrorInfo());
    // next(
    //   addErrorInfo({
    //     code: 401,
    //     message: "token expired",
    //   })
    // );
  }

  return next(action);
};

// Step 2.3: Configure the store dynamically
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, rtkQueryErrorLogger), // Spread middleware array into concat
  devTools: true,
});

setupListeners(store.dispatch);

export const persister = persistStore(store);
