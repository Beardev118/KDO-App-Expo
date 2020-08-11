import "react-native-gesture-handler";
import React from "react";
import { Text, View, Button } from "react-native";

import NavBar from "./src/screen/navigationBar/NavBar";

const AppStart = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >
      <NavBar />
    </View>
  );
};
export default AppStart;
