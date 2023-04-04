import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

import jwtDecode from "jwt-decode";
import { RNCONTROL_API_BASE_URL, ROUTES } from "../lib/Constants";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [jwt, setJwt] = useState("");
  const [devicesDetails, setDeviceDetails] = useState([]);
 
 /* 
  const checkAndRenewJWT = () => {

    SecureStore.getItemAsync("jwt").then((res) => {
      if (res) {
          //navigation.replace("Dashboard")
          let existingJWT = res;
          let jwtValidity = jwtDecode(existingJWT); //jwtDecode(existingJWT, { body: true })
          let jwtExp = jwtValidity.exp;
          let currentTimeStamp = Math.floor(Date.now() / 1000);
          let remainingSeconds = jwtExp - currentTimeStamp;

          console.log('remainingSeconds=' + remainingSeconds);


          let renewJWT = false;
          if(remainingSeconds <= 0 ) {
            renewJWT = true;
          }
          if(remainingSeconds > 0 && remainingSeconds <=30) {
            renewJWT = true;
          }
          
          if(renewJWT === true) {
            console.log('Have to renew JWT');

  fetch(RNCONTROL_API_BASE_URL + '/jwt_renew.php', {
    method: "POST",
    headers: { "Authorization": `Bearer ${existingJWT}` }
  }).then(res => res.json())
    .then(json => { 
        console.log('renew token API response : ');
        console.log({json});
        if(json.ERROR !== '') {
          console.log('Can not renew JWT as old one expired. Need to re-login');
          navigation.navigate(ROUTES.LOGIN);
        } else {
          SetJwt(json.JWT);
          navigation.navigate(ROUTES.MY_ACCOUNT.HOME);
        }
    })
    .catch((err) => {
      if(err) {
        console.log('JWT renew API call catch section : ' + err);

        navigation.navigate(ROUTES.LOGIN);
      }      
    });
            
          } //IF ends here
      else { //If the JWT needs not renew
        //console.log(existingJWT);
  
        console.log('Need not renew JWT. Move on with existing ones...')
        

        SecureStore.getItemAsync("email").then((res) => {
          setEmail(res);
        console.log(email)
          }).catch((err) => {
        
          });
          SecureStore.getItemAsync("jwt").then((res) => {
            setJwt(res);
            console.log(jwt)
            }).catch((err) => {
          
            });                   
        
            console.log('===');

        navigation.navigate(ROUTES.MY_ACCOUNT.HOME);
      }
          
  
      } else {
          console.log('No jwt found please login now');
          navigation.navigate(ROUTES.LOGIN);
      }
  }).catch((err) => {

      console.log('In catch section - secure storage check of jwt');
      console.log(err);
  })
 

  };
*/


const checkAndRenewJWT = async () => {
  try {
    const res = await SecureStore.getItemAsync("jwt");
    if (res) {
      //navigation.replace("Dashboard")
      let existingJWT = res;
      let jwtValidity = jwtDecode(existingJWT); //jwtDecode(existingJWT, { body: true })
      let jwtExp = jwtValidity.exp;
      let currentTimeStamp = Math.floor(Date.now() / 1000);
      let remainingSeconds = jwtExp - currentTimeStamp;

      console.log("remainingSeconds=" + remainingSeconds);

      let renewJWT = false;
      if (remainingSeconds <= 0) {
        renewJWT = true;
      }
      if (remainingSeconds > 0 && remainingSeconds <= 30) {
        renewJWT = true;
      }

      if (renewJWT === true) {
        console.log("Have to renew JWT");

        const resData = await fetch(RNCONTROL_API_BASE_URL + "/jwt_renew.php", {
          method: "POST",
          headers: { Authorization: `Bearer ${existingJWT}` },
        });
        const resJson = await resData.json();

        console.log("renew token API response : ");
        console.log({ resJson });
        if (resJson.ERROR !== "") {
          console.log("Can not renew JWT as old one expired. Need to re-login");
          navigation.navigate(ROUTES.LOGIN);
        } else {
          SetJwt(ResJson.JWT);
          navigation.navigate(ROUTES.MY_ACCOUNT.HOME);
        }
      } //IF ends here
      else {
        //If the JWT needs not renew
        //console.log(existingJWT);

        console.log("Need not renew JWT. Move on with existing ones...");

        const resEmail = await SecureStore.getItemAsync("email");

        setEmail(resEmail);
        console.log(email);

        const resJwt = SecureStore.getItemAsync("jwt");

        setJwt(resJwt);
        console.log(jwt);

        console.log("===");

        navigation.navigate(ROUTES.MY_ACCOUNT.HOME);
      }
    } else {
      console.log("No jwt found please login now");
      navigation.navigate(ROUTES.LOGIN);
    }
  } catch (err) {
    console.log(err);
  }
};


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
    checkAndRenewJWT,
  };
  useEffect(() => {
    console.log({ devicesDetails });
  }, [devicesDetails]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export default ContextProvider;
