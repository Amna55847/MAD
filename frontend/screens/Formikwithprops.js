// FormikWithProps.js
// ── FORMIK FORM 1 ─────────────────────────────────────────────────────────────
// This form uses PROPS way.
// We access everything using formikProps.handleChange, formikProps.values etc.
// formikProps is the big bag Formik gives us.

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

const FormikWithProps = () => {
  return (
    <View style={styles.card}>

      <Text style={styles.cardTitle}>Formik 1 — Using Props</Text>
      <Text style={styles.cardNote}>
        Access everything using formikProps.handleChange, formikProps.values etc.
      </Text>

      <Formik
        // Starting values — all empty
        initialValues={{ name: '', email: '' }}

        // Validation — checks if fields are correct
        validate={(values) => {
          const errors = {};
          if (!values.name)  errors.name  = 'Name is required';
          if (!values.email) errors.email = 'Email is required';
          else if (!values.email.includes('@'))
            errors.email = 'Enter a valid email';
          return errors;
        }}

        // What happens when Submit is pressed
        onSubmit={(values) => {
          Alert.alert(
            'Form 1 Submitted!',
            `Name: ${values.name}\nEmail: ${values.email}`
          );
        }}
      >
        {/* formikProps = big bag with all form tools */}
        {(formikProps) => (
          <View>

            {/* ── Name Field ── */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={formikProps.handleChange('name')}
              onBlur={formikProps.handleBlur('name')}
              value={formikProps.values.name}
            />
            {/* Show error only if field is touched and has error */}
            {formikProps.errors.name && formikProps.touched.name && (
              <Text style={styles.error}>{formikProps.errors.name}</Text>
            )}

            {/* ── Email Field ── */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChangeText={formikProps.handleChange('email')}
              onBlur={formikProps.handleBlur('email')}
              value={formikProps.values.email}
            />
            {formikProps.errors.email && formikProps.touched.email && (
              <Text style={styles.error}>{formikProps.errors.email}</Text>
            )}

            {/* ── Submit Button ── */}
            <TouchableOpacity
              style={styles.btn}
              onPress={formikProps.handleSubmit}
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
    color: '#6c63ff',
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
    backgroundColor: '#6c63ff',
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

export default FormikWithProps;