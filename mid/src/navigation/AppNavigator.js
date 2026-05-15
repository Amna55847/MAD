import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStudent } from '../context/StudentContext';
import { COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

import Sidebar from '../components/Sidebar';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import EnrolledCoursesScreen from '../screens/EnrolledCoursesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const { theme } = useStudent();
  const colors = COLORS[theme] || COLORS.light;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          navigation={props.navigation} 
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerLeft: () => (
            <TouchableOpacity 
                onPress={() => setIsSidebarOpen(true)} 
                style={{ marginLeft: 15 }}
            >
                <Ionicons name="menu" size={28} color={colors.text} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Courses') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            else iconName = 'help-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: { 
              backgroundColor: colors.header, 
              borderTopWidth: 0, 
              paddingBottom: 5,
              height: 60
          },
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.text,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Courses" component={EnrolledCoursesScreen} />
        <Tab.Screen name="Profile" component={EditProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
};

const AppNavigator = () => {
  const { session, loading, theme } = useStudent();

  if (loading) return null;

  const colors = COLORS[theme] || COLORS.light;
  
  const navTheme = {
    ...DefaultTheme,
    dark: theme === 'dark',
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
