import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './pages/Home'
import Register from './pages/Register'
import RegisterAvatar from './pages/RegisterAvatar'
import Login from './pages/Login'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Search from './pages/Search'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RegisterAvatar" component={RegisterAvatar} />
                <AppStack.Screen name="Discover" component={Discover} />
                <AppStack.Screen name="Profile" component={Profile} />
                <AppStack.Screen name="Search" component={Search} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes