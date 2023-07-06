import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../utils/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(res => {
          console.log('CURRENT ADMIN RES')
          setOk(true)
        })
        .catch(err => {
          console.log('ADMIN ROUTE ERR', err)
          setOk(false)
        })
    }
  }, [user])

  return ok ? (
    <Outlet />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
