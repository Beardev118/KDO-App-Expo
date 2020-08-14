import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
// import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { IconButton, Colors } from "react-native-paper";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

const optionsStyles = {
  optionsContainer: {
    // backgroundColor: "green",
    padding: 5
  },
  optionsWrapper: {
    backgroundColor: "purple"
  },
  optionWrapper: {
    backgroundColor: "yellow",
    margin: 5
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70
  }
};

const styles = StyleSheet.create({
  optionText: {
    // color: "brown",
    fontSize: 16,
    padding: 5
  }
});

function CalendarMenu(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Menu>
      <MenuTrigger>
        <View>
          <IconButton
            icon="dots-vertical"
            color={Colors.white}
            size={28}
            // onPress={this.showMenu}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{ marginTop: 60, paddingLeft: 8, width: 180 }}
      >
        {/* customStyles={optionsStyles} */}
        <MenuOption onSelect={() => props.navigation.navigate("EventManager")}>
          <Text style={styles.optionText}>Editor Akcí</Text>
        </MenuOption>
        <MenuOption onSelect={() => props.navigation.navigate("Profile")}>
          <Text style={styles.optionText}>Profil</Text>
        </MenuOption>
        <MenuOption
        //   onSelect={() => alert(`Not called`)}
        //   disabled={true}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.optionText}>Zobrazit vše</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginLeft: 10 }}
            />
          </View>
        </MenuOption>
        <MenuOption>
          <Text style={styles.optionText}>Zavřít</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
export default CalendarMenu;
