import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  View,
  Modal,
  Text,
  Linking,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../styles/login";

const ForgotPasswordModal = ({ visible, setShowModal }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => {
          setShowModal(false);
        }}
        style={styles.modal}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalBox}>
            <Text style={styles.modalHead}>
              Please contact your administrator
            </Text>

      
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ForgotPasswordModal;
