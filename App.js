// App.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';

// 3 Modals
import SimpleModal from './frontend/components/SimpleModal';
import InlineModal from './frontend/components/InlineModal';
import GlobalModal from './frontend/components/GlobalModal';

// 3 Formik Forms
import FormikWithProps from './frontend/screens/Formikwithprops';
import FormikWithDestructuring from './frontend/screens/Formikwithdestructuring';
import FormikInModal from './frontend/screens/Formikinmodal';

export default function App() {
  const [showSimple, setShowSimple] = useState(false);
  const [showInline, setShowInline] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.pageTitle}>Modal + Formik Project</Text>

        {/* ── 3 MODALS ── */}
        <Text style={styles.sectionTitle}>3 Modals</Text>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#6c63ff' }]} onPress={() => setShowSimple(true)}>
          <Text style={styles.btnText}>Modal 1 — Local StyleSheet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#e63946' }]} onPress={() => setShowInline(true)}>
          <Text style={styles.btnText}>Modal 2 — Inline Style</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#2a9d8f' }]} onPress={() => setShowGlobal(true)}>
          <Text style={styles.btnText}>Modal 3 — Global Style</Text>
        </TouchableOpacity>

        <SimpleModal visible={showSimple} onClose={() => setShowSimple(false)} />
        <InlineModal visible={showInline} onClose={() => setShowInline(false)} />
        <GlobalModal visible={showGlobal} onClose={() => setShowGlobal(false)} />

        {/* ── FORMIK 1 ── */}
        <Text style={styles.sectionTitle}>Formik 1 — Using Props</Text>
        <FormikWithProps />

        {/* ── FORMIK 2 ── */}
        <Text style={styles.sectionTitle}>Formik 2 — Destructuring</Text>
        <FormikWithDestructuring />

        {/* ── FORMIK 3 ── */}
        <Text style={styles.sectionTitle}>Formik 3 — Form in Modal</Text>
        <Text style={styles.sectionNote}>Press the button. A modal opens with a Formik form inside.</Text>
        <FormikInModal />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: '900', color: '#1a1a2e', textAlign: 'center', marginBottom: 10, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a2e', marginTop: 24, marginBottom: 10 },
  sectionNote: { fontSize: 13, color: '#888', marginBottom: 10 },
  btn: { padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 10, elevation: 3 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});