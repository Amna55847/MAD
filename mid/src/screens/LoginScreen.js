import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const { login, theme } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    const success = await login(email, password);
    if (!success) {
      Alert.alert('Login Failed', 'Invalid email or password');
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
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={localStyles.loginCard}>
              <View style={styles.center}>
                  <View style={[styles.avatar, { backgroundColor: 'white', marginBottom: 15, shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 10 }]}>
                    <Ionicons name="school" size={42} color={colors.primary} />
                  </View>
                  <Text style={[styles.title, { color: 'white', letterSpacing: 1, fontSize: 28 }]}>RIPHAH PORTAL</Text>
                  <Text style={[styles.subtext, { marginBottom: 35, color: '#CBD5E0', fontWeight: '500' }]}>Excellence in Education</Text>
              </View>

              <View style={{ width: '100%' }}>
                <View style={[styles.row, localStyles.inputContainer]}>
                    <Ionicons name="mail-outline" size={20} color="#A0AEC0" style={localStyles.inputIcon} />
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

                <View style={[styles.row, localStyles.inputContainer]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#A0AEC0" style={localStyles.inputIcon} />
                    <TextInput
                        style={[styles.input, localStyles.customInput]}
                        placeholder="Password"
                        placeholderTextColor="#A0AEC0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={localStyles.passwordToggle}
                    >
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#A0AEC0" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[styles.button, { marginTop: 15, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 8 }]} 
                    onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <View style={[styles.row, styles.center, { marginTop: 30 }]}>
                  <Text style={{ color: '#E2E8F0' }}>New to Riphah? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ color: '#63B3ED', fontWeight: 'bold' }}>Create Account</Text>
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
        backgroundColor: 'rgba(0, 15, 35, 0.65)', // Cinematic deep-blue tint
        justifyContent: 'center',
    },
    keyboardView: {
        flex: 1,
    },
    loginCard: {
        margin: 20,
        padding: 30,
        borderRadius: 28,
        backgroundColor: 'rgba(26, 32, 44, 0.88)', // Slightly darker, more premium glass look
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 15,
    },
    inputContainer: {
        marginBottom: 18,
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    customInput: {
        width: '100%',
        paddingLeft: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'white',
        borderWidth: 0,
        height: 55,
        fontSize: 15,
    },
    passwordToggle: {
        position: 'absolute',
        right: 15,
    }
});

export default LoginScreen;
