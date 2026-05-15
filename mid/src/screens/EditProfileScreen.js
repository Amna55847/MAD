import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const { session, updateProfile, theme } = useStudent();
  const [formData, setFormData] = useState({
    name: '',
    sapId: '',
    semester: '',
    gpa: '',
    cgpa: '',
  });

  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme];

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your gallery to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      try {
        await updateProfile({ ...session, profileImage: selectedImage });
        Alert.alert('Success', 'Profile picture updated');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile picture');
      }
    }
  };

  useEffect(() => {
    if (session) {
      setFormData({
        name: session.name || '',
        sapId: session.sapId || '',
        semester: session.semester || '',
        gpa: session.gpa || '',
        cgpa: session.cgpa || '',
      });
    }
  }, [session]);

  const handleUpdate = async () => {
    if (!formData.name || !formData.sapId || !formData.semester || !formData.gpa || !formData.cgpa) {
      Alert.alert('Error', 'Ensure all profile fields are filled');
      return;
    }

    await updateProfile(formData);
    Alert.alert('Success', 'Profile updated successfully');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={[styles.center, { marginBottom: 30 }]}>
            <TouchableOpacity onPress={handlePickImage}>
                <View style={[styles.avatar, { width: 120, height: 120, borderRadius: 60, overflow: 'hidden' }]}>
                    {session?.profileImage ? (
                        <Image source={{ uri: session.profileImage }} style={{ width: '100%', height: '100%' }} />
                    ) : (
                        <Ionicons name="camera" size={40} color={colors.primary} />
                    )}
                </View>
                <View style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    backgroundColor: colors.primary, 
                    padding: 8, 
                    borderRadius: 20,
                    borderWidth: 3,
                    borderColor: colors.background
                }}>
                    <Ionicons name="camera" size={18} color="white" />
                </View>
            </TouchableOpacity>
            <Text style={[styles.subtext, { marginTop: 10 }]}>Tap to Change Photo</Text>
        </View>

        <View style={styles.card}>
            <Text style={[styles.subtext, { marginBottom: 5 }]}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(val) => setFormData({ ...formData, name: val })}
                placeholder="Enter name"
                placeholderTextColor={colors.subtext}
            />

            <Text style={[styles.subtext, { marginBottom: 5, marginTop: 15 }]}>SAP ID</Text>
            <TextInput
                style={styles.input}
                value={formData.sapId}
                onChangeText={(val) => setFormData({ ...formData, sapId: val })}
                placeholder="Enter SAP ID"
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
            />

            <Text style={[styles.subtext, { marginBottom: 5, marginTop: 15 }]}>Semester</Text>
            <TextInput
                style={styles.input}
                value={formData.semester}
                onChangeText={(val) => setFormData({ ...formData, semester: val })}
                placeholder="Enter semester (e.g. 6)"
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
            />

            <View style={[styles.row, styles.spaceBetween, { marginTop: 15 }]}>
              <View style={{ width: '48%' }}>
                <Text style={styles.subtext}>Current GPA</Text>
                <TextInput
                    style={styles.input}
                    value={formData.gpa}
                    onChangeText={(val) => setFormData({ ...formData, gpa: val })}
                    placeholder="3.8"
                    placeholderTextColor={colors.subtext}
                    keyboardType="numeric"
                />
              </View>
              <View style={{ width: '48%' }}>
                <Text style={styles.subtext}>Current CGPA</Text>
                <TextInput
                    style={styles.input}
                    value={formData.cgpa}
                    onChangeText={(val) => setFormData({ ...formData, cgpa: val })}
                    placeholder="3.75"
                    placeholderTextColor={colors.subtext}
                    keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
