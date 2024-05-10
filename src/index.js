import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import app from "./firebase";
import { Provider } from "react-redux";
import { persistor, stroe } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
// {
//   /* react-router-dom 으로 App.js 감싸기 */
// }
// {
//   /* history API로 페이지간 이동이 가능하다 */
// }
root.render(
  <Provider store={stroe}>
    {/* redux에서 데이터 처리하는 동안 UI 지연 */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
