import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const { signup, theme } = useStudent();
  const [name, setName] = useState('');
  const [sapId, setSapId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme];

  const handleSignup = async () => {
    if (!name || !sapId || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const newStudent = {
      name,
      sapId,
      email,
      password,
      semester: '1',
      gpa: '0.00',
      cgpa: '0.00',
    };

    const result = await signup(newStudent);
    if (result.success) {
      Alert.alert('Success', 'Account created successfully');
    } else {
      Alert.alert('Error', result.error || 'Failed to create account');
    }
  };

  const bgSource = require('../../assets/building_bg.jpg');

  return (
    <ImageBackground 
        source={bgSource} 
        style={localStyles.background}
        resizeMode="cover"
    >
      <View style={localStyles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={localStyles.keyboardView}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 40 }}>
            <View style={localStyles.signupCard}>
              <TouchableOpacity 
                  style={{ marginBottom: 20 }}
                  onPress={() => navigation.goBack()}
              >
                  <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>

              <Text style={[styles.title, { color: 'white', letterSpacing: 1, fontSize: 26 }]}>CREATE ACCOUNT</Text>
              <Text style={[styles.subtext, { marginBottom: 30, color: '#CBD5E0' }]}>Join the RIPHAH student community</Text>

              <View style={{ width: '100%' }}>
                <View style={localStyles.inputContainer}>
                  <TextInput
                    style={[styles.input, localStyles.customInput]}
                    placeholder="Full Name"
                    placeholderTextColor="#A0AEC0"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={localStyles.inputContainer}>
                  <TextInput
                    style={[styles.input, localStyles.customInput]}
                    placeholder="SAP ID"
                    placeholderTextColor="#A0AEC0"
                    value={sapId}
                    onChangeText={setSapId}
                    keyboardType="numeric"
                  />
                </View>

                <View style={localStyles.inputContainer}>
                  <TextInput
                    style={[styles.input, localStyles.customInput]}
                    placeholder="University Email"
                    placeholderTextColor="#A0AEC0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={localStyles.inputContainer}>
                  <TextInput
                    style={[styles.input, localStyles.customInput]}
                    placeholder="Password"
                    placeholderTextColor="#A0AEC0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <View style={localStyles.inputContainer}>
                  <TextInput
                    style={[styles.input, localStyles.customInput]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#A0AEC0"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity 
                    style={[styles.button, { marginTop: 15, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 8 }]} 
                    onPress={handleSignup}
                >
                  <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>

                <View style={[styles.row, styles.center, { marginTop: 25, marginBottom: 10 }]}>
                    <Text style={{ color: '#E2E8F0' }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#63B3ED', fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 15, 35, 0.65)',
        justifyContent: 'center',
    },
    keyboardView: {
        flex: 1,
    },
    signupCard: {
        margin: 20,
        padding: 30,
        borderRadius: 28,
        backgroundColor: 'rgba(26, 32, 44, 0.88)',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 15,
    },
    inputContainer: {
        marginBottom: 14,
    },
    customInput: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'white',
        borderWidth: 0,
        paddingHorizontal: 15,
        height: 55,
        fontSize: 15,
    }
});

export default SignupScreen;
