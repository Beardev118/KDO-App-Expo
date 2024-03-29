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

function EditUserGroupMenu(props) {
  return (
    <Menu
      style={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <MenuTrigger>
        <View>
          <IconButton
            icon="dots-vertical"
            color={Colors.white}
            size={28} // onPress={this.showMenu}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{ marginTop: 60, paddingLeft: 8, width: 160 }}
      >
        {/* customStyles={optionsStyles} */}
        <MenuOption onSelect={() => alert("Delete Subject")}>
          <Text style={styles.optionText}>Smazat skupinu</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
export default EditUserGroupMenu;
