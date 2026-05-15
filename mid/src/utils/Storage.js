import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDENT_DATA_KEY = '@student_portal_data';
const AUTH_SESSION_KEY = '@student_portal_session';
const THEME_KEY = '@student_portal_theme';

export const saveStudentData = async (students) => {
  try {
    await AsyncStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students data:', error);
  }
};

export const getStudentData = async () => {
  try {
    const data = await AsyncStorage.getItem(STUDENT_DATA_KEY);
    if (data == null) return [];
    
    const parsed = JSON.parse(data);
    // Backward compatibility: If it's a single object, wrap it in an array
    if (parsed && !Array.isArray(parsed)) {
      return [parsed];
    }
    return parsed || [];
  } catch (error) {
    console.error('Error fetching student data:', error);
    return [];
  }
};

export const saveAuthSession = async (user) => {
  try {
    await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving auth session:', error);
  }
};

export const getAuthSession = async () => {
  try {
    const user = await AsyncStorage.getItem(AUTH_SESSION_KEY);
    return user != null ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error fetching auth session:', error);
    return null;
  }
};

export const clearAuthSession = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing auth session:', error);
  }
};

export const saveThemePreference = async (theme) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme preference:', error);
  }
};

export const getThemePreference = async () => {
  try {
    return await AsyncStorage.getItem(THEME_KEY);
  } catch (error) {
    console.error('Error fetching theme preference:', error);
    return 'light';
  }
};

export const resetAllData = async () => {
  try {
    await AsyncStorage.multiRemove([STUDENT_DATA_KEY, AUTH_SESSION_KEY, THEME_KEY]);
  } catch (error) {
    console.error('Error resetting all data:', error);
  }
};
