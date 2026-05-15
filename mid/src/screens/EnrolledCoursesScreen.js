import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useStudent } from '../context/StudentContext';
import { getGlobalStyles, COLORS } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const EnrolledCoursesScreen = () => {
  const { session, students, theme } = useStudent();
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const styles = getGlobalStyles(theme);
  const colors = COLORS[theme];

  // Find the student in the list that matches the current session
  const currentStudent = students.find(s => s.sapId === session?.sapId) || session;
  const courses = currentStudent?.courses || [];

  const renderCourse = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => setSelectedCourse(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.row, styles.spaceBetween]}>
        <View style={styles.row}>
          <View style={[styles.avatarSmall, { backgroundColor: colors.secondary, marginRight: 15 }]}>
            <Ionicons name="book" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.subtitle}>{item.name}</Text>
            <Text style={styles.subtext}>{item.code}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
      </View>
      
      <View style={[styles.row, { marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border }]}>
        <View style={[styles.row, { marginRight: 20 }]}>
          <Ionicons name="time-outline" size={16} color={colors.subtext} style={{ marginRight: 5 }} />
          <Text style={styles.subtext}>{item.timings}</Text>
        </View>
        <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color={colors.subtext} style={{ marginRight: 5 }} />
            <Text style={styles.subtext}>A-Block 302</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{ padding: 16 }}>
            <Text style={styles.title}>Your Courses</Text>
            <Text style={[styles.subtext, { marginBottom: 10 }]}>Current academic schedule</Text>
        </View>
        
        <FlatList
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
            ListEmptyComponent={
                <View style={[styles.center, { marginTop: 50 }]}>
                    <Ionicons name="book-outline" size={60} color={colors.subtext} />
                    <Text style={[styles.text, { marginTop: 20 }]}>No courses found.</Text>
                </View>
            }
        />

        {/* Course Detail Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!selectedCourse}
            onRequestClose={() => setSelectedCourse(null)}
        >
            <Pressable 
                style={localStyles.modalOverlay} 
                onPress={() => setSelectedCourse(null)}
            >
                <Pressable style={[localStyles.modalContent, { backgroundColor: colors.card }]}>
                    <View style={localStyles.modalHandle} />
                    
                    {selectedCourse && (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={[styles.row, { marginBottom: 20 }]}>
                                <View style={[styles.avatar, { marginRight: 20 }]}>
                                    <Ionicons name="school" size={40} color={colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.title}>{selectedCourse.name}</Text>
                                    <Text style={[styles.subtitle, { color: colors.primary }]}>{selectedCourse.code}</Text>
                                </View>
                            </View>

                            <View style={localStyles.infoSection}>
                                <Text style={localStyles.sectionLabel}>Course Details</Text>
                                
                                <View style={localStyles.infoRow}>
                                    <View style={localStyles.iconContainer}>
                                        <Ionicons name="person" size={20} color={colors.subtext} />
                                    </View>
                                    <View>
                                        <Text style={styles.subtext}>Instructor</Text>
                                        <Text style={styles.text}>Dr. Sarah Johnson</Text>
                                    </View>
                                </View>

                                <View style={localStyles.infoRow}>
                                    <View style={localStyles.iconContainer}>
                                        <Ionicons name="time" size={20} color={colors.subtext} />
                                    </View>
                                    <View>
                                        <Text style={styles.subtext}>Timings</Text>
                                        <Text style={styles.text}>{selectedCourse.timings}</Text>
                                    </View>
                                </View>

                                <View style={localStyles.infoRow}>
                                    <View style={localStyles.iconContainer}>
                                        <Ionicons name="location" size={20} color={colors.subtext} />
                                    </View>
                                    <View>
                                        <Text style={styles.subtext}>Location</Text>
                                        <Text style={styles.text}>Building A, Room 302</Text>
                                    </View>
                                </View>

                                <View style={localStyles.infoRow}>
                                    <View style={localStyles.iconContainer}>
                                        <Ionicons name="calendar" size={20} color={colors.subtext} />
                                    </View>
                                    <View>
                                        <Text style={styles.subtext}>Credits</Text>
                                        <Text style={styles.text}>3.0 Credit Hours</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={localStyles.infoSection}>
                                <Text style={localStyles.sectionLabel}>Attendance Status</Text>
                                <View style={[styles.row, styles.spaceBetween, { marginTop: 10 }]}>
                                    <View style={[styles.center, { flex: 1 }]}>
                                        <Text style={[styles.title, { color: '#48BB78' }]}>92%</Text>
                                        <Text style={styles.subtext}>Attendance</Text>
                                    </View>
                                    <View style={[styles.center, { flex: 1 }]}>
                                        <Text style={[styles.title, { color: colors.primary }]}>24/26</Text>
                                        <Text style={styles.subtext}>Lectures</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity 
                                style={[styles.button, { marginTop: 30 }]}
                                onPress={() => setSelectedCourse(null)}
                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        maxHeight: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    infoSection: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A0AEC0',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    }
});

export default EnrolledCoursesScreen;
