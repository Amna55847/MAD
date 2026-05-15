import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  light: {
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#1A202C',
    subtext: '#718096',
    primary: '#3182CE',
    secondary: '#E2E8F0',
    accent: '#ECC94B',
    danger: '#E53E3E',
    border: '#E2E8F0',
    header: '#FFFFFF',
    tabInactive: '#A0AEC0',
    tabActive: '#3182CE',
  },
  dark: {
    background: '#1A202C',
    card: '#2D3748',
    text: '#F7FAFC',
    subtext: '#A0AEC0',
    primary: '#63B3ED',
    secondary: '#4A5568',
    accent: '#F6E05E',
    danger: '#FC8181',
    border: '#4A5568',
    header: '#2D3748',
    tabInactive: '#718096',
    tabActive: '#63B3ED',
  },
};

export const getGlobalStyles = (theme) => {
  const colors = COLORS[theme] || COLORS.light;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    subtext: {
      fontSize: 14,
      color: colors.subtext,
    },
    input: {
      backgroundColor: colors.secondary,
      borderRadius: 12,
      padding: 12,
      marginVertical: 8,
      color: colors.text,
      fontSize: 16,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 12,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      height: 60,
      backgroundColor: colors.header,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarSmall: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
