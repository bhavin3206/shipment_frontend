import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { To, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

interface UnauthenticatedRouteProps {
  redirect: To;
}

export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  redirect,
}) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.authReducer.value
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate(redirect);
    }
  }, [isAuthorized, navigate, redirect]);

  if (!isAuthorized) {
    return <Outlet />;
  }

  return null;
};

export default UnauthenticatedRoute;
