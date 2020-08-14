import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { firebase } from "../../firebase/config";

import SplashImage from "../../component/DisplaySplashImage";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: window.height,
    width: window.width,
    backgroundColor: "#E9E6DD"
  },
  spaceText: {
    // height: 100
    flex: 0.5
  },
  titleText: {
    // fontFamily: "sans-serif-medium",
    fontSize: 36,
    color: "black",
    textAlign: "center",
    writingDirection: "ltr",
    textShadowOffset: { height: 3, width: 3 },
    textShadowRadius: 2
  },
  plainText: {
    alignSelf: "stretch",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    textAlignVertical: "center",
    height: 60,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  startScreenButton: {
    width: 200,
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
  startText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  btnView: {
    alignItems: "center"
  }
});

const Splash = ({ navigation }) => {
  const [authUser, setAuthUser] = useState(null);

  const Login = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        setAuthUser(user);
        console.log("XTTT ", user);
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.spaceText}></Text>
      <Text style={styles.titleText}>KDO</Text>
      <Text style={styles.titleText}>PŘIJDE</Text>
      <SplashImage />
      <Text style={styles.plainText}>Kdo jde dnes na trening?</Text>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.startScreenButton}
          onPress={Login}
          underlayColor="#fff"
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Splash;
