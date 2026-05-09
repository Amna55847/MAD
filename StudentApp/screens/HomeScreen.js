import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
            style={{ flex: 1, justifyContent: 'center' }}
            resizeMode="cover"
        >
            {/* Added justifyContent and alignItems to enforce FlexBox principles */}
            <View style={[globalStyles.container, { backgroundColor: 'rgba(255,255,255,0.7)', margin: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }]}>

                {/* Text uses Inter_900Black via globalStyles.titleText */}
                <Text style={globalStyles.titleText}>Student App</Text>

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={globalStyles.buttonText}>Go to Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={globalStyles.buttonText}>Go to Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => navigation.navigate('Contact')}
                >
                    <Text style={globalStyles.buttonText}>Go to Contact</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
