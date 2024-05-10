import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { SignIn } from "./Signin";
import { Login } from "./Login";
import Performance from "./Performance";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./Profile";
import Admin from "./Admin";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/performance" element={<PrivateRoutes><Performance/></PrivateRoutes>}/>
        <Route path="/profile" element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
        <Route path="/admin" element={<PrivateRoutes><Admin/></PrivateRoutes>}/>
      </Routes>
    </>
  );
};
