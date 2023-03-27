import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';

import { Context } from "../utils/context"
import { useContext } from 'react';

import { RNCONTROL_API_BASE_URL } from '../lib/Constants';
import axios from 'axios';

const Dashboard = ({ navigation }) => {
    const [jwt, setJwt] = useState("")

    const { Logout } = useContext(Context)




    useEffect(() => {

        const getData = () => {
            fetch(RNCONTROL_API_BASE_URL + '/get.php', {
                method: "POST",
                headers: { "Authorization": `Bearer ${jwt}` }
            }).then(res => res.json()).then(json => console.log(json)).catch((err) => console.log(err));
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
            console.log('DATA:::');
            console.log(response.data);
        });
    */
    return (
        <View>
            <Text>Dashboard..</Text>
            <TouchableOpacity onPress={Logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard