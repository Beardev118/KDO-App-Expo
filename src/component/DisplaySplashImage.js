import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const DisplaySplashImage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/badminton.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center"
  },
  image: {
    // justifyContent: 'space-around',
    // alignItems: 'center',
    resizeMode: "center",
    width: 155,
    height: 185,
    margin: 30
  }
});

export default DisplaySplashImage;
