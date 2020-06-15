import React from 'react'
import Routes from './src/routes'
import { AppLoading } from 'expo'
import { Comfortaa_400Regular, Comfortaa_700Bold, Comfortaa_300Light, useFonts } from '@expo-google-fonts/comfortaa'

export default function App() {

	const [fontsLoaded] = useFonts({
		Comfortaa_300Light,
		Comfortaa_400Regular,
		Comfortaa_700Bold
	})

	if(!fontsLoaded) {
		return <AppLoading />
	}

    return (
        <Routes />
    )
}
