import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { IconButton, Colors } from "react-native-paper";
const styles = StyleSheet.create({
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    // borderWidth: 1,
    // borderColor: "#6B6B6B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32
  }
});

export default function UserImagePicker() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        // style={styles.userImage}
        onPress={pickImage}
        underlayColor="#fff"
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.userImage} />
        ) : (
          <IconButton
            icon="camera"
            color={Colors.gray}
            size={50}
            style={styles.userImage}
            // onPress={this.showMenu}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}