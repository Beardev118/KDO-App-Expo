import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Slider,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { MemberContext } from "../../globalState/MemberState";

function Member(props) {
  const [modalMemberStatus, setModalMemberStatus] = useContext(MemberContext);

  const [valueMessage, onChangeMessage] = useState("");

  useEffect(() => {
    onChangeMessage(props.msg);
  }, [modalMemberStatus]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalMemberStatus}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          // style={{ backgroundColor: "#E9E6DD" }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.centeredView}
          scrollEnabled={false}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                {props.imageUrl !== "" ? (
                  <Image
                    source={{ uri: props.imageUrl }}
                    style={styles.imageUserAvatar}
                  />
                ) : (
                  <Image
                    style={styles.imageUserAvatar}
                    source={require("../../../assets/useravatar.png")}
                  />
                )}
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 16,
                    marginTop: 16,
                    justifyContent: "space-around"
                  }}
                >
                  <Text style={styles.textUserName}>{props.name}</Text>
                  <Text style={styles.textPhoneNumber}>
                    {props.phoneNumber}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  Alert.alert("SMS send");
                }}
              >
                <Text style={styles.btnSendText}>Poslat zprávu</Text>
              </TouchableOpacity>

              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInputMessage}
                onChangeText={text => onChangeMessage(text)}
                value={valueMessage}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignSelf: "stretch",
                  paddingVertical: 16,
                  backgroundColor: "white"
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <TouchableOpacity
                    onPress={() => setModalMemberStatus(!modalMemberStatus)}
                  >
                    <Text style={styles.textStyle}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
    // backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    alignSelf: "stretch",
    backgroundColor: "#E9E6DD",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "#27842A",
    textAlign: "center"
  },
  textUserName: {
    fontSize: 22,
    color: "#000",
    textAlign: "left",
    paddingHorizontal: 12
  },
  textPhoneNumber: {
    fontSize: 24,
    color: "#6B6B6B",
    paddingHorizontal: 12
  },
  textInputMessage: {
    padding: 4,
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 8,
    height: 125,
    backgroundColor: "white",
    fontSize: 18,
    textAlignVertical: "top"
  },
  imageUserAvatar: {
    width: 80,
    height: 80,
    marginTop: 16,
    marginLeft: 16,
    borderRadius: 40
  },
  btnSendText: {
    fontSize: 12,
    color: "#000",
    backgroundColor: "#CECECE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  sendButton: {
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }
});

export default Member;
