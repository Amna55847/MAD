import React, { useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { justifyContent: 'flex-start', alignItems: 'center' }]} // Explicit Flexbox
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 30, marginTop: 20 }}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Enter your Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Enter your Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <View style={globalStyles.liveDataContainer}>
                <Text style={{ fontFamily: 'Inter_900Black', fontSize: 18, marginBottom: 10 }}>Live Typed Data:</Text>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, marginBottom: 5 }}>Name: {name}</Text>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16 }}>Age: {age}</Text>
            </View>
        </KeyboardAvoidingView>
    );
}
