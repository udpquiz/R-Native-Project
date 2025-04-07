import styles from "../styles/take_attendance";
import { ScrollView, SafeAreaView, View, Alert, LogBox } from "react-native";
import StudentBox from "../components/StudentBox";
import { faAngleDoubleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import colors from "../../config/colors";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import AttendanceModal from "../components/AttendanceModal";
import { useLoading } from "../hooks/useLoading";

const Attendance = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false); // control modal visibility
  const [students, setStudents] = useState([]); // array of student objects
  const [presentStudents, setPresentStudents] = useState([]); // array of present student ids
  const { withLoading } = useLoading();

  const getStudents = async () => {
    try {
      await withLoading(async () => {
        // query to fetch only student data
        const q = query(
          collection(db, "users"),
          where("role", "==", "student"),
          orderBy("roll_no", "asc")
        );

        // fetching all the documents
        const querySnapshot = await getDocs(q);

        // extracting the data from the documents
        const items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // setting the students
        setStudents(items);

        //get id of all students
        const ids = items.map((student) => student.id);

        // set the present students
        setPresentStudents(ids);
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch students", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const handleSubmit = async () => {
    // make an array of absent student ids
    const absentStudents = students
      .map((student) => student.id)
      .filter((id) => !presentStudents.includes(id));

    // update the attendance in the database

    try {
      await withLoading(async () => {
        await addDoc(collection(db, "attendance"), {
          presentStudents,
          absentStudents,
          date: Timestamp.fromDate(new Date()),
        });

        // show success message
        Alert.alert("Success", "Attendance has been marked");
        navigation.navigate("Teacherhome");
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save attendance", [
        {
          text: "OK",
        },
      ]);
    }
  };

  useEffect(() => {
    // get the students
    getStudents();

    // Ignore the warning about the setting a timer
    LogBox.ignoreLogs(["Setting a timer"]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {students.map((student) => (
          <StudentBox
            key={student.id}
            setPresentStudents={setPresentStudents}
            presentStudents={presentStudents}
            item={student}
          />
        ))}

        <View style={styles.buttons}>
          <Button
            onPress={() => navigation.navigate("Teacherhome")}
            text="Cancel"
            icon={faTimes}
            color={colors.red}
            styles={styles}
          />
          <Button
            onPress={() => setShowModal(true)}
            text="Next"
            icon={faAngleDoubleRight}
            color={colors.primary}
            styles={styles}
          />
        </View>
      </ScrollView>

      <AttendanceModal
        handleSubmit={handleSubmit}
        presentStudents={presentStudents}
        visible={showModal}
        setShowModal={setShowModal}
        allStudentsId={students.map((student) => student.id)}
      />
    </SafeAreaView>
  );
};

export default Attendance;
