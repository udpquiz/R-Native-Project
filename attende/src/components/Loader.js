import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const Loader = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Loader; 