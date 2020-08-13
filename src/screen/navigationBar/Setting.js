import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E6DD",
    justifyContent: "flex-start"
  },
  profileTextInput: {
    height: 200,
    alignSelf: "stretch",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    padding: 8
  },
  profileScreenButton: {
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
    justifyContent: "center",
    margin: 8,
    paddingVertical: 5,
    paddingHorizontal: 10
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
    textAlignVertical: "center",
    color: "#6B6B6B"
  }
});

function Setting() {
  const [message, onChangeMessage] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ marginTop: 24, alignItems: "center" }}>
          <Text style={{ color: "#6B6B6B", marginHorizontal: 8, fontSize: 14 }}>
            KDO PŘIJDE
          </Text>
          <Text
            style={{
              color: "#6B6B6B",
              marginHorizontal: 8,
              marginTop: 16,
              fontSize: 14
            }}
          >
            Verze buildu
          </Text>
          <Text style={{ color: "#6B6B6B", marginTop: 16, fontSize: 14 }}>
            Poslat zpětnou vazbu
          </Text>
        </View>
        <View style={{ alignSelf: "stretch", marginTop: 8 }}>
          <TextInput
            multiline
            numberOfLines={7}
            style={styles.profileTextInput}
            onChangeText={text => onChangeMessage(text)}
            value={message}
            placeholder="Jméno"
            placeholderTextColor="#969696"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.profileScreenButton,
              backgroundColor: "#FFF",
              width: 160
            }}
            onPress={() => Alert.alert("send")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Poslat zprávu</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginTop: 28,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.profileScreenButton,
              backgroundColor: "#FFF"
            }}
            onPress={() => Alert.alert("FCM")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Poslat testovací zprávu sobě</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Setting;
