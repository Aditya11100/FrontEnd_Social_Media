import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux";
import NavigationRoutes from "./NavigationRoutes/indes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <NavigationRoutes />
      <ToastContainer />
    </Provider>
  );
}

export default App;
