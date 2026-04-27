// FormikWithDestructuring.js
// ── FORMIK FORM 2 ─────────────────────────────────────────────────────────────
// This form uses DESTRUCTURING way.
// Instead of formikProps.handleChange, we unpack the bag at the top:
//   { handleChange, values, errors, touched, handleSubmit }
// Then use them directly without writing formikProps. every time.

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Formik } from 'formik';

const FormikWithDestructuring = () => {
  return (
    <View style={styles.card}>

      <Text style={styles.cardTitle}>Formik 2 — Destructuring</Text>
      <Text style={styles.cardNote}>
        Unpack the bag at top using curly braces. Use directly without formikProps.
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}

        validate={(values) => {
          const errors = {};
          if (!values.username) errors.username = 'Username required';
          if (!values.password) errors.password = 'Password required';
          else if (values.password.length < 6)
            errors.password = 'Minimum 6 characters';
          return errors;
        }}

        onSubmit={(values) => {
          Alert.alert(
            'Form 2 Submitted!',
            `Username: ${values.username}`
          );
        }}
      >
        {/* Destructuring — pull out only what we need */}
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>

            {/* ── Username Field ── */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            {/* ── Password Field ── */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* ── Submit Button ── */}
            <TouchableOpacity
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f4a261',
    marginBottom: 4,
  },
  cardNote: {
    fontSize: 12,
    color: '#999',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 11,
    fontSize: 15,
    marginBottom: 6,
    backgroundColor: '#fafafa',
  },
  error: {
    color: '#e53e3e',
    fontSize: 12,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: '#f4a261',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default FormikWithDestructuring;