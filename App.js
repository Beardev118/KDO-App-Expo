import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import React from "react";
import { View, Dimensions, StyleSheet, YellowBox } from "react-native";
import { name as appName } from "./app.json";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";
import { MenuProvider } from "react-native-popup-menu";

import AppStart from "./AppStart";
import { GlobalState } from "./src/globalState/GlobalState";
import { SplashState } from "./src/globalState/SplashState";
import { MemberState } from "./src/globalState/MemberState";
import { InactiveState } from "./src/globalState/InactiveState";
import { EventActiveState } from "./src/globalState/EventActiveState";
import { EventAllMembersState } from "./src/globalState/EventAllMembersState";
import { AskBeforeTimeState } from "./src/globalState/AskBeforeTimeState";
import { InviteNumberState } from "./src/globalState/InviteNumberState";

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
  YellowBox.ignoreWarnings(["Setting a timer"]);
  YellowBox.ignoreWarnings([
    "Can't perform a React state update on an unmounted component."
  ]);
  return (
    <View style={{ flex: 1 }}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <MenuProvider>
          <MemberState>
            <SplashState>
              <GlobalState>
                <InactiveState>
                  <EventActiveState>
                    <EventAllMembersState>
                      <AskBeforeTimeState>
                        <InviteNumberState>
                          <AppStart />
                        </InviteNumberState>
                      </AskBeforeTimeState>
                    </EventAllMembersState>
                  </EventActiveState>
                </InactiveState>
              </GlobalState>
            </SplashState>
          </MemberState>
        </MenuProvider>
      </ThemeContext.Provider>
    </View>
  );
}
