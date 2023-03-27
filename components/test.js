export default function App() {
    const [code, setCode] = useState(["", "", "", ""]);
    const box1Ref = useRef(null)
    const box2Ref = useRef(null)
    const box3Ref = useRef(null)
    const box4Ref = useRef(null)
    const boxAray = [box1Ref, box2Ref, box3Ref, box4Ref]
    const [currentIndex, setCurrentIndex] = useState(0)
    const { email, setJwt } = useContext(Context)
    useEffect(() => {
        boxAray[currentIndex].current.focus()
    }, [currentIndex]);

    const handleInputChange = (value) => {
        if (!value) return
        setCode((prevCode) => {
            if (currentIndex <= 3) {
                const newCode = [...prevCode]
                newCode[currentIndex] = value
                return newCode
            } else {
                return prevCode
            }
        });
        setCurrentIndex((prevIndex) => {
            if (prevIndex < 3) return prevIndex + 1
            return prevIndex
        })
    };

    const handleBackspace = () => {
        if (currentIndex === 0 && code[currentIndex] === "") return
        console.log({ currentIndex })
        if (currentIndex >= 0 && code[currentIndex]) {
            setCode((prevCode) => {
                const newCode = [...prevCode]
                newCode[currentIndex] = ""
                return newCode
            });
        } else if (currentIndex > 0 && !(code[currentIndex])) {
            setCurrentIndex((prevIndex) => {
                return prevIndex - 1
            })
        }
    }
    const handleSubmit = () => {
        // send the code to an API for validation
        const parsedCode = parseInt(code.join(''))
        const API_URL = RNCONTROL_API_BASE_URL + '/jwt_step_2.php?EMAIL=' + email + '&CODE=' + parsedCode;

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
    };

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <Text style={styles.title}>Enter verification code:</Text>
                <IsphelperLogo />
                <View style={styles.codeContainer}>
                    <TextInput

                        ref={boxAray[0]}
                        value={code[0]}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(value) => handleInputChange(value)}
                        onKeyPress={({ nativeEvent }) =>
                            nativeEvent.key === 'Backspace' && handleBackspace()
                        }
                    />
                    <TextInput

                        ref={boxAray[1]}
                        value={code[1]}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(value) => handleInputChange(value)}
                        onKeyPress={({ nativeEvent }) =>
                            nativeEvent.key === 'Backspace' && handleBackspace()
                        }
                    />
                    <TextInput

                        ref={boxAray[2]}
                        value={code[2]}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(value) => handleInputChange(value)}
                        onKeyPress={({ nativeEvent }) =>
                            nativeEvent.key === 'Backspace' && handleBackspace()
                        }
                    />
                    <TextInput

                        ref={boxAray[3]}
                        value={code[3]}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(value) => handleInputChange(value)}
                        onKeyPress={({ nativeEvent }) =>
                            nativeEvent.key === 'Backspace' && handleBackspace()
                        }
                    />

                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}