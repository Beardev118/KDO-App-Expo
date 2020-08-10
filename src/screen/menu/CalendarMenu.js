import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { IconButton, Colors } from "react-native-paper";

class CalendarMenu extends React.PureComponent {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };
  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Menu
          ref={this.setMenuRef}
          button={
            <IconButton
              icon="dots-vertical"
              color={Colors.white}
              size={28}
              onPress={this.showMenu}
            />
          }
        >
          <MenuItem onPress={this.hideMenu}>
            <Text style={{ fontSize: 16 }}>Editor Akcí</Text>
          </MenuItem>
          <MenuItem onPress={this.hideMenu}>
            <Text style={{ fontSize: 16 }}>Profil</Text>
          </MenuItem>
          <View style={{ flexDirection: "row" }}>
            <MenuItem onPress={this.hideMenu}>
              <Text style={{ fontSize: 16 }}>Zobrazit vše</Text>
            </MenuItem>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              //   onValueChange={toggleSwitch}
              value={"false"}
            />
          </View>

          {/* <MenuDivider /> */}
          <MenuItem onPress={this.hideMenu}>
            <Text style={{ fontSize: 16 }}>Zavřít</Text>
          </MenuItem>
        </Menu>
      </View>
    );
  }
}

// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger
// } from "react-native-popup-menu";

// const CalendarMenu = () => (
//   <Menu>
//     <MenuTrigger text="Select action" />
//     <MenuOptions>
//       <MenuOption onSelect={() => alert(`Save`)} text="Save" />
//       <MenuOption onSelect={() => alert(`Delete`)}>
//         <Text style={{ color: "red" }}>Delete</Text>
//       </MenuOption>
//       <MenuOption
//         onSelect={() => alert(`Not called`)}
//         disabled={true}
//         text="Disabled"
//       />
//     </MenuOptions>
//   </Menu>
// );
export default CalendarMenu;
