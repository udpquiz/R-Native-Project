import React, { useState, useEffect } from "react";
import Loginstudent from "./src/screens/Loginstudent";
import Loginteacher from "./src/screens/Loginteacher";
import Welcome from "./src/screens/Welcome";
import colors from "./config/colors";
import Teacherhome from "./src/screens/Teacherhome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Takeattendance from "./src/screens/TakeAttendance";
import Studenthome from "./src/screens/Studenthome";
import AttendanceRecord from "./src/screens/AttendanceRecord";
import * as SecureStore from "expo-secure-store";
import Attendanceinfo from "./src/screens/Attendanceinfo";
import { LoaderProvider, useLoader } from "./src/context/LoaderContext";
import Loader from "./src/components/Loader";
import AppealLeave from "./src/screens/AppealLeave";
import LeaveAppeals from "./src/screens/BrowseLeaveAppeals";
import CreateNotice from "./src/screens/CreateNotice";
import PreviousNotices from "./src/screens/PreviousNotices";

import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_100Thin,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { loading } = useLoader();
  const [date, setDate] = useState(null);
  const [defaultScreen, setDefaultScreen] = useState("Welcome");

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("user");
    if (token) {
      console.log(token);
      const role = JSON.parse(token).role;
      if (role === "student") {
        setDefaultScreen("Studenthome");
      } else {
        setDefaultScreen("Teacherhome");
      }
    }
  };

  useEffect(() => {
    getToken();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(date);
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Loader visible={loading} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={defaultScreen}>
          <Stack.Screen
            name="Attendance"
            component={Takeattendance}
            options={{
              title: "Attendance: " + date,
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />

          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Logins"
              component={Loginstudent}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Logint"
              component={Loginteacher}
              options={{
                headerShown: false,
              }}
            />
          </>
          <Stack.Screen
            name="Teacherhome"
            component={Teacherhome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Studenthome"
            component={Studenthome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Attendancerecord"
            component={AttendanceRecord}
            options={{
              title: "Attendance record",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
          <Stack.Screen
            name="CreateNotice"
            component={CreateNotice}
            options={{
              title: "Create Notice",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
          <Stack.Screen
            name="PreviousNotices"
            component={PreviousNotices}
            options={{
              title: "Previous Notices",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
          <Stack.Screen
            name="BrowseLeaveAppeals"
            component={LeaveAppeals}
            options={{
              title: "Leave Appeals",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
          <Stack.Screen
            name="AppealLeave"
            component={AppealLeave}
            options={{
              title: "Appeal leave",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
          <Stack.Screen
            name="Studentinfo"
            component={Attendanceinfo}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: colors.white,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}
