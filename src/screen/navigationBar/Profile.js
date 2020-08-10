import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E6DD",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textInputContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginHorizontal: 40
  },
  profileTextInput: {
    flex: 1,
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10
  },
  profileScreenButton: {
    width: 90,
    height: 44,
    // backgroundColor: "#27842A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#6B6B6B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32
  },
  btnText: {
    fontSize: 14,
    textAlignVertical: "center"
  }
});

function Profile() {
  const [userName, onChangeUserName] = useState("Jméno");
  const [phoneNumber, onChangePhoneNumber] = useState("Telefon");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userImage}
        onPress={() => Alert.alert("Simple Button pressed")}
        underlayColor="#fff"
      >
        <IconButton
          icon="camera"
          color={Colors.gray}
          size={50}
          // onPress={this.showMenu}
        />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch" }}>
        <View style={styles.textInputContainer}>
          <IconButton
            icon="account"
            color={Colors.black}
            size={32}
            // onPress={this.showMenu}
          />
          <TextInput
            style={styles.profileTextInput}
            onChangeText={text => onChangeUserName(text)}
            value={userName}
          />
        </View>
        <View style={{ ...styles.textInputContainer, marginTop: 32 }}>
          <IconButton
            icon="phone"
            color={Colors.black}
            size={32}
            // onPress={this.showMenu}
          />
          <TextInput
            style={styles.profileTextInput}
            onChangeText={text => onChangePhoneNumber(text)}
            value={phoneNumber}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 88,
          alignSelf: "stretch",
          justifyContent: "space-around"
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.profileScreenButton,
            marginTop: 8,
            backgroundColor: "#FFF"
          }}
          onPress={() => Alert.alert("back")}
          underlayColor="#fff"
        >
          <Text style={{ ...styles.btnText, color: "#969696" }}>Zpět</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.profileScreenButton,
            marginTop: 8,
            backgroundColor: "#28742A"
          }}
          onPress={() => Alert.alert("Save")}
          underlayColor="#fff"
        >
          <Text style={{ ...styles.btnText, color: "white" }}>Uložit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
