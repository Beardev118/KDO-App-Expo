import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { IconButton, Colors } from "react-native-paper";
import { firebase } from "../../../firebase/config";

const styles = StyleSheet.create({
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32
  }
});

const useImagePicker = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myData, setMyData] = useState(null);

  const _isMounted = useRef(null);

  useEffect(() => {
    (async () => {
      const ac = new AbortController();
      let didUnsubscribe = false;

      _isMounted.current = false;

      if (_isMounted.current) return;

      (async () => {
        if (Constants.platform.ios) {
          const {
            status
          } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }

        firebase.auth().onAuthStateChanged(async user => {
          if (user != null) {
            setMyData(user);
            await firebase
              .storage()
              .ref()
              .child("profile_images")
              .child(user.uid)
              .getDownloadURL()
              .then(url => {
                setIsLoading(false);
                setImage(url);
              })
              .catch(error => {
                setIsLoading(false);
              });
          }
        });
      })();
      return () => {
        ac.abort();
        _isMounted.current = true;
      }; // Abort both fetches on unmount
    })();
  }, []);

  return { image, setImage, isLoading, setIsLoading, myData, setMyData };
};

export default function UserImagePicker() {
  const {
    image,
    setImage,
    isLoading,
    setIsLoading,
    myData,
    setMyData
  } = useImagePicker();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child("profile_images")
        .child(myData.uid);
      setIsLoading(true);
      ref.put(blob).then(uploadResult => {
        setIsLoading(false);
        setImage(result.uri);
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <View style={styles.userImage}>
          <ImageBackground style={styles.userImage}>
            <ActivityIndicator size="large" color="#000" />
          </ImageBackground>
        </View>
      ) : (
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
      )}
    </View>
  );
}
