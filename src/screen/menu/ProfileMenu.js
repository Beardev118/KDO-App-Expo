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

function ProfileMenu(props) {
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
        optionsContainerStyle={{ marginTop: 60, paddingLeft: 8, width: 160 }}
      >
        {/* customStyles={optionsStyles} */}
        <MenuOption onSelect={() => props.navigation.navigate("Setting")}>
          <Text style={styles.optionText}>Nastavení</Text>
        </MenuOption>
        <MenuOption onSelect={() => props.navigation.navigate("Login")}>
          <Text style={styles.optionText}>Odhlásit</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

export default ProfileMenu;
