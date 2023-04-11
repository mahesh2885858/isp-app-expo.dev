import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
//import PasueButton from "../assets/icons/Pausebutton.svg"
import Arrow from "../assets/icons/Arrow 5.svg";
import Mobile from "../assets/icons/mobileinactive.svg";
import TvIcon from "../assets/icons/tv.svg";
import { ROUTES } from "../lib/Constants";
import { RNCONTROL_API_BASE_URL } from "../lib/Constants";

import * as SecureStore from "expo-secure-store";

const Devices = ({ navigation }) => {
  const { devicesDetails, setDeviceDetails, Logout, jwt } = useContext(Context);
  const activeDevices = devicesDetails.reduce((pre, cur) => {
    if (cur.interface === "Inactive") {
      return pre;
    } else {
      return pre + 1;
    }
  }, 0);
  const inActiveDevices = devicesDetails.length - activeDevices;
  const GoToDevicePage = (device) => {
    navigation.navigate(ROUTES.MY_ACCOUNT.MY_ROUTER.DEVICES.DEVICE_DETAILS, {
      ip: device.ip_address,
      host_name: device.host_name,
      routerInterface: device.interface,
      mac_address: device.mac_address,
      signal_strength: device.signal_strength,
      usage_down: device.usage_down,
      usage_up: device.usage_up,
    });
  };



  useEffect(() => {
    const getData = () => {
      //alert(jwt)
      fetch(RNCONTROL_API_BASE_URL + "/get.php", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((res) => res.json())
        .then((json) => {

          if(json.REPLY === undefined) {
            console.log('Devices page : Data NOT retrieved');
          }
          else {
            let REPLY = json.REPLY;
            console.log('Devices page : Data retrieved');
            setDeviceDetails(REPLY.connected_hosts);    
          }      
        })
        .catch((err) => {
          console.log('Devices page data fetching : ERROR');
          console.log(err);
        });
    };
    getData();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.constainer}>
        <View style={styles.titile}>
          <Text style={styles.text}>{activeDevices} Connected</Text>
        </View>

        {devicesDetails.map((device, i) => {
          if (device.interface !== "Inactive") {

let tvDesktop = false;
let hostName = device.host_name;
if(device.interface==='Ethernet') {
  tvDesktop = true;
}
if(hostName==='Chromecast') {
  tvDesktop = true;
}
if( hostName.includes('Roku') === true ) {
  tvDesktop = true;
}       

            return (
              <View key={device.ip_address} style={styles.device}>
                <View style={styles.deviceDescription}>
                  <View
                    style={{
                      width: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {tvDesktop === true ? (
                      <TvIcon />
                    ) : (
                      <Mobile />
                    )}
                  </View>
                  <View>
                    <Text>{device.host_name}</Text>
                    <Text>{device.ip_address}</Text>
                  </View>
                </View>
                {/*
                                    <Pressable>
                                        <PasueButton />
                                    </Pressable>
                                    */}
                <Pressable onPress={() => GoToDevicePage(device)}>
                  <Arrow width={50} height={20} />
                </Pressable>
              </View>
            );
          }
        })}
        <View style={styles.titile}>
          <Text style={styles.text}>{inActiveDevices} not Connected</Text>
        </View>

        {devicesDetails.map((device, i) => {
          if (device.interface === "Inactive") {

let tvDesktop = false;
let hostName = device.host_name;
if(device.interface==='Ethernet') {
  tvDesktop = true;
}
if(hostName==='Chromecast') {
  tvDesktop = true;
}
if( hostName.includes('Roku') === true ) {
  tvDesktop = true;
}              

            return (
              <View key={device.ip_address} style={styles.device}>
                <View style={styles.deviceDescription}>
                  <View
                    style={{
                      width: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {tvDesktop === true ? (
                      <TvIcon />
                    ) : (
                      <Mobile />
                    )}
                  </View>
                  <View>
                    <Text>{device.host_name}</Text>
                    <Text>{device.ip_address}</Text>
                  </View>
                </View>
                <Pressable onPress={() => GoToDevicePage(device)}>
                  <Arrow width={50} height={20} />
                </Pressable>
              </View>
            );
          }
        })}
        <TouchableOpacity onPress={Logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  constainer: {
    height: "100%",
  },
  titile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
  },
  text: {
    fontWeight: 600,
  },
  device: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 5,
  },
  deviceDescription: {
    flexDirection: "row",
    minWidth: 250,
    // change the gap to change margin between icon and hostname
    gap: 30,
  },
});
export default Devices;
