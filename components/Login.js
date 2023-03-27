import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Context } from "../utils/context"
import { useContext } from 'react';
import IsphelperLogo from "../assets/ispHelperLogo.svg"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { RNCONTROL_API_BASE_URL } from '../lib/Constants';


const LoginPage = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { email, setEmail } = useContext(Context)
    // useEffect(() => {

    //     SecureStore.getItemAsync("jwt").then((res) => {
    //         if (jwt) {

    //             navigation.replace("Dashboard")
    //         } else {
    //             throw "No jwt found please login again"
    //         }
    //     }).catch((err) => {
    //         alert(err.message)
    //         return
    //     })
    // }, [])
    const onLogin = () => {
        const API_URL = RNCONTROL_API_BASE_URL + '/jwt_step_1.php?EMAIL=' + email;


        axios({
            method: 'get',
            url: `${API_URL}`,
        }).then((response) => {
            console.log(response.data);
            if (response.data.ERROR === '' && response.data.RESULT === 'SUCCESS') {
                alert(response.data.REPLY);

                // navigation.navigate('OtpValidate');
                navigation.replace('OtpValidate');

            } else if (response.data.ERROR !== '') {
                alert('Something went wrong');
            }

        });


        // navigation.replace("MyAccount")
        // navigation.navigate("OtpValidate")
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <IsphelperLogo
                    />
                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        <TextInput
                            value={email}
                            onChangeText={(newText) => setEmail(newText)}
                            placeholder={'Email'}
                            style={styles.input}
                            placeholderTextColor={"#A5A5A5"}
                        />
                    </View>

                    <TouchableOpacity onPress={onLogin} style={styles.submitButton}>

                        <Text style={{ color: "white", fontWeight: 700 }} >Send OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "white"
    },
    formContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,


    },

    input: {
        width: "75%",
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginBottom: 10,
    },
    submitButton: {
        width: "75%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D83C5",
        borderRadius: 5
    }

});


export default LoginPage;

