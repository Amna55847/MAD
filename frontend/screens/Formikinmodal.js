// FormikInModal.js
// ── FORMIK FORM 3 ─────────────────────────────────────────────────────────────
// This file has a button. When pressed → a Modal opens.
// Inside that Modal there is a Formik form.
// This is the combination of Modal + Formik together.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Formik } from 'formik';

const FormikInModal = () => {
  // This controls whether the modal is open or closed
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>

      {/* ── Button that OPENS the modal ── */}
      <TouchableOpacity
        style={styles.openBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openBtnText}>Open Form Modal</Text>
      </TouchableOpacity>

      {/* ── The Modal ── */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.overlay}>
          <View style={styles.card}>

            <Text style={styles.modalTitle}>Formik 3 — Form in Modal</Text>
            <Text style={styles.modalNote}>
              This Formik form lives inside a Modal.
              Fill the form and press Submit.
            </Text>

            {/* ── Formik Form inside Modal ── */}
            <Formik
              initialValues={{ fullName: '', email: '', phone: '' }}

              validate={(values) => {
                const errors = {};
                if (!values.fullName) errors.fullName = 'Full name required';
                if (!values.email)    errors.email    = 'Email required';
                else if (!values.email.includes('@'))
                  errors.email = 'Invalid email';
                if (!values.phone) errors.phone = 'Phone required';
                return errors;
              }}

              onSubmit={(values, { resetForm }) => {
                Alert.alert(
                  'Registered!',
                  `Name: ${values.fullName}\nEmail: ${values.email}\nPhone: ${values.phone}`
                );
                resetForm();                  // clear fields
                setModalVisible(false);       // close modal
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>

                  {/* Full Name */}
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text style={styles.error}>{errors.fullName}</Text>
                  )}

                  {/* Email */}
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  {/* Phone */}
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitBtnText}>Submit</Text>
                  </TouchableOpacity>

                </View>
              )}
            </Formik>

            {/* Cancel — closes modal without submitting */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  // Open button
  openBtn: {
    backgroundColor: '#e76f51',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  openBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Modal overlay
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal white card
  card: {
    backgroundColor: '#fff',
    width: '88%',
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e76f51',
    marginBottom: 4,
  },
  modalNote: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },

  // Inputs
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

  // Submit button
  submitBtn: {
    backgroundColor: '#e76f51',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Cancel button
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
  },
});

export default FormikInModal;