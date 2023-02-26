import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/template/Login";
import Main from "./Main";
import { View } from "native-base";

export default function SignIn() {
  //example geting data from redux
  const { userStatus } = useSelector((state) => state.user);
  //console.log(userStatus);

  return (
    <View>
      {/* check if user loggin or not */}
      {userStatus ? (
        // user login redirect to dashboard
        <Main />
      ) : (
        // show login page to cm_new
        <Login />
      )}
    </View>
  );
}
