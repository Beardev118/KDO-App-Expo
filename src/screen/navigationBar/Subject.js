import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Switch,
  Alert,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  periodContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 10
  },
  dayContainer: {
    flex: 0.32,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 10
  },
  timeContainer: {
    flex: 0.22,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 10
  },
  reminderContainer: {
    flex: 0.26,
    marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  btnView: {
    marginTop: 40,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    elevation: 0
  },
  btnUserGroup: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 56,
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
  subjectType: {
    height: 40,
    paddingVertical: 2,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  subjectInfo: {
    width: "100%",
    height: 80,
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
  valueText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16
  }
});

function Subject() {
  const [valueSubjectName, onChangeSubjectName] = useState("");
  const [valueSubjectInfo, onChangeSubjectInfo] = useState("");
  const [country, setCountry] = useState("Akce");
  const [weekday, setWeekDay] = useState("Mon");
  const [hours, setHours] = useState("1");

  return (
    <View style={styles.container}>
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
      <View style={{ ...styles.subContainer, zIndex: 0, elevation: 0 }}>
        <View style={styles.infoContainer}>
          <Text style={styles.subLabel}>Informace</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.subjectInfo}
            onChangeText={text => onChangeSubjectInfo(text)}
            value={valueSubjectInfo}
          />
        </View>
      </View>
      <View style={{ ...styles.subContainer, zIndex: 5, elevation: 5 }}>
        <View style={styles.periodContainer}>
          <Text style={styles.subLabel}>Perioda</Text>
          <TouchableOpacity style={styles.subjectType} underlayColor="#fff">
            <Text style={styles.valueText}>Týden</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.subLabel}>Den</Text>
          <DropDownPicker
            items={[
              { label: "Pondělí", value: "Mon" },
              { label: "Úterý", value: "Tue" },
              { label: "Středa", value: "Wed" },
              { label: "Čtvrtek", value: "Thu" },
              { label: "Pátek", value: "Fri" },
              { label: "Sobota", value: "Sat" },
              { label: "Neděle", value: "Sun" }
            ]}
            defaultValue={weekday}
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
            onChangeItem={item => setWeekDay(item.value)}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.subLabel}>Čas</Text>
          <TouchableOpacity
            style={styles.subjectType}
            onPress={() => Alert.alert("Simple Button pressed")}
            underlayColor="#fff"
          >
            <Text style={styles.valueText}>Akce</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reminderContainer}>
          <Text style={styles.subLabel}>Připom.</Text>
          <DropDownPicker
            items={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
              { label: "7", value: "7" },
              { label: "8", value: "8" },
              { label: "9", value: "9" },
              { label: "10", value: "10" },
              { label: "11", value: "11" },
              { label: "12", value: "12" },
              { label: "13", value: "13" },
              { label: "14", value: "14" },
              { label: "15", value: "15" },
              { label: "16", value: "16" },
              { label: "17", value: "17" },
              { label: "18", value: "18" },
              { label: "19", value: "19" },
              { label: "20", value: "20" },
              { label: "21", value: "21" },
              { label: "22", value: "22" },
              { label: "23", value: "23" },
              { label: "24", value: "24" },
              { label: "25", value: "25" },
              { label: "26", value: "26" },
              { label: "27", value: "27" },
              { label: "28", value: "28" },
              { label: "29", value: "29" },
              { label: "30", value: "30" },
              { label: "31", value: "31" },
              { label: "32", value: "32" },
              { label: "33", value: "33" },
              { label: "34", value: "34" },
              { label: "35", value: "35" },
              { label: "36", value: "36" },
              { label: "37", value: "37" },
              { label: "38", value: "38" },
              { label: "39", value: "39" },
              { label: "40", value: "40" }
            ]}
            defaultValue={hours}
            containerStyle={{ width: "100%", height: 40 }}
            style={{ width: "100%", backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start"
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={item => setHours(item.value)}
          />
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnUserGroup}
          onPress={() => Alert.alert("AAAA")}
          underlayColor="#fff"
        >
          <Text style={styles.btnText}>ZALOžIT NOVOU SKUPINU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Subject;
