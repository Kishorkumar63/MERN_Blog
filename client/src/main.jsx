
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "../Store.jsx";
import { PersistGate } from "redux-persist/es/integration/react";
import { ThemeProvider } from "./compnents/ThemeProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
 
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  
);
