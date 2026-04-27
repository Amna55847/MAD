// InlineModal.js
// ── MODAL 2 ──────────────────────────────────────────────────────────────────
// This modal uses INLINE styles.
// Every style is written directly on the component using style={{ }}
// There is NO StyleSheet.create and NO global file imported.

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const InlineModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">

      {/* Overlay — inline style */}
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        {/* Card — inline style */}
        <View style={{
          backgroundColor: '#fff',
          width: '85%',
          borderRadius: 16,
          padding: 24,
          elevation: 6,
        }}>

          {/* Title — inline style */}
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#e63946',
            marginBottom: 10,
          }}>
            Inline Modal
          </Text>

          {/* Body — inline style */}
          <Text style={{
            fontSize: 15,
            color: '#555',
            marginBottom: 20,
            lineHeight: 22,
          }}>
            This is Modal 2. Every style is written inline directly
            on each element using style curly braces.
            No StyleSheet, no global file.
          </Text>

          {/* Button — inline style */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#e63946',
              padding: 12,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
              Close
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default InlineModal;