import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";
import { firebase } from "../../firebase/config";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

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
    color: "#000"
  },
  backResendButton: {
    height: 44
  },
  backResendText: {
    color: "#27842A"
  }
});

function Login({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [authCode, onChangeAuthCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showBack, setShowBack] = useState(false);

  // Function to be called when requesting for a verification code
  const sendVerification = () => {
    if (phoneNumber != "") {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(function(confirmationResult) {
          console.log("AA", confirmationResult);
          setVerificationId(confirmationResult);
          setShowBack(true);
          setShowAuth(true);
        })
        .catch(function(error) {
          setShowAuth(false);
          setShowBack(true);
        });
    }
  };

  const initVerification = () => {
    setShowAuth(false);
    setShowBack(false);
    onChangePhoneNumber("");
    onChangeAuthCode("");
  };

  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  const confirmCode = () => {
    console.log("BB", verificationId);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      authCode
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(result => {
        // Do something with the results here
        console.log(result);
        navigation.navigate("Home");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#E9E6DD" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <ScrollView style={{ backgroundColor: "#E9E6DD", width: "100%" }}>
          <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 30, marginTop: 36, color: "#6B6B6B" }}>
              Přihlášení
            </Text>
            <Text style={{ fontSize: 18, marginTop: 16, color: "#6B6B6B" }}>
              Zadejte své telefonní číslo
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 24, color: "#6B6B6B", fontWeight: "bold" }}
              >
                +420
              </Text>
              <TextInput
                style={{ ...styles.profileTextInput, width: 185 }}
                onChangeText={text => onChangePhoneNumber(text)}
                value={phoneNumber}
                placeholder="777123456"
                placeholderTextColor="#969696"
                keyboardType="phone-pad"
              />
            </View>
            <TouchableOpacity
              style={styles.authButton}
              // onPress={sendVerification}
              onPress={sendVerification}
              underlayColor="#fff"
            >
              <Text style={styles.authText}>Přihlásit</Text>
            </TouchableOpacity>
            {showBack ? (
              <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
                <Text style={{ marginTop: 16 }}>
                  {showAuth ? "Kód odeslán" : "Chyba ověření"}
                </Text>
                <TouchableOpacity
                  style={{ ...styles.backResendButton, marginTop: 8 }}
                  onPress={initVerification}
                  underlayColor="#fff"
                >
                  <Text style={styles.backResendText}>Zpět</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {showAuth ? (
              <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
                <TextInput
                  style={{ ...styles.profileTextInput, width: 130 }}
                  onChangeText={text => onChangeAuthCode(text)}
                  value={authCode}
                  placeholder=" . . . . . . "
                  placeholderTextColor="#969696"
                />

                <TouchableOpacity
                  style={styles.authButton}
                  onPress={confirmCode}
                  underlayColor="#fff"
                >
                  <Text style={styles.authText}>Ověřit kód</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.backResendButton, marginTop: 24 }}
                  onPress={() => navigation.navigate("Home")}
                  underlayColor="#fff"
                >
                  <Text style={styles.backResendText}>Poslat znovu</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </SafeAreaView>
        </ScrollView>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

export default Login;
