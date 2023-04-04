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
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';

import { Context } from "../utils/context"
import { useContext } from 'react';

import { RNCONTROL_API_BASE_URL } from '../lib/Constants';
import axios from 'axios';

const Networks = ({ navigation }) => {
    const [jwt, setJwt] = useState("")

    const { Logout } = useContext(Context)

const [mainConfigDetails, setMainConfigDetails] = useState([]);


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
                    console.log('main_config Data Loaded');
                    //console.log(json);
                    let REPLY = json.REPLY;

                    let main_config = REPLY.main_config
                    //console.log(REPLY); 
                    console.log(main_config);
                    setMainConfigDetails(main_config);
                    //alert(main_config.length);

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
        
        if(resp.connected_hosts  !== undefined) {
           let connected_hosts = resp.connected_hosts;
        } else {
            alert('device data (connected hosts) is empty')
        }
        
        //console.log(connected_hosts.usage_up);
        //console.log(connected_hosts.usage_down);
    });*/

        return(

            <View>
            <Text>NETWORKS</Text>
            <Text>Total : {mainConfigDetails.length}</Text>

            {mainConfigDetails.map((item, i) => {
                return(
                <Text>{item.item_id}). {item.name}</Text>
                )
            })}

          </View>

        )


}

export default Networks