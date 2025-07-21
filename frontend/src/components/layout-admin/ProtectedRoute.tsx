import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAppDispatch } from "@/state/redux";
import { saveUser } from "@/state";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRouteAdmin: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const token = Cookies.get("token");
  // console.log("this run 1");

  useEffect(() => {
    const stringifiedUser = localStorage.getItem("user");
    // console.log({ stringifiedUser });
    // console.log("this run inside useEffect");

    if (!stringifiedUser) {
      <Navigate to="/login" replace />;
      return;
    }

    const user = JSON.parse(stringifiedUser);
    // console.log({ user });

    if (
      !user ||
      !user.roles ||
      user.roles.length === 0 ||
      user.roles[0].name !== "admin"
    ) {
      <Navigate to="/login" replace />;
      return;
    }
    dispatch(saveUser(user));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};
