import { useState, useEffect } from "react";
import BoxAndButton from "../components/BoxAndButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { useLoading } from "../hooks/useLoading";

const AppealLeave = () => {
  const [text, setText] = useState("");
  const [studentId, setStudentId] = useState("");
  const { withLoading } = useLoading();

  const getToken = async () => {
    try {
      await withLoading(async () => {
        const token = await SecureStore.getItemAsync("user");
        if (token) {
          console.log(JSON.parse(token));
          setStudentId(JSON.parse(token).id);
        }
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to get user information", [
        {
          text: "OK",
        },
      ]);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleSubmit = async () => {
    if (text.length === 0) {
      Alert.alert("Error", "Please enter your appeal");
      return;
    }

    try {
      await withLoading(async () => {
        await addDoc(collection(db, "leave_appeals"), {
          student: studentId,
          message: text,
          date: Timestamp.fromDate(new Date()),
          status: "",
        });

        Alert.alert("Success", "Your appeal has been sent");
        setText("");
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to send appeal", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <BoxAndButton
      text={text}
      setText={setText}
      icon={faPaperPlane}
      btnText="Appeal leave"
      handleSubmit={handleSubmit}
    />
  );
};

export default AppealLeave;
