import React, { useContext } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
// import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { IconButton, Colors } from "react-native-paper";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import SlideLeftMenu from "./SlideLeftMenu";
import { EventActiveContext } from "../../globalState/EventActiveState";
import { EventMuteContext } from "../../globalState/EventMuteState";
import { EventAllMembersContext } from "../../globalState/EventAllMembersState";
import { from } from "rxjs/observable/from";
import Constants from "expo-constants";

const { ContextMenu, SlideInMenu, Popover, NotAnimatedContextMenu } = renderers;

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
    paddingVertical: 10,
    paddingHorizontal: 2
  }
});

const window = Dimensions.get("window");

function EventMenu(props) {
  const [eventActiveStatus, setEventActiveStatus] = useContext(
    EventActiveContext
  );
  const [eventAllMembersStatus, setEventAllMembersStatus] = useContext(
    EventAllMembersContext
  );
  const [eventMuteStatus, setEventMuteStatus] = useContext(EventMuteContext);
  const position = { top: 0, left: 0 };

  const toggleActiveSwitch = () => setEventActiveStatus(prev => !prev);
  const toggleMuteSwitch = () => setEventMuteStatus(prev => !prev);
  const toggleAllMembersSwitch = () => setEventAllMembersStatus(prev => !prev);

  return (
    <Menu renderer={SlideLeftMenu}>
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
        style={[position]}
        optionsContainerStyle={{
          marginTop: 60,
          paddingLeft: 8,
          width: 220,
          height: Constants.platform.ios ? window.height : window.height - 20
        }}
      >
        {/* customStyles={optionsStyles} */}
        <MenuOption
          onSelect={toggleActiveSwitch}
          //   disabled={true}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.optionText, width: 140 }}>
              Active / Inactive
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleActiveSwitch}
              value={eventActiveStatus}
              style={{ marginLeft: 5 }}
            />
          </View>
        </MenuOption>
        <MenuOption
          onSelect={toggleMuteSwitch}
          //   disabled={true}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.optionText, width: 140 }}>Mute</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleMuteSwitch}
              value={eventMuteStatus}
              style={{ marginLeft: 5 }}
            />
          </View>
        </MenuOption>
        <MenuOption
          onSelect={toggleAllMembersSwitch}
          //   disabled={true}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.optionText, width: 140 }}>
              Show all members
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAllMembersSwitch}
              value={eventAllMembersStatus}
              style={{ marginLeft: 5 }}
            />
          </View>
        </MenuOption>
        <MenuOption onSelect={() => props.navigation.navigate("Invite")}>
          <Text style={styles.optionText}>Pozvat na akci</Text>
        </MenuOption>
        <MenuOption>
          <Text style={styles.optionText}>Nastavení</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
export default EventMenu;
