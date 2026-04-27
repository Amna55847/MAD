// SimpleModal.js
// ── MODAL 1 ──────────────────────────────────────────────────────────────────
// This modal uses a LOCAL StyleSheet defined at the BOTTOM of this file.
// No inline styles. No global styles. Everything is private to this file.

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SimpleModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">

      {/* Dark background */}
      <View style={styles.overlay}>

        {/* White card */}
        <View style={styles.box}>
          <Text style={styles.title}>Simple Modal</Text>
          <Text style={styles.body}>
            This is Modal 1. It uses a local StyleSheet.create() written
            at the bottom of this file. No inline, no global styles.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

// ── Local Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6c63ff',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  btn: {
    backgroundColor: '#6c63ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default SimpleModal;