import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
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
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E9E6DD"
  },
  inviteScreenButton: {
    width: 111,
    height: 38,
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
    elevation: 3,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    textAlignVertical: "center"
  },
  btnView: {
    alignItems: "center"
  },
  titleText: {
    fontSize: 24,
    marginTop: 28,
    fontWeight: "bold",
    color: "#6B6B6B"
  },
  basicText: {
    fontSize: 18,
    color: "#6B6B6B"
  },
  phoneNumberInput: {
    marginHorizontal: 8,
    backgroundColor: "white",
    fontSize: 30,
    fontWeight: "bold",
    width: 190
  },
  messageInput: {
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "stretch",
    textAlignVertical: "top",
    fontStyle: "italic",
    padding: 4
  },
  prefix: {
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 8,
    color: "#6B6B6B"
  }
});

function Invite() {
  const [valueMessage, onChangeMessage] = useState("Možná");
  const [phoneNumber, onChangePhoneNumber] = useState("777123456");

  return (
    <ScrollView style={{ backgroundColor: "#E9E6DD" }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Title</Text>
        <View
          style={{
            marginTop: 32,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Text style={styles.basicText}>Zadejte telefonní číslo</Text>
          <Text style={styles.basicText}>nebo</Text>
          <Text style={styles.basicText}>vyberte kontakt</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8
          }}
        >
          <Text style={styles.prefix}>+420</Text>
          <TextInput
            style={styles.phoneNumberInput}
            onChangeText={text => onChangePhoneNumber(text)}
            value={phoneNumber}
          />
          <IconButton
            icon="account"
            color={Colors.black}
            size={28}
            style={{ backgroundColor: "#969696" }}
            // onPress={this.showMenu}
          />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={{ ...styles.inviteScreenButton, marginTop: 32 }}
            onPress={() => Alert.alert("Simple Button pressed")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Pokračovat</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Text style={{ fontSize: 14, color: "#6B6B6B" }}>
            Ověřuji číslovc
          </Text>
          <Progress.Bar
            progress={0.3}
            width={200}
            color={"rgba(0, 0, 0, 0.6)"}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 36 }}>
          <Text style={{ color: "#6B6B6B", fontSize: 18 }}>
            Informujte uživatele SMSkou
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.messageInput}
            onChangeText={text => onChangeMessage(text)}
            value={valueMessage}
          />
          <TouchableOpacity
            style={{ ...styles.inviteScreenButton, marginTop: 8 }}
            onPress={() => Alert.alert("Simple Button pressed")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Odeslat SMS</Text>
          </TouchableOpacity>
          <Text style={{ color: "#27842A" }}>Pozvánka byla vytvořena.</Text>
          <View
            style={{
              backgroundColor: "#FFFDE7",
              padding: 4,
              borderRadius: 6,
              marginTop: 4,
              marginBottom: 8
            }}
          >
            <Text style={{ color: "#6B6B6B" }}>
              Uživatel si pozvánku přečte v aplikaci.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Invite;
