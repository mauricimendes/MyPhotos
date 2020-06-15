import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import api from '../../serveces/api'

const Register = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params
    
    const [image, setImage] = useState(null)

    function handleNavigateToBack() {
        navigation.goBack()
    }

    async function handleCreateAcount() {

        if(!image) {
            Alert.alert('Choose an avatar.')
        }
        
        const user_name = routeParams.user_name
        const user_email = routeParams.user_email
        const user_password = routeParams.user_password
        const user_whatsapp = routeParams.user_whatsapp

        const uriParts = image.split('.')
        const fileType = uriParts[uriParts.length -1]

        const data = new FormData()

        data.append('user_name', user_name)
        data.append('user_email', user_email)
        data.append('user_password', user_password)
        data.append('user_whatsapp', user_whatsapp)
        data.append('user_image', {
            uri: image,
            name: `avatar.${fileType}`,
            type: `image/${fileType}`
        })
        
        const response = await api.post('user', data)
        
        if(!response) {
            return Alert.alert('Error')
        }
        
        Alert.alert('Registered user')
        navigation.navigate('Login')        
        
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 2],
            quality: 1,
        })

        if(!result.cancelled) {
            setImage(result.uri)
        }
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
            <View style={styles.containerImage}>
                <TouchableOpacity onPress={pickImage} >
                    {
                        image 
                        ?
                            <Image source={{ uri: image }} style={styles.avatar} />
                        :
                            <LinearGradient style={styles.buttomImage} colors={['#FFF', '#F182E6', '#36D3DD']}>
                                <MaterialIcons name="keyboard-capslock" size={24} color="black" />
                            </LinearGradient>
                    }

                </TouchableOpacity>
            </View>
            <View style={styles.containerLabel}>
                <Text style={styles.labelImage}>
                    {
                        image
                        ?
                            'are you sure?'
                        :
                            'upload avatar'
                    }
                </Text>
            </View>
            <TouchableOpacity style={styles.buttom} onPress={handleCreateAcount}>
                <Text style={styles.buttomText}>SING UP</Text>
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
    buttomImage: {
        height: 120,
        width: 120,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImage: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 20,
    },
    labelImage: {
        fontFamily: 'Comfortaa_300Light',
        marginBottom: 20,
    },
    containerLabel: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {  
        height: 120,
        width: 120,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 100, 
    }
})