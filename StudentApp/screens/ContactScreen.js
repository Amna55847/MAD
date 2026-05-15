import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function ContactScreen() {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!email.trim()) {
            if (Platform.OS === 'web') {
                window.alert('Error: Please enter a valid email address.');
            } else {
                Alert.alert('Error', 'Please enter a valid email address.');
            }
            return;
        }

        if (Platform.OS === 'web') {
            window.alert(`Success: Email submitted: ${email}`);
        } else {
            Alert.alert('Success', `Email submitted: ${email}`);
        }
        setEmail('');
    };

    return (
        <View style={[globalStyles.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>
            <Text style={globalStyles.titleText}>Contact Us</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, backgroundColor: '#fff', marginBottom: 20, paddingHorizontal: 10, width: '100%' }}>
                <Ionicons name="mail" size={24} color="#666" style={{ marginRight: 10 }} />
                <TextInput
                    style={{ flex: 1, paddingVertical: 15, fontSize: 16, fontFamily: 'Inter_400Regular' }} // flex:1 is a Flexbox property
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}
