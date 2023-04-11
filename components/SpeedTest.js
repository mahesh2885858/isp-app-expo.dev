import { View, Text } from 'react-native'
import React from 'react'


const SpeedTest = ({ route, navigation }) => {
    const { ip,
        host_name,
        routerInterface,
        mac_address,
        signal_strength,
        usage_down,
        usage_up,
    } = route.params
    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text>SpeedTest</Text>
            <Text> Ip: {ip}</Text>
            <Text> Host name: {host_name}</Text>
            <Text>routerInterface:{routerInterface}</Text>
            <Text>Mac: {mac_address}</Text>
            <Text>Signal strength: {signal_strength}</Text>
            <Text>Usage down:{usage_down}</Text>
            <Text>Usage up:{usage_up}</Text>

        </View>
    )
}


export default SpeedTest