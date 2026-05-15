import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

    return (
        <View style={[
            globalStyles.container,
            isDarkMode ? globalStyles.darkContainer : { backgroundColor: '#f5f5f5' }
        ]}>
            <Text style={[
                globalStyles.titleText,
                isDarkMode ? globalStyles.darkText : null
            ]}>
                {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
            </Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: isDarkMode ? '#333' : '#fff',
                borderRadius: 8,
                width: '100%', // Flexible sizing
            }}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>Dark Theme</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkMode ? '#007bff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDarkMode}
                />
            </View>
        </View>
    );
}
