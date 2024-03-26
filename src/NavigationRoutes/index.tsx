import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/Login";
import SignUp from "../screens/Signup";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../screens/Dashboard";
import Search from "../screens/Search";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";
import { useSelector } from "react-redux";
import { setTokenHeader } from "../Service/api";

const NavigationRoutes = () => {
  const token = useSelector((state: any) => state?.loginReducer?.token);

  useEffect(() => {
    setTokenHeader(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute showLayout={true}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="search"
            element={
              <PrivateRoute showLayout={true}>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="messages"
            element={
              <PrivateRoute showLayout={true}>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute showLayout={true}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default NavigationRoutes;
