import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";

const window = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E9E6DD"
  },
  headerText: {
    color: "#6B6B6B"
  },
  authButton: {
    width: 140,
    height: 44,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#27842A",
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
    elevation: 3
  },
  authText: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  profileTextInput: {
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    backgroundColor: "#FFF",
    textAlign: "left",
    textAlignVertical: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 30,
    fontWeight: "bold",
    color: "#6B6B6B"
  },
  backResendButton: {
    height: 44
  },
  backResendText: {
    color: "#27842A"
  }
});

function Login({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("777123456");
  const [authCode, onChangeAuthCode] = useState(" . . . . . . ");

  return (
    <ScrollView style={{ backgroundColor: "#E9E6DD" }}>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 30, marginTop: 36, color: "#6B6B6B" }}>
          Přihlášení
        </Text>
        <Text style={{ fontSize: 18, marginTop: 16, color: "#6B6B6B" }}>
          Zadejte své telefonní číslo
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, color: "#6B6B6B", fontWeight: "bold" }}>
            +420
          </Text>
          <TextInput
            style={{ ...styles.profileTextInput, width: 185 }}
            onChangeText={text => onChangePhoneNumber(text)}
            value={phoneNumber}
          />
        </View>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => Alert.alert("Simple Button pressed")}
          underlayColor="#fff"
        >
          <Text style={styles.authText}>Přihlásit</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 16 }}>Firebase User ID: 123456789abc</Text>
        <TouchableOpacity
          style={{ ...styles.backResendButton, marginTop: 8 }}
          onPress={() => Alert.alert("back")}
          underlayColor="#fff"
        >
          <Text style={styles.backResendText}>Zpět</Text>
        </TouchableOpacity>
        <TextInput
          style={{ ...styles.profileTextInput, width: 130 }}
          onChangeText={text => onChangeAuthCode(text)}
          value={authCode}
        />
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => navigation.navigate("Home")}
          underlayColor="#fff"
        >
          <Text style={styles.authText}>Ověřit kód</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.backResendButton, marginTop: 24 }}
          onPress={() => Alert.alert("Resend Auth Code")}
          underlayColor="#fff"
        >
          <Text style={styles.backResendText}>Poslat znovu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Login;
