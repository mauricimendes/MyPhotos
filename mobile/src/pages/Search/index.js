import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    AsyncStorage, 
    Alert, 
    Dimensions,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from 'expo'
import api from '../../services/api'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import ImageViewer from 'react-native-image-zoom-viewer'

const Search = () => {

    const [token, setToken] = useState([])
    const [userId, setUserId] = useState('')
    const [photos, setPhotos] = useState(null)
    const [visibleModal, setVisibleModel] = useState(false)
    const [photo_description, set_photo_description] = useState('')
    const [photo_topic, set_photo_topic] = useState('')
    const [image, setImage] = useState(null)
    const [seeImage, setSeeImage] = useState([])
    const [visibleModalImage, setVisibleModalImage] = useState(false)
    const [user_image, setUserImage] = useState('')
    const [user_name, setUserName] = useState('')
    const [user_photo_id, setPhotoUserId] = useState('')
    const [userPhotoDescription, setUserPhotoDescription] = useState('')
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(false)
    const navigation = useNavigation()
    
    useEffect(() => {
        AsyncStorage.getItem('TOKEN').then((user_token) => {
            setToken(user_token)
        })
        
        AsyncStorage.getItem('USER_ID').then((id) => {
            setUserId(id)
        })
    }, [])


    function handleLogout() {
        try {
            AsyncStorage.clear()
            navigation.navigate('Home')
        } catch {
            Alert.alert('Error')
        }
    }

    function handleNavigateToHome() {
        navigation.goBack()
    }

    function handleNavigateToProfile() {
        navigation.navigate('Profile', { userId: userId })
    }

    const handleGetPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        })

        if(!result.cancelled) {
            setImage(result.uri)
            setVisibleModel(true)
        }
    }

    function handleNavigateToProfileUser() {
        navigation.navigate('Profile', { userId: user_photo_id })
        handleColseImage()
    }

    function handleNavigateToDiscover() {
        navigation.navigate('Discover')
    }

    function handleSeeImage(url, user_image, user_name, user_photo_id, photo_description_see) {
        const seeImages = [{
            url: `${url}`
        }]
        setSeeImage(seeImages)
        setPhotoUserId(user_photo_id)
        setUserImage(user_image)
        setUserName(user_name)
        setUserPhotoDescription(photo_description_see)
        setVisibleModalImage(true)
    }

    function handleColseImage() {
        setVisibleModalImage(false)
        setSeeImage([])
        setPhotoUserId('')
        setUserImage('')
        setUserName('')
    }

    const handleInsertPhoto = async () => {

        const uriParts = image.split('.')
        const fileType = uriParts[uriParts.length -1]

        const data = new FormData()

        data.append('photo_description', photo_description)
        data.append('photo_topic', photo_topic)
        data.append('photo_user_id', userId)
        data.append('photo_image', {
            uri: image,
            name: `photo.${fileType}`,
            type: `image/${fileType}`
        })

        const response = await api.post('photo', data, {
            headers: {
                Authorization: token
            }
        })

        if(!response) {
            return Alert.alert('Error')
        }

        setVisibleModel(false)
        set_photo_description('')
        set_photo_topic('')
    }

    function handleRefresh() {
        setRefresh(true)
        getUserPhotos()
    }


    async function getUserPhotos() {
        if(!userId) {
            return
        }
        const response = await api.get('photo', {
            params: {
                photo_description: search,
                photo_topic: search
            },
            headers: {
                Authorization: token
            }
        })
        if (!response) {
            Alert.alert('Not found photos.')
        } 
        setPhotos(response.data)
        setRefresh(false)
    }

    useEffect(() => {
        getUserPhotos()
    }, [userId])

    if(!userId) {
        return <AppLoading />
    }

    return (
        <> 
        <Modal 
            transparent={true}
            visible={visibleModal}
            
        >
            <View style={styles.containerModal}>
                <View style={styles.modal}>
                    <Text style={styles.titleModal}>Photo information</Text>
                    <View>
                        <Text style={styles.label}>Topic</Text>
                        <TextInput 
                            style={styles.inputText} 
                            placeholder="Dog, happy..."
                            value={photo_topic}
                            onChangeText={set_photo_topic} 
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Description</Text>
                        <TextInput 
                            style={styles.inputText} 
                            placeholder="My dog ​​is very happy."
                            value={photo_description}
                            onChangeText={set_photo_description} 
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.modalButtom} 
                        activeOpacity={0.8} 
                        onPress={handleInsertPhoto}
                    >
                        <Text style={styles.modalButtomText}>SEND PHOTO</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Modal visible={visibleModalImage} transparent={true}>
            <View style={styles.containerModalImage}>
                <View style={styles.containerClose}>
                    <TouchableOpacity onPress={() => handleNavigateToProfileUser(user_photo_id)}>
                        <View style={styles.containerAvatar}>
                            <Image source={{ uri: `${user_image}`}} style={styles.avatar}/>
                            <Text style={styles.avatarName}>{user_name}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleColseImage}>
                        <AntDesign name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalImage}>
                    <ImageViewer style={styles.imageViewer} imageUrls={seeImage}/>
                    <Text style={styles.description}>{userPhotoDescription}</Text>
                </View>
            </View>
        </Modal>
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={handleNavigateToHome}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.containerContent}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Search</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
            <TextInput 
                style={styles.inputTextSearch} 
                placeholder="Search all photos."
                value={search}
                onChangeText={setSearch} 
            />
            <TouchableOpacity onPress={getUserPhotos}>
                <Entypo name="magnifying-glass" size={40} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.containerPhoto}>
            <FlatList 
                data={photos}
                keyExtractor={photo => String(photo.photo_id)}
                showsVerticalScrollIndicator={false}
                refreshing={refresh}
                onRefresh={handleRefresh}
                onEndReachedThreshold={0.2}
                numColumns={2}
                renderItem={({ item: photo }) => (
                    <TouchableOpacity onPress={() => handleSeeImage(photo.photo_image, photo.user_image, photo.user_name, photo.user_id, photo.photo_description)}>
                        <Image source={{ uri: photo.photo_image }} style={styles.photos} />
                    </TouchableOpacity>
                )}
            />
        </View>
        <View style={styles.containerButtom}>
            <TouchableOpacity 
                onPress={handleNavigateToDiscover}
                activeOpacity={0.5}
            >
                <MaterialIcons name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                disabled
                activeOpacity={0.5}
            >
                <Entypo name="magnifying-glass" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleGetPhoto} 
                activeOpacity={0.8}
            >
                <LinearGradient style={styles.buttomPlus} colors={['#F182E6', '#36D3DD']}>
                    <AntDesign name="plus" size={18} color="white" />
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleNavigateToProfile}
            >
    
                <SimpleLineIcons name="user" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleLogout} 
                activeOpacity={0.5}
            >
                <AntDesign name="logout" size={18} color="black" />
            </TouchableOpacity>
        </View>
        </>
    )
}

export default Search

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    containerHeader: {
        paddingTop: 40,
        paddingLeft: 8
    },
    containerContent: {
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
    containerProfile: {
        flex: 1.2,
        paddingTop: 50,
        alignItems: 'center'
    },
    containerPhoto: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    name: {
        fontSize: 32,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Comfortaa_700Bold'
    },
    containerUserPhotos: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        justifyContent: 'center'
    },
    avatar: {
        height: 30,
        width: 30,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100, 
    },
    avatarName: {
        color: 'white',
        padding: 5,
        fontSize: 10,
        fontFamily: 'Comfortaa_300Light'
    },
    photos: {
        width: width * 0.44,
        height: width * 0.3,
        margin: 5,
        padding: 10,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    photoTitile: {
        fontSize: 40,
        fontFamily: 'Comfortaa_400Regular',
        marginBottom: 10
    },
    buttom: {
        width: width - 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        margin: 5,
        height: 60
    },
    textButtom: {
        fontSize: 12,
        fontFamily: 'Comfortaa_700Bold'
    },
    buttomEmail: {
        backgroundColor: 'black'
    },
    buttomTextEmail: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Comfortaa_700Bold'
    },
    containerButtom: {
        borderTopColor: '#8a8a8a',
        borderTopWidth: 1,
        flexDirection: 'row',
        marginTop: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 15
    },
    buttomPlus: {
        width: 80,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        backgroundColor: "#000000aa", 
        flex: 1,
    },
    modal: {
        backgroundColor: "#FFF", 
        margin: 30, 
        padding: 20, 
        borderRadius: 8, 
        flex: 1,
        height: 360,
        width: width - 60,
        position: 'absolute',
        marginTop: 100
    },
    titleModal: {
        marginBottom: 20,
        fontSize: 20,
        fontFamily: 'Comfortaa_700Bold'
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
    inputTextSearch: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        width: width -80,
        paddingLeft: 8,
        height: 60,
        fontFamily: 'Comfortaa_400Regular',
        marginTop: -1
    },
    label: {
        paddingLeft: 18,
        fontFamily: 'Comfortaa_400Regular'
    },
    modalButtom: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'black',
        margin: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtomText: {
        color: 'white',
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 16
    },
    containerModalImage: {
        backgroundColor: "#000000cc", 
        flex: 1,
    },
    modalImage: {
        backgroundColor: "#FFF", 
        margin: 10, 
        padding: 5, 
        borderRadius: 8, 
        flex: 1,
        width: width - 20,
        position: 'absolute',
        height: height * 0.8,
        marginTop: 80,
    },
    imageViewer: {
        borderRadius: 8
    },
    containerClose: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10
    },
    containerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        fontFamily: 'Comfortaa_400Regular',
        padding: 2,
        fontSize: 12
    }
})
