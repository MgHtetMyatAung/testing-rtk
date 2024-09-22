/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { persister, store } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter } from "react-router-dom";

export default function TemplateProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter>{children}</BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
