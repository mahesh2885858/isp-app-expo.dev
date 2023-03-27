import React, { useContext, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';
import IsphelperLogo from "../assets/ispHelperLogo.svg"

import { RNCONTROL_API_BASE_URL } from '../lib/Constants';
import { Context } from '../utils/context';

import * as SecureStore from 'expo-secure-store';

const OtpPage = ({ navigation }) => {
    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
    const [isLoading, setIsLoading] = useState(false)
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);
    const { email, setJwt } = useContext(Context)
    const otpVerify = () => {

        let parsedOtp = parseInt(otp[1] + otp[2] + otp[3] + otp[4])
        const API_URL = RNCONTROL_API_BASE_URL + '/jwt_step_2.php?EMAIL=' + email + '&CODE=' + parsedOtp;

        axios({
            method: 'get',
            url: `${API_URL}`,
        }).then((response) => {

            console.log(response.data);

            if (response.data.ERROR === '' && response.data.RESULT === 'SUCCESS') {

                SecureStore.setItemAsync("jwt", response.data.JWT).then((res) => {
                    console.log("jwt stored")
                    navigation.replace("MyAccount")
                }).catch(() => {

                    console.log("OTP page : internal error")


                });

            } else if (response.data.ERROR !== '') {
                alert('Something went wrong');
            }

        });


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
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 5,

                    }} >

                        <TextInput
                            ref={box1Ref}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setOtp({ ...otp, 1: text })
                                text && box2Ref.current.focus()
                            }}
                        />
                        <TextInput
                            ref={box2Ref}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setOtp({ ...otp, 2: text })

                                text ? box3Ref.current.focus() : box1Ref.current.focus()
                            }}
                        />
                        <TextInput
                            ref={box3Ref}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setOtp({ ...otp, 3: text })

                                text ? box4Ref.current.focus() : box2Ref.current.focus()
                            }}
                        />
                        <TextInput
                            ref={box4Ref}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setOtp({ ...otp, 4: text })

                                !text && box3Ref.current.focus()
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={otpVerify}>

                        <Text style={{ color: "white", fontWeight: 700 }} >Verify</Text>
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
        gap: 40
    },

    input: {


        borderColor: '#E5E5E5',
        borderWidth: 1,
        width: 50,
        height: 50,
        textAlign: "center",
        fontSize: 20
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


export default OtpPage
