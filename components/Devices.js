import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../utils/context'
import PasueButton from "../assets/icons/Pausebutton.svg"
import Arrow from "../assets/icons/Arrow 5.svg"
const Devices = () => {
    const { devicesDetails } = useContext(Context)
    const activeDevices = devicesDetails.reduce((pre, cur) => {
        if (cur.interface === "Inactive") {
            return pre
        } else {
            return pre + 1
        }
    }, 0)
    const inActiveDevices = devicesDetails.length - activeDevices
    return (
        <SafeAreaView>
            <ScrollView style={styles.constainer}>

                <View style={styles.titile}>
                    <Text style={styles.text}>{activeDevices} Connected</Text>
                </View>

                {devicesDetails.map((device, i) => {
                    if (!(device.interface === "Inactive")) {
                        return (

                            <>

                                <View key={device.ip_address} style={styles.device} >
                                    <View>
                                        <Text>{device.host_name}</Text>
                                        <Text>{`connected to ${"test"}`} (HC)</Text>
                                    </View>
                                    <Pressable>

                                        <PasueButton />
                                    </Pressable>
                                    <Arrow />
                                </View>
                            </>
                        )
                    }
                })}
                <View style={styles.titile}>
                    <Text style={styles.text}>{inActiveDevices} not Connected</Text>
                </View>

                {devicesDetails.map((device, i) => {
                    if ((device.interface === "Inactive")) {
                        return (

                            <>

                                <View key={device.ip_address} style={styles.device} >
                                    <View>
                                        <Text>{device.host_name}</Text>
                                        <Text>{`connected to ${"test"}`}(HC)</Text>
                                    </View>
                                    <Arrow />
                                </View>
                            </>
                        )
                    }
                })}

            </ScrollView>
        </SafeAreaView>
    )
}
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
        borderBottomWidth: 2
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
        paddingVertical: 5

    }

})
export default Devices