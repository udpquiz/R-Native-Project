import React from "react";

import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_100Thin,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

import Login from "../components/Login";

function Loginstudent({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
    Poppins_500Medium,
    Poppins_100Thin,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Login navigation={navigation} role="student" navv="Studenthome"/>;
}
export default Loginstudent;
