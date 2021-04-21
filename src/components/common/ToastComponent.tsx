import * as React from 'react';
import {
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ToastContext } from '../../context/Toast/ToastContext';

export const ToastComponent = () => {
  const { toast, hide } = React.useContext(ToastContext);
  const timeout = React.useRef<number>();

  const translateYRef = React.useRef(new Animated.Value(-100));

  React.useEffect(() => {
    if (toast && toast.visible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (toast && toast.visible) {
      timeout.current = setTimeout(hide, 1500);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY: translateYRef.current }] },
      ]}
    >
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessage}>{toast && toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 4,
    marginHorizontal: 16,
    padding: 4,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: '#ff3f3f',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%',
  },
  toastMessage: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
});
