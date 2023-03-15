import React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./redux/reducer";
import { Provider } from "react-redux";
import Home from "./Components/Home";
import ErrorPage from "./Components/ErrorPage";
import Welcome from "./Components/Welcome";
import RegisterForm from "./Components/RegisterForm";
import MyVehicles from "./Components/MyVehicles";
import AddVehicle from "./Components/AddVehicle";
import LoginPage from "./Components/LoginPage";
import Navigation from "./Components/Navigation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = createStore(rootReducer);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home/myvehicles" element={<MyVehicles />} />
          <Route path="/home/addvehicle" element={<AddVehicle />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
