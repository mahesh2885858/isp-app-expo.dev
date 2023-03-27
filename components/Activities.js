import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';

import { Context } from "../utils/context"
import { useContext } from 'react';

import { RNCONTROL_API_BASE_URL } from '../lib/Constants';
import axios from 'axios';
import DeviceData from './test';

const Activities = ({ navigation }) => {
    const [jwt, setJwt] = useState("")

    const { Logout, setDeviceDetails } = useContext(Context)




    useEffect(() => {

        const getData = () => {

            /*
            fetch(RNCONTROL_API_BASE_URL + '/get.php', {
                method: "POST",
                headers: { "Authorization": `Bearer ${jwt}` }
            }).then(res => res.json()).then(json => console.log(json)).catch((err) => console.log(err));
            */

            fetch(RNCONTROL_API_BASE_URL + '/get.php', {
                method: "POST",
                headers: { "Authorization": `Bearer ${jwt}` }
            }).then(res => res.json())
                .then(json => {
                    let REPLY = json.REPLY;
                    let connected_hosts = REPLY.connected_hosts
                    console.log("activity", connected_hosts);
                    setDeviceDetails(connected_hosts)


                })
                .catch((err) => console.log(err));


        }
        if (jwt) {

            getData()
        } else {
            return
        }


    }, [jwt])
    useEffect(() => {
        SecureStore.getItemAsync("jwt").then((res) => {
            console.log(res);
            setJwt(res)
        }).catch((err) => {
            console.log('Catch section : Logging out');
            console.log(err);

            navigation.replace("Home")
        })


    }, [])



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
        
        if(resp.connected_hosts !== undefined) {
           let connected_hosts = resp.connected_hosts;
        } else {
            alert('device data (connected hosts) is empty')
        }
        
        //console.log(connected_hosts.usage_up);
        //console.log(connected_hosts.usage_down);
    });*/


    return (
        <View>
            <Text>Activities</Text>
            <TouchableOpacity onPress={Logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Activities