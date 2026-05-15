import React, { useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    Dimensions, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStudent } from '../context/StudentContext';
import { COLORS } from '../styles/GlobalStyles';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

const Sidebar = ({ isOpen, onClose, navigation }) => {
    const { session, logout, theme } = useStudent();
    const colors = COLORS[theme] || COLORS.light;
    
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isOpen) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -SIDEBAR_WIDTH,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [isOpen]);

    if (!isOpen && slideAnim._value === -SIDEBAR_WIDTH) return null;

    const navigateTo = (screen) => {
        onClose();
        navigation.navigate(screen);
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? 'auto' : 'none'}>
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View 
                    style={[
                        styles.backdrop, 
                        { opacity: opacityAnim }
                    ]} 
                />
            </TouchableWithoutFeedback>

            {/* Sidebar Content */}
            <Animated.View 
                style={[
                    styles.sidebar, 
                    { 
                        backgroundColor: colors.background,
                        transform: [{ translateX: slideAnim }],
                        shadowColor: '#000',
                    }
                ]}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.header, { backgroundColor: colors.header }]}>
                        <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
                            {session?.profileImage ? (
                                <Image source={{ uri: session.profileImage }} style={styles.avatar} />
                            ) : (
                                <Ionicons name="person" size={35} color="white" />
                            )}
                        </View>
                        <Text style={[styles.name, { color: colors.text }]}>{session?.name || 'Student'}</Text>
                        <Text style={[styles.sapId, { color: colors.subtext }]}>SAP ID: {session?.sapId || 'N/A'}</Text>
                    </View>

                    <View style={styles.menuItems}>
                        <MenuItem 
                            icon="home-outline" 
                            label="Home" 
                            onPress={() => navigateTo('Home')} 
                            color={colors.text} 
                        />
                        <MenuItem 
                            icon="book-outline" 
                            label="Courses" 
                            onPress={() => navigateTo('Courses')} 
                            color={colors.text} 
                        />
                        <MenuItem 
                            icon="person-outline" 
                            label="Profile" 
                            onPress={() => navigateTo('Profile')} 
                            color={colors.text} 
                        />
                        <MenuItem 
                            icon="settings-outline" 
                            label="Settings" 
                            onPress={() => navigateTo('Settings')} 
                            color={colors.text} 
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.logoutButton} 
                        onPress={() => {
                            onClose();
                            logout();
                        }}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#F56565" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={[styles.versionText, { color: colors.subtext }]}>Student Portal v1.2</Text>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

const MenuItem = ({ icon, label, onPress, color }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Ionicons name={icon} size={22} color={color} style={{ marginRight: 15 }} />
        <Text style={[styles.menuLabel, { color: color }]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        elevation: 16,
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    header: {
        padding: 25,
        paddingTop: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
    },
    sapId: {
        fontSize: 13,
        marginTop: 2,
    },
    menuItems: {
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 5,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 15,
        marginTop: 'auto',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(245, 101, 101, 0.08)',
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#F56565',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 12,
        opacity: 0.5,
    }
});

export default Sidebar;
