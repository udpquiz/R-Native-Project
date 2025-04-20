import { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import BoxAndButton from "../components/BoxAndButton";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-native";
import { useLoading } from "../hooks/useLoading";

const CreateNotice = () => {
  const [text, setText] = useState("");
  const { withLoading } = useLoading();

  const handleSubmit = async () => {
    if (text.length === 0) {
      Alert.alert("Error", "Please enter a notice information");
      return;
    }

    try {
      await withLoading(async () => {
        await addDoc(collection(db, "notices"), {
          message: text,
          date: Timestamp.fromDate(new Date()),
        });

        Alert.alert("Success", "Notice is successfully published");
        setText("");
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to publish notice", [
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
      icon={faUpload}
      btnText="Publish notice"
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateNotice;
