import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import LoginPage from './components/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import OtpPage from "./components/Otp"
import ContextProvider from './utils/context';
import Activities from "./components/Activities"
import Devices from './components/Devices';
import Networks from './components/Networks';
import Menu from "./assets/icons/menu.svg"
import Home from "./assets/icons/home.svg"
import HomeActive from "./assets/icons/home-active.svg"
import DevicesIcon from "./assets/icons/devices.svg"
import DevicesActiveIcon from "./assets/icons/devices-active.svg"
import ProfilesIcon from "./assets/icons/profiles.svg"
import ProfilesActiveIcon from "./assets/icons/profiles-active.svg"
import NetworkIcon from "./assets/icons/network.svg"
import NetworkActiveIcon from "./assets/icons/network-active.svg"
import HelpIcon from "./assets/icons/help.svg"
import HelpActiveIcon from "./assets/icons/help-active.svg"
import HelpDrawerIcon from "./assets/icons/help-drawer.svg"
import HelpDrawerActiveIcon from "./assets/icons/help-drawer-active.svg"
import InternetIcon from "./assets/icons/internet.svg"
import MyAccountIcon from "./assets/icons/myaccount.svg"
import MyAccountActiveIcon from "./assets/icons/myaccount-active.svg"
import InternetActiveIcon from "./assets/icons/internet-active.svg"
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: { padding: 10, height: 80, }, tabBarShowLabel: false
    }}

    >
      <Tab.Screen name="Activity"
        component={Activities}
        options={{
          tabBarIcon: ({ focused, color }) => focused ? <HomeActive /> : <Home />
        }}

      />
      <Tab.Screen name='Devices' component={Devices}
        options={{
          tabBarIcon: ({ focused, color }) => focused ? <DevicesActiveIcon /> : <DevicesIcon />
        }}
      />
      <Tab.Screen name='Profile' component={Activities}
        options={{
          tabBarIcon: ({ focused, color }) => focused ? <ProfilesActiveIcon /> : <ProfilesIcon />
        }}
      />
      <Tab.Screen name='Network' component={Activities}
        options={{
          tabBarIcon: ({ focused, color }) => focused ? <NetworkActiveIcon style={{ marginBottom: 12 }} /> : <NetworkIcon style={{ marginBottom: 12 }} />
        }}

      />
      <Tab.Screen name='Help' component={Activities}
        options={{
          tabBarIcon: ({ focused, color }) => focused ? <HelpActiveIcon /> : <HelpIcon />
        }}
      />
    </Tab.Navigator>
  )
}
function CustomDrawerContent(props) {
  return (


    <DrawerContentScrollView style={{ backgroundColor: "#0D82C4" }}  {...props}

    >
      <View style={{ marginTop: 45, marginLeft: 36, marginBottom: 35 }} >
        <Text style={{
          fontWeight: 700,
          color: "white",
          fontSize: 20
        }}>Menu</Text>
      </View>
      <DrawerItemList  {...props} />
    </DrawerContentScrollView>
  )

}
function MyDrawer() {
  return (

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerActiveBackgroundColor: "#fff",
        headerStyle: {
          backgroundColor: "#0D82C4"
        },

        headerLeft: () =>

          <Menu style={{ marginLeft: 30 }} onPress={navigation.toggleDrawer} width={34} height={34} />
        ,
        headerTitleStyle: { color: "white", fontSize: 18 },
        drawerLabelStyle: { display: "none" }

      })}
    >
      <Drawer.Screen name="My Account"

        options={{
          drawerIcon: ({ focused, color }) => focused ? <MyAccountActiveIcon style={{ marginLeft: 27 }} /> : <MyAccountIcon style={{ marginLeft: 27 }} />
        }}

        component={MyTabs} />
      <Drawer.Screen name="Internet"
        options={{
          drawerIcon: ({ focused, color }) => focused ? <InternetActiveIcon style={{ marginLeft: 27 }} /> : <InternetIcon style={{ marginLeft: 27 }} />
        }}
        component={Devices} />
      <Drawer.Screen name="Help"
        options={{
          drawerIcon: ({ focused, color }) => focused ? <HelpDrawerActiveIcon style={{ marginLeft: 27 }} /> : <HelpDrawerIcon style={{ marginLeft: 27 }} />
        }}
        component={Networks} />
    </Drawer.Navigator>

  );
}


const App = () => {

  return (

    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator  >

          <Stack.Screen options={{
            headerTitle: "Login"
          }} name="Login" component={LoginPage} />
          <Stack.Screen

            name="MyAccount" component={MyDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="OtpValidate" component={OtpPage} />

        </Stack.Navigator>

      </ContextProvider>
    </NavigationContainer>
  )

}

export default App