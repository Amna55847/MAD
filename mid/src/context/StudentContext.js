import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getStudentData, 
  saveStudentData, 
  getAuthSession, 
  saveAuthSession, 
  clearAuthSession, 
  getThemePreference, 
  saveThemePreference,
  resetAllData 
} from '../utils/Storage';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [session, setSession] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedStudents = await getStudentData();
        const storedSession = await getAuthSession();
        const storedTheme = await getThemePreference();

        if (storedStudents) setStudents(storedStudents);
        if (storedSession) setSession(storedSession);
        if (storedTheme) setTheme(storedTheme);
      } catch (error) {
        console.error('Error loading data in context:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const login = async (email, password) => {
    const allStudents = await getStudentData();
    const foundUser = allStudents.find(s => s.email === email && s.password === password);
    
    if (foundUser) {
      setSession(foundUser);
      await saveAuthSession(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (newStudent) => {
    const allStudents = await getStudentData();
    
    // Check if user already exists
    if (allStudents.find(s => s.email === newStudent.email || s.sapId === newStudent.sapId)) {
      return { success: false, error: 'User already exists with this Email or SAP ID' };
    }

    const studentWithDefaults = {
      ...newStudent,
      courses: newStudent.courses || [
        { id: '1', name: 'Mobile App Development', timings: 'Mon/Wed 10-12 AM', code: 'MAD101' },
        { id: '2', name: 'Database Systems', timings: 'Tue/Thu 02-04 PM', code: 'DBS102' },
        { id: '3', name: 'Software Engineering', timings: 'Mon/Wed 08-10 AM', code: 'SWE103' },
        { id: '4', name: 'Web Development', timings: 'Fri 09-12 PM', code: 'WEB104' },
        { id: '5', name: 'Artificial Intelligence', timings: 'Mon/Wed 12-02 PM', code: 'AI105' },
        { id: '6', name: 'Human Computer Interaction', timings: 'Tue/Thu 11-01 PM', code: 'HCI106' },
        { id: '7', name: 'Project Management', timings: 'Fri 02-05 PM', code: 'PMG107' },
      ],
    };

    const updatedStudents = [...allStudents, studentWithDefaults];
    setStudents(updatedStudents);
    await saveStudentData(updatedStudents);
    setSession(studentWithDefaults);
    await saveAuthSession(studentWithDefaults);
    return { success: true };
  };

  const logout = async () => {
    setSession(null);
    await clearAuthSession();
  };

  const updateProfile = async (updatedData) => {
    const updatedStudents = students.map(s => 
      s.sapId === session.sapId ? { ...s, ...updatedData } : s
    );
    
    const updatedSession = { ...session, ...updatedData };
    
    setStudents(updatedStudents);
    setSession(updatedSession);
    await saveStudentData(updatedStudents);
    await saveAuthSession(updatedSession);
  };

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    await saveThemePreference(nextTheme);
  };

  const resetData = async () => {
    await resetAllData();
    setStudents([]);
    setSession(null);
    setTheme('light');
  };

  return (
    <StudentContext.Provider value={{
      students,
      session,
      theme,
      loading,
      login,
      signup,
      logout,
      updateProfile,
      toggleTheme,
      resetData
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
