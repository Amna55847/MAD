// GlobalModal.js
// ── MODAL 3 ──────────────────────────────────────────────────────────────────
// This modal uses GLOBAL styles.
// All styles are imported from globalStyles.js
// There is NO StyleSheet.create here and NO inline styles.

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles'; // ← importing shared styles

const GlobalModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">

      {/* Using globalStyles.overlay */}
      <View style={globalStyles.overlay}>

        {/* Using globalStyles.modalBox */}
        <View style={globalStyles.modalBox}>

          {/* Using globalStyles.modalTitle */}
          <Text style={globalStyles.modalTitle}>Global Modal</Text>

          {/* Using globalStyles.modalText */}
          <Text style={globalStyles.modalText}>
            This is Modal 3. All styles come from globalStyles.js file.
            No StyleSheet here, no inline styles.
            Just import and use!
          </Text>

          {/* Using globalStyles.closeBtn and globalStyles.closeBtnText */}
          <TouchableOpacity style={globalStyles.closeBtn} onPress={onClose}>
            <Text style={globalStyles.closeBtnText}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default GlobalModal;