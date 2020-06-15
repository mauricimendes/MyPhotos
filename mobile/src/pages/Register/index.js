import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Register = () => {

    const [user_name, set_user_name] = useState('')
    const [user_email, set_user_email] = useState('')
    const [user_whatsapp, set_user_whatsapp] = useState('')
    const [user_password, set_user_password] = useState('')

    const navigation = useNavigation()

    function handleNavigateToBack() {
        navigation.goBack()
    }

    function handleNavigationToRegisterAvatar() {

        if(!user_name | !user_email | !user_password) {
            return Alert.alert('Fill in all fields.')
        }

        navigation.navigate('RegisterAvatar', {
            user_name,
            user_email,
            user_whatsapp,
            user_password
        })
    }

    return (
        <>
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={handleNavigateToBack}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.containerContent}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Name"
                    value={user_name}
                    onChangeText={set_user_name} 
                />
            </View>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Email"
                    value={user_email}
                    autoCompleteType="email"
                    onChangeText={set_user_email} 
                />
            </View>
            <View>
                <Text style={styles.label}>Whatsapp</Text>
                <TextInput  
                    style={styles.inputText} 
                    placeholder="Whatsapp"
                    value={user_whatsapp}
                    onChangeText={set_user_whatsapp} 
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
            <TouchableOpacity style={styles.buttom} onPress={handleNavigationToRegisterAvatar}>
                <Text style={styles.buttomText}>NEXT</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default Register

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