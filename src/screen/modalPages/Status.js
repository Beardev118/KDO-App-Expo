import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Slider
} from "react-native";

import { GlobalContext } from "../../globalState/GlobalState";

function Status() {
  const [modalStatus, setModalStatus] = useContext(GlobalContext);
  const [valueMessage, onChangeMessage] = useState("Možná");
  const [sliderValue, setSliderValue] = useState(50);
  const [sliderValueText, setSliderValueText] = useState("50%");

  const setSlider = value => {
    setSliderValue(value);
    setSliderValueText(value.toString() + "%");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalStatus}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textPercent}>Na kolik procent?</Text>
          <Text style={styles.valuePercent}>{sliderValueText}</Text>

          <Slider
            maximumValue={100}
            minimumValue={0}
            minimumTrackTintColor="#27842A"
            maximumTrackTintColor="#27884B"
            thumbTintColor="#27842A"
            step={1}
            value={sliderValue}
            onValueChange={sliderValue => setSlider(sliderValue)}
            style={{ width: 300, height: 40 }}
          />

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
            <View style={{ flex: 0.3, fontSize: 16 }}>
              <TouchableHighlight
                // style={{ ...styles.openButton  }}
                onPress={() => {
                  setModalStatus(!modalStatus);
                }}
              >
                <Text style={styles.textStyle}>Zrušit</Text>
              </TouchableHighlight>
            </View>

            <View style={{ flex: 0.2 }}>
              <TouchableHighlight
                // style={{ ...styles.openButton, flex: 0.2 }}
                onPress={() => {
                  setModalStatus(!modalStatus);
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
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
  textPercent: {
    fontSize: 18,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 16
  },
  valuePercent: {
    fontSize: 24,
    color: "#27842A"
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
  }
});

export default Status;
