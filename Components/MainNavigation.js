import React from 'react'
import Home from '../screens/Home';
import Detail from '../screens/Detail'
import Navbar from './Navbar';
import Search from '../screens/Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {

    render() {
        return (
            <Stack.Navigator headerMode={'screen'}>

                <Stack.Screen 
                name="Home"
                component={Home} 
                options={{
                    headerTransparent: true,
                    header: ({navigation}) => <Navbar navigation={navigation} main={true}/>,
                }} />

                <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerTransparent: true,
                    header: ({navigation}) => <Navbar navigation={navigation}/>,
                }}
                    />
                
                <Stack.Screen 
                name="Search"
                component={Search} 
                options={{
                    headerTransparent: true,
                    header: ({navigation}) =>
                     <Navbar navigation={navigation} main={false}/>,
                }} />
            
            </Stack.Navigator>
        );
    }
}

export default MainNavigation;