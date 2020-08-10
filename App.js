import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import React from "react";
import { View, Dimensions } from "react-native";
import { name as appName } from "./app.json";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";

import AppStart from "./AppStart";
import { GlobalState } from "./src/globalState/GlobalState";

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500
  },
  toolbar: {
    container: {
      height: 50
    }
  }
};

const window = Dimensions.get("window");

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <GlobalState>
          <AppStart />
        </GlobalState>
      </ThemeContext.Provider>
    </View>
  );
}
