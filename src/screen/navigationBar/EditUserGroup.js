import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import CheckBox from "react-native-check-box";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  textInputContainer: {
    flex: 0.65,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  typeContainer: {
    flex: 0.35,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  btnView: {
    flexDirection: "row",
    marginVertical: 16,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 0,
    elevation: 0
  },
  btnUserGroup: {
    // width: 132,
    height: 44,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27842A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  btnText: {
    // fontFamily: "sans-serif-medium",
    fontSize: 14,
    fontWeight: "bold",
    color: "white"
  },
  subjectInfo: {
    width: "100%",
    padding: 2,
    fontSize: 16,
    backgroundColor: "white",
    zIndex: 0,
    elevation: 0
  },
  subLabel: {
    fontSize: 16,
    padding: 2,
    color: "#6B6B6B"
  },
  flContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    alignSelf: "stretch",
    height: "100%"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#6B6B6B",
    borderBottomWidth: 1
  },
  subContainerItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  memberAvartar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CECECE"
  },
  memberName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginVertical: 8,
    padding: 3,
    color: "#6B6B6B"
  },
  memberMsg: {
    height: 24,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    padding: 2,
    color: "#6B6B6B"
  },
  memberNote: {
    width: 70,
    height: 44,
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B6B6B",
    textAlign: "right",
    textAlignVertical: "center",
    padding: 10
  }
});

function EditUserGroup() {
  const [valueSubjectName, onChangeSubjectName] = useState("");
  const [country, setCountry] = useState("Akce");
  const [selectedId, setSelectedId] = useState(false);

  const handleClickCheck = key => {
    let currentMember = members;
    // objIndex = currentMember.findIndex(item => item.key === key);
    currentMember[key - 1].checkFlag = !currentMember[key - 1].checkFlag;
    setSelectedId(!selectedId);
    setMembers(currentMember);
  };
  const [members, setMembers] = useState([
    {
      avatarId: "test 01",
      key: "1",
      textUserName: "test 01",
      textMsg: "AAA",
      textNote: "100%",
      checkFlag: false
    },
    {
      avatarId: "test 02",
      key: "2",
      textUserName: "test 02",
      textMsg: "AAA",
      textNote: "30%",
      checkFlag: false
    },
    {
      avatarId: "test 03",
      key: "3",
      textUserName: "test 03",
      textMsg: "AAA",
      textNote: "100%",
      checkFlag: false
    },
    {
      avatarId: "test 04",
      key: "4",
      textUserName: "test 04",
      textMsg: "AAAFADFASF",
      textNote: "70%",
      checkFlag: false
    },
    {
      avatarId: "test 05",
      key: "5",
      textUserName: "test 05",
      textMsg: "AAA",
      textNote: "50%",
      checkFlag: false
    }
  ]);

  const renderItem = ({ item }) => {
    return (
      <View key={item.key} style={styles.item}>
        <View style={styles.subContainerItem}>
          <Image
            style={styles.memberAvartar}
            source={require("../../../assets/badminton.png")}
          />
          <Text style={styles.memberName}>{item.textUserName}</Text>
        </View>
        <CheckBox
          style={{
            width: 40,
            height: 40,
            padding: 8,
            margin: 8
          }}
          onClick={() => handleClickCheck(item.key)}
          isChecked={item.checkFlag}
          // leftText={"CheckBox"}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        // style={{ backgroundColor: "#E9E6DD" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        {/* <View style={styles.container}> */}
        <View style={{ ...styles.subContainer, zIndex: 5, elevation: 5 }}>
          <View style={styles.textInputContainer}>
            <Text style={styles.subLabel}>Název skupiny</Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "white"
              }}
              onChangeText={text => onChangeSubjectName(text)}
              value={valueSubjectName}
            />
          </View>
          <View style={styles.typeContainer}>
            <Text style={styles.subLabel}>Typ</Text>
            <DropDownPicker
              items={[
                { label: "Akce", value: "Akce" },
                { label: "Sportovní", value: "Sportovní" },
                { label: "Kulturní", value: "Kulturní" },
                { label: "Umělecká", value: "Umělecká" },
                { label: "Vzdělávací", value: "Vzdělávací" },
                { label: "Sociální", value: "Sociální" },
                { label: "Technická", value: "Technická" },
                { label: "Osobní", value: "Osobní" }
              ]}
              defaultValue={country}
              containerStyle={{
                width: "100%",
                height: 40,
                zIndex: 5,
                elevation: 5
              }}
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                zIndex: 5,
                elevation: 5
              }}
              itemStyle={{
                justifyContent: "flex-start"
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={item => setCountry(item.value)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            zIndex: 0,
            elevation: 0
          }}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.subLabel}>Pozvaní / Členové</Text>
            <FlatList
              data={members}
              renderItem={renderItem}
              keyExtractor={item => item.key}
              extraData={selectedId}
              style={styles.flContainer}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={{
              ...styles.btnUserGroup,
              marginStart: 8,
              backgroundColor: "#E65100"
            }}
            onPress={() => Alert.alert("DeleteMember")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Odebrat položku</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnUserGroup,
              marginEnd: 8
            }}
            onPress={() => Alert.alert("Add Member")}
            underlayColor="#fff"
          >
            <Text style={styles.btnText}>Pozvat nového člena</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default EditUserGroup;
