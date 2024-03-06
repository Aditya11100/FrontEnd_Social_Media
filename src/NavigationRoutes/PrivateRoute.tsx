import React from "react";
import { useSelector } from "react-redux";
import Layout from "../component/Layout";
import { Navigate, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  showLayout: boolean;
  children: any;
}

const PrivateRoute = ({ showLayout, ...props }: PrivateRouteProps) => {
  const token = useSelector((state: any) => state?.loginReducer?.token);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [token]);

  if (token) {
    if (showLayout) return <Layout>{props?.children}</Layout>;
    else return props.children;
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default PrivateRoute;
