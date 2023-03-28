import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [jwt, setJwt] = useState("");
  const [devicesDetails, setDeviceDetails] = useState([]);
  const Logout = () => {
    SecureStore.deleteItemAsync("jwt")
      .then((res) => {
        setEmail("");
        setJwt("");
        setDeviceDetails([]);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("CONTEXT:");
        console.log(err);
      });
  };

  const value = {
    email,
    setEmail,
    jwt,
    setJwt,
    Logout,
    devicesDetails,
    setDeviceDetails,
  };
  useEffect(() => {
    console.log({ devicesDetails });
  }, [devicesDetails]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export default ContextProvider;
