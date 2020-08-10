import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
// import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { IconButton, Colors } from "react-native-paper";

// class CalendarMenu extends React.PureComponent {
//   _menu = null;

//   setMenuRef = ref => {
//     this._menu = ref;
//   };

//   hideMenu = () => {
//     this._menu.hide();
//   };
//   showMenu = () => {
//     this._menu.show();
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Menu
//           ref={this.setMenuRef}
//           button={
//             <IconButton
//               icon="dots-vertical"
//               color={Colors.white}
//               size={28}
//               onPress={this.showMenu}
//             />
//           }
//         >
//           <MenuItem onPress={this.hideMenu}>
//             <Text style={{ fontSize: 16 }}>Editor Akcí</Text>
//           </MenuItem>
//           <MenuItem onPress={this.hideMenu}>
//             <Text style={{ fontSize: 16 }}>Profil</Text>
//           </MenuItem>
//           <View style={{ flexDirection: "row" }}>
//             <MenuItem onPress={this.hideMenu}>
//               <Text style={{ fontSize: 16 }}>Zobrazit vše</Text>
//             </MenuItem>
//             <Switch
//               trackColor={{ false: "#767577", true: "#81b0ff" }}
//               thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
//               ios_backgroundColor="#3e3e3e"
//               //   onValueChange={toggleSwitch}
//               value={"false"}
//             />
//           </View>

//           {/* <MenuDivider /> */}
//           <MenuItem onPress={this.hideMenu}>
//             <Text style={{ fontSize: 16 }}>Zavřít</Text>
//           </MenuItem>
//         </Menu>
//       </View>
//     );
//   }
// }

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

function CalendarMenu() {
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
        style={{
          paddingTop: 60,
          flex: 1,
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.2)"
        }}
      >
        <MenuOption onSelect={() => alert(`Save`)}>
          <Text style={{ fontSize: 16, padding: 5 }}>Editor Akcí</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{ fontSize: 16 }}>Profil</Text>
        </MenuOption>
        <MenuOption
        //   onSelect={() => alert(`Not called`)}
        //   disabled={true}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16 }}>Zobrazit vše</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              //   onValueChange={toggleSwitch}
              value={"false"}
            />
          </View>
        </MenuOption>
        <MenuOption>
          <Text style={{ fontSize: 16 }}>Zavřít</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
export default CalendarMenu;
