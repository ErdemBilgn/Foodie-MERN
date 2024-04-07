import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function UseAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default UseAuth;
