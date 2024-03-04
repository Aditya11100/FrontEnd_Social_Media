import React from "react";
import logo from "./logo.svg";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Search from "./screens/Search";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
