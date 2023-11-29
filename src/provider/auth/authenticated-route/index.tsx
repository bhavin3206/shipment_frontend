import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { To, useNavigate } from "react-router";
import type { RootState } from "../../../redux/store";

import { useSelector, useDispatch } from "react-redux";
interface AuthenticatedRouteProps {
  redirect: To;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  redirect,
}) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.authReducer.value
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate(redirect);
    }
  }, [isAuthorized, navigate, redirect]);

  if (isAuthorized) {
    return <Outlet />;
  }

  return null;
};

export default AuthenticatedRoute;
