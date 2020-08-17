import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";

import { firebase } from "../../firebase/config";
import UserImagePicker from "./profile/UserImagePicker";

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
  btnText: {
    fontSize: 14,
    textAlignVertical: "center"
  }
});

function Profile({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("Telefon");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        setAuthUser(user);
        firebase
          .firestore()
          .collection("profiles")
          .doc(user["uid"])
          .get()
          .then(result => {
            const userData = result.data();
            if (userData.userName != "") {
              setUserName(userData.username);
            }
            setPhoneNumber(user["phoneNumber"]);
            setIsLoading(false);
          });
      }
    });
    return () => ac.abort(); // Abort both fetches on unmount
  }, []);

  const onSaveProfile = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        let currentTime = Math.trunc(
          firebase.firestore.Timestamp.now().toMillis() / 1000
        );
        firebase
          .firestore()
          .collection("profiles")
          .doc(user["uid"])
          .update({
            hasPhoto: true,
            username: userName
          })
          .then(cResult => {
            firebase
              .database()
              .ref("ts/" + user["uid"])
              .update({
                p: currentTime
              })
              .catch(realtimeError => {
                console.log("Login Realtime Error: ", realtimeError);
              });
          })
          .catch(error => {
            console.log("Login Error: ", error);
          });
      }
    });
    navigation.goBack();
  };

  const onBackPP = () => {
    const userValue = AsyncStorage.getItem("@userData")
      .then(getResult => {
        console.log("pprop", JSON.parse(getResult));
        navigation.goBack();
        // navigation.navigate("Home");
      })
      .catch(getError => {
        console.log("getDataError", getError);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        // style={{ backgroundColor: "#E9E6DD" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        {isLoading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.container}>
              <UserImagePicker
                style={{ width: 180, height: 180, backgroundColor: "blue" }}
              />

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
                    onChangeText={text => setUserName(text)}
                    value={userName}
                    placeholder="Jméno"
                    placeholderTextColor="#969696"
                  />
                </View>
                <View
                  style={{
                    ...styles.textInputContainer,
                    marginTop: 32
                  }}
                >
                  <IconButton
                    icon="phone"
                    color={Colors.black}
                    size={32}
                    // onPress={this.showMenu}
                  />
                  <View
                    style={{
                      ...styles.profileTextInput,
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "#969696" }}>{phoneNumber}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 24,
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
                  onPress={() => navigation.goBack()}
                  underlayColor="#fff"
                >
                  <Text style={{ ...styles.btnText, color: "#969696" }}>
                    Zpět
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.profileScreenButton,
                    marginTop: 8,
                    backgroundColor: "#28742A"
                  }}
                  onPress={onSaveProfile}
                  underlayColor="#fff"
                >
                  <Text style={{ ...styles.btnText, color: "white" }}>
                    Uložit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Profile;
