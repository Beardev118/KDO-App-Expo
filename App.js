import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { name as appName } from "./app.json";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";
import { MenuProvider } from "react-native-popup-menu";

import AppStart from "./AppStart";
import { GlobalState } from "./src/globalState/GlobalState";
import { SplashState } from "./src/globalState/SplashState";

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

// const styles = StyleSheet.create({
//   // container: {
//   //   flexDirection: "column"
//   // },
//   // backdrop: {
//   //   backgroundColor: "red",
//   //   opacity: 0.5
//   // },
//   anchorStyle: {
//     backgroundColor: "blue"
//   }
// });

// const menuProviderStyles = {
//   // menuProviderWrapper: styles.container,
//   // backdrop: styles.backdrop

// };

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <MenuProvider>
          <SplashState>
            <GlobalState>
              <AppStart />
            </GlobalState>
          </SplashState>
        </MenuProvider>
      </ThemeContext.Provider>
    </View>
  );
}
