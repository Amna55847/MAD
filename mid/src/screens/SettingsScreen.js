import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, logout, resetData, session } = useStudent();
  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all your saved information, theme preferences, and session. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => resetData() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Settings</Text>
        <Text style={[styles.subtext, { marginBottom: 20 }]}>Manage your app preferences</Text>

        <View style={styles.card}>
            <View style={[styles.row, styles.spaceBetween, { paddingVertical: 10 }]}>
                <View style={styles.row}>
                    <Ionicons name={theme === 'dark' ? "moon" : "sunny"} size={24} color={colors.primary} style={{ marginRight: 15 }} />
                    <Text style={styles.text}>Dark Mode</Text>
                </View>
                <Switch 
                    value={theme === 'dark'} 
                    onValueChange={toggleTheme}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={theme === 'dark' ? colors.accent : '#F4F3F4'}
                />
            </View>
        </View>

        <View style={styles.card}>
            <Text style={[styles.subtitle, { paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.border }]}>Account Action</Text>
            
            <TouchableOpacity 
                style={[styles.row, { paddingVertical: 15 }]} 
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={24} color={colors.primary} style={{ marginRight: 15 }} />
                <Text style={[styles.text, { color: colors.primary }]}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.row, { paddingVertical: 15 }]} 
                onPress={handleReset}
            >
                <Ionicons name="trash-outline" size={24} color={colors.danger} style={{ marginRight: 15 }} />
                <Text style={[styles.text, { color: colors.danger, fontWeight: 'bold' }]}>Reset Data</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.center, { marginTop: 40 }]}>
            <Text style={styles.subtext}>Student Portal v1.0.0</Text>
            <Text style={[styles.subtext, { marginTop: 5 }]}>Logged in as: {session?.email}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
