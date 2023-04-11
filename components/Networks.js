/*
import { View, Text } from 'react-native'
import React from 'react'

const Networks = () => {
    return (
        <View>
            <Text>Networks</Text>
        </View>
    )
}

export default Networks
*/
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { Context } from "../utils/context";
import { useContext } from "react";

import { RNCONTROL_API_BASE_URL } from "../lib/Constants";
import axios from "axios";

import { ROUTES } from "../lib/Constants";

//SVGs
import RouterIcon from "../assets/icons/router-icon.svg";
import RouterIconConnected from "../assets/icons/router-icon-connected.svg";
import Arrow from "../assets/icons/Arrow 5.svg";
import TroubleshootIcon from "../assets/icons/troubleshoot-icon.svg";
import SpeedTestIcon from "../assets/icons/speedtest-icon.svg";

const Networks = ({ navigation }) => {
  //const [jwt, setJwt] = useState("")

  const { Logout, jwt } = useContext(Context);

  const [mainConfigDetails, setMainConfigDetails] = useState([]);
  const [routerInfo, setRouterInfo] = useState([]);

  const [ghz2_4PasswordShowStatus, setGhz2_4PasswordShowStatus] =
    useState(false);
  const [ghz5PasswordShowStatus, setGhz5PasswordShowStatus] = useState(false);

  const [routerManufacturer, setRouterManufacturer] = useState("");
  const [routerModelName, setRouterModelName] = useState("");
  const [routerSerialNumber, setRouterSerialNumber] = useState("");
  const [routerConnectionStatus, setRouterConnectionStatus] = useState("");

  const GoToSpeedtestPage = () => {
    navigation.navigate(ROUTES.MY_ACCOUNT.MY_ROUTER.NETWORK.SPEEDTEST, {});
  };

  const GoToTroubleshootDevicePage = () => {
    navigation.navigate(
      ROUTES.MY_ACCOUNT.MY_ROUTER.NETWORK.TROUBLESHOOT_A_DEVICE,
      {}
    );
  };

  const showPassword = (param) => {
    if (param === "2.4 Ghz SSID") {
      setGhz2_4PasswordShowStatus(true);
    } else if (param === "5 Ghz SSID") {
      setGhz5PasswordShowStatus(true);
    }
  };

  useEffect(() => {
    const getData = () => {
      /*
            fetch(RNCONTROL_API_BASE_URL + '/get.php', {
                method: "POST",
                headers: { "Authorization": `Bearer ${jwt}` }
            }).then(res => res.json()).then(json => console.log(json)).catch((err) => console.log(err));
            */

      fetch(RNCONTROL_API_BASE_URL + "/get.php", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.REPLY === undefined) {
            console.log("Networks page : Data NOT retrieved");
          } else {
            let REPLY = json.REPLY;
            let main_config = REPLY.main_config;
            console.log("Networks page : Data retrieved");
            setMainConfigDetails(REPLY.main_config);
            setRouterInfo(REPLY.info);

            //console.log({ mainConfigDetails });
            console.log({ routerInfo });

            {
              routerInfo.map((item, i) => {
                if (item.name === "Manufacturer") {
                  setRouterManufacturer(item.value);
                }
                if (item.name === "Model") {
                  setRouterModelName(item.value);
                }
                if (item.name === "Serial Number") {
                  setRouterSerialNumber(item.value);
                }
              });
            }

            console.log(routerManufacturer);
            console.log(routerModelName);
            console.log(routerSerialNumber);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(RNCONTROL_API_BASE_URL + "/is_recent_checkin.php", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Router Connection Status Data:");
          console.log(json.REPLY.online);

          setRouterConnectionStatus(json.REPLY.online);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  /*
    useEffect(() => {
        SecureStore.getItemAsync("jwt").then((res) => {
            console.log(res);
            setJwt(res);
        }).catch((err) => {
            console.log('Networks Page : Catch section : Logging out');
            console.log(err);
            navigation.replace("Home")
        })


    }, [])
    */

  /*  
    const API_URL  =   RNCONTROL_API_BASE_URL+'/get.php'
    console.log(jwt);
    header= 'Authorization: Bearer '+jwt;
    console.log(header);
 
    axios({
        method: 'post',
        url: `${API_URL}`,
        headers: '"Authorization": `Bearer ${jwt}`'
    }).then((response) => {

        console.log('DEVICE DATA:::');
        //console.log(response.data);
        let resp = response.data;
        
        if(resp.connected_hosts  !== undefined) {
           let connected_hosts = resp.connected_hosts;
        } else {
            alert('device data (connected hosts) is empty')
        }
        
        //console.log(connected_hosts.usage_up);
        //console.log(connected_hosts.usage_down);
    });*/

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/*
<View>
    <Text>main_config</Text>
    <Text>Total : {mainConfigDetails.length}</Text>
    {mainConfigDetails.map((item, i) => {
        return(
        <Text>{item.item_id}). {item.name}</Text>
        )
    })}
</View>

<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
<View>
*/}

        <View>
          <View style={styles.titileBox}>
            <Text style={styles.titleText}>WiFi Password</Text>
          </View>

          {mainConfigDetails.map((item, i) => {
            if (item.name === "2.4 Ghz SSID")
              return (
                <View style={styles.wifiPasswordBox}>
                  <View style={styles.wifiPasswordDetails}>
                    <View style={{ width: 250 }}>
                      <Text>{item.name}</Text>
                      <Text
                        style={{ color: "blue" }}
                        onPress={() => showPassword("2.4 Ghz SSID")}
                      >
                        See password{" "}
                      </Text>
                      {ghz2_4PasswordShowStatus === true ? (
                        <Text>
                          (Password : {mainConfigDetails[i + 1].value})
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    <View>
                      <Pressable onPress={() => someFunction(someValue)}>
                        <Arrow width={50} height={20} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );

            if (item.name === "5 Ghz SSID")
              return (
                <View style={styles.wifiPasswordBox}>
                  <View style={styles.wifiPasswordDetails}>
                    <View style={{ width: 250 }}>
                      <Text>{item.name}</Text>
                      <Text
                        style={{ color: "blue" }}
                        onPress={() => showPassword("5 Ghz SSID")}
                      >
                        See password{" "}
                      </Text>
                      {ghz5PasswordShowStatus === true ? (
                        <Text>
                          (Password : {mainConfigDetails[i + 1].value})
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    <View>
                      <Pressable onPress={() => someFunction(someValue)}>
                        <Arrow width={50} height={20} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
          })}

          <View style={styles.titileBox}>
            <Text style={styles.titleText}>Router</Text>
          </View>

          <View style={styles.routerBox}>
            <View>
              {routerConnectionStatus === true ? (
                <RouterIconConnected />
              ) : (
                <RouterIcon />
              )}
            </View>
            <View style={styles.routerDetailsBox}>
              <Text>
                Model: {routerManufacturer} - {routerModelName}
              </Text>
              <Text>SN: {routerSerialNumber}</Text>
              {routerConnectionStatus === true ? (
                <Text>Connected</Text>
              ) : (
                <Text>Not connected</Text>
              )}
            </View>
          </View>

          <View style={styles.separatorLine}></View>

          <View style={styles.titileBox}>
            <Text style={styles.titleText}>Tools</Text>
          </View>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ width: 20 }}>
              <SpeedTestIcon />
            </View>
            <View style={{ width: 250 }}>
              <Text style={{ marginLeft: 25 }}>Speed Test</Text>
            </View>
            <View>
              <Pressable onPress={() => GoToSpeedtestPage()}>
                <Arrow width={50} height={20} />
              </Pressable>
            </View>
          </View>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ width: 20 }}>
              <TroubleshootIcon />
            </View>
            <View style={{ width: 250 }}>
              <Text style={{ marginLeft: 25 }}>Troubleshoot a Device</Text>
            </View>
            <View>
              <Pressable onPress={() => GoToTroubleshootDevicePage()}>
                <Arrow width={50} height={20} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  titileBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
  },
  titleText: {
    fontWeight: 600,
  },
  wifiPasswordBox: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
  },
  wifiPasswordDetails: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  routerBox: {
    flexDirection: "row",
    padding: 10,
  },
  routerDetailsBox: {
    marginLeft: 20,
  },
  separatorLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
  },
});

export default Networks;
