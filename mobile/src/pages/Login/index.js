import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../serveces/api'

const Login = () => {
    const navigation = useNavigation()
    const [user_email, set_user_email] = useState('')
    const [user_password, set_user_password] = useState('')

    async function handleLogin() {

        const data = {
            user_email,
            user_password
        }

        const response = await api.post('login', data)
        if(!response) {
            return Alert.alert('Error')
        }
        await AsyncStorage.setItem('TOKEN', response.data.token)
        await AsyncStorage.setItem('AVATAR', response.data.URL_user_image)
        await AsyncStorage.setItem('NAME', response.data.name)
        await AsyncStorage.setItem('EMAIL', response.data.user_email)
        await AsyncStorage.setItem('PHONE', response.data.phone)
        await AsyncStorage.setItem('USER_ID', String(response.data.id))
        navigation.navigate('Discover')
    }

    function handleNavigateToHome() {
        navigation.navigate('Home')
    }

    return (
        <>
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={handleNavigateToHome}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.containerContent}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Email" 
                    value={user_email}
                    onChangeText={set_user_email}
                />
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.inputText} 
                    placeholder="Password" 
                    value={user_password}
                    onChangeText={set_user_password}
                />
            </View>
            <TouchableOpacity style={styles.buttom} onPress={handleLogin}>
                <Text style={styles.buttomText}>LOG IN</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    containerHeader: {
        paddingTop: 40,
        paddingLeft: 8
    },
    containerContent: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    },
    inputText: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        height: 60,
        margin: 10,
        paddingLeft: 10,
        fontFamily: 'Comfortaa_400Regular',
        marginTop: -1
    },
    containerTitle: {
        padding: 10
    },
    title: {
        fontSize: 32,
        fontFamily: 'Comfortaa_700Bold'
    },
    buttom: {
        margin: 10,
        backgroundColor: 'black',
        height: 60,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttomText: {
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 16,
        color: 'white'
    },
    label: {
        paddingLeft: 18,
        fontFamily: 'Comfortaa_400Regular'
    }
})