import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { session, theme } = useStudent();
  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme] || COLORS.light;

  if (!session) return null;

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile Section */}
      <View style={[styles.card, { marginTop: 20, alignItems: 'center' }]}>
        <View style={[styles.avatar, { overflow: 'hidden' }]}>
          {session.profileImage ? (
            <Image source={{ uri: session.profileImage }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Ionicons name="person" size={50} color={colors.primary} />
          )}
        </View>
        <Text style={[styles.title, { marginTop: 15, marginBottom: 0 }]}>{session.name}</Text>
        <Text style={styles.subtext}>SAP ID: {session.sapId} | Semester {session.semester || '1'}</Text>

        <View style={[styles.row, { marginTop: 20, width: '100%', justifyContent: 'space-around' }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, { color: colors.primary }]}>{session.gpa || '0.00'}</Text>
            <Text style={styles.subtext}>GPA</Text>
          </View>
          <View style={{ borderLeftWidth: 1, borderLeftColor: colors.border, height: 40 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, { color: colors.primary }]}>{session.cgpa || '0.00'}</Text>
            <Text style={styles.subtext}>CGPA</Text>
          </View>
        </View>
      </View>

      {/* Navigation Buttons Section */}
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Text style={[styles.subtitle, { marginLeft: 16, marginBottom: 10 }]}>Quick Access</Text>
        
        <TouchableOpacity 
            style={[styles.card, styles.row, styles.spaceBetween]}
            onPress={() => navigation.navigate('Courses')}
        >
            <View style={styles.row}>
                <Ionicons name="school" size={24} color={colors.primary} style={{ marginRight: 15 }} />
                <Text style={styles.text}>Enrolled Courses</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.card, styles.row, styles.spaceBetween]}
            onPress={() => navigation.navigate('Profile')}
        >
            <View style={styles.row}>
                <Ionicons name="create" size={24} color={colors.accent} style={{ marginRight: 15 }} />
                <Text style={styles.text}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.card, styles.row, styles.spaceBetween]}
            onPress={() => navigation.navigate('Settings')}
        >
            <View style={styles.row}>
                <Ionicons name="settings" size={24} color={colors.subtext} style={{ marginRight: 15 }} />
                <Text style={styles.text}>Settings & Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={[styles.card, { backgroundColor: colors.primary, marginBottom: 30, marginTop: 10 }]}>
        <Text style={[styles.subtitle, { color: '#FFF' }]}>University Announcements</Text>
        <Text style={[styles.text, { color: '#FFF', opacity: 0.9, marginTop: 5 }]}>Midterm project submission deadline is approaching. Ensure your profiles are up to date.</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
