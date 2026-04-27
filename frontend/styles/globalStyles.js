// globalStyles.js
// This file is the SHARED stylesheet.
// Any component can import from here and use these styles.

import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Used in GlobalModal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2a9d8f',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
    lineHeight: 22,
  },
  closeBtn: {
    backgroundColor: '#2a9d8f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default globalStyles;