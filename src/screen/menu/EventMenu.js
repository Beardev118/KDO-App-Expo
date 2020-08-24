import React, { useContext } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
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
import { AskBeforeTimeContext } from "../../globalState/AskBeforeTimeState";
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
  },
  btnAskBefore: {
    width: 44,
    height: 44,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textBtnAskBefore: {
    textAlign: "center",
    textAlignVertical: "center",
    padding: 4,
    fontSize: 16
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
  const [timeAskBefore, setTimeAskBefore] = useContext(AskBeforeTimeContext);
  const position = { top: 0, left: 0 };

  const toggleActiveSwitch = () => setEventActiveStatus(prev => !prev);
  const toggleAllMembersSwitch = () => setEventAllMembersStatus(prev => !prev);

  const onIncreaseABTime = () => {
    if (timeAskBefore > 39) {
      setTimeAskBefore(40);
    } else {
      setTimeAskBefore(prev => prev + 1);
    }
  };

  const onDecreaseABTime = () => {
    if (timeAskBefore === 1) {
      setTimeAskBefore(1);
    } else {
      setTimeAskBefore(prev => prev - 1);
    }
  };

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
            <Text style={{ ...styles.optionText, width: 140 }}>neaktivní</Text>
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
        // onSelect={toggleMuteSwitch}
        //   disabled={true}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ ...styles.optionText, width: 100 }}>askBefore</Text>
            <TouchableOpacity
              style={{ ...styles.btnAskBefore }}
              onPress={onDecreaseABTime}
            >
              <Text style={styles.textBtnAskBefore}>[ - ]</Text>
            </TouchableOpacity>
            <Text style={styles.textBtnAskBefore}>{timeAskBefore}</Text>
            <TouchableOpacity
              style={styles.btnAskBefore}
              onPress={onIncreaseABTime}
            >
              <Text style={styles.textBtnAskBefore}>[ + ]</Text>
            </TouchableOpacity>
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
