import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation()

    function handleNavigateToRegister() {
        navigation.navigate('Register')
    }

    function handleNavigateToLogin() {
        navigation.navigate('Login')
    }

    return (
        <>
        <ImageBackground source={require('../../assets/background.png')} style={styles.image}>
            <Image source={require('../../assets/logo.png')} />
        </ImageBackground>
        <View style={styles.containerButtons}>
            <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.buttom} 
                onPress={handleNavigateToLogin}
            >
                <Text style={styles.textButtom}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={0.8} 
                style={[styles.buttom, styles.buttomRegister]} 
                onPress={handleNavigateToRegister}
            >
                <Text style={[styles.textButtom, styles.buttomTextRegister]}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        flex: 6,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    buttom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        margin: 5,
        height: 60
    },
    textButtom: {
        fontSize: 16,
        fontFamily: 'Comfortaa_700Bold'
    },
    buttomRegister: {
        backgroundColor: 'black'
    },
    buttomTextRegister: {
        color: 'white'
    }
})