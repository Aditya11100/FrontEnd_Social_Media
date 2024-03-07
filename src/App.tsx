import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux";
import NavigationRoutes from "./NavigationRoutes/indes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationRoutes />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
