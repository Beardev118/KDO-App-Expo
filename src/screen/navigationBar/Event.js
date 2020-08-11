import "react-native-gesture-handler";
import React, { useState, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Switch,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";

import Status from "../modalPages/Status";
import Member from "../modalPages/Member";
import { GlobalContext } from "../../globalState/GlobalState";
import { MemberContext } from "../../globalState/MemberState";

const styles = StyleSheet.create({
  headerRightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  flContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#FFF"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#6B6B6B",
    textAlign: "right",
    textAlignVertical: "center",
    padding: 10
  },
  topBarContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 102,
    marginEnd: 1,
    marginBottom: 1
  },
  topBarSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginStart: 8,
    marginTop: 8,
    marginEnd: 8
  },
  eventName: {
    height: 33,
    fontSize: 20,
    fontWeight: "bold",
    padding: 4,
    color: "#6B6B6B"
  },
  switchActive: {
    marginEnd: 0
  },
  eventTime: {
    height: 28,
    marginStart: 8,
    padding: 4,
    color: "#6B6B6B"
  },
  eventMembers: {
    height: 25,
    paddingStart: 4,
    fontSize: 14,
    color: "#6B6B6B"
  },
  eventAttend: {
    fontSize: 14,
    color: "#6B6B6B"
  },
  bottomBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    marginStart: 8,
    marginBottom: 8,
    marginEnd: 8,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "#E9E6DD",
    borderRadius: 8
  },
  btnYes: {
    width: 88,
    marginEnd: 8,
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
  btnNo: {
    marginStart: 8,
    width: 88,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#E65100",
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
  btnStatus: {
    width: 83,
    padding: 4,
    backgroundColor: "#CECECE",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  statusText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  btnText: {
    color: "#fff",
    fontFamily: "sans-serif-medium",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  willYouComeText: {
    textAlign: "center",
    color: "#6B6B6B",
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 8,
    marginEnd: 8
  },
  btnView: {
    alignItems: "center"
  }
});

const TopBar = () => (
  <View style={{ backgroundColor: "#E9E6DD" }}>
    <View style={{ height: 8 }} />
    <View style={styles.topBarContainer}>
      <View style={styles.topBarSubView}>
        <Text style={styles.eventName}>BADMINTON</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.switchActive}>neaktivní</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={{ false: "#f5dd4b", true: "#f4f3f4" }}
            ios_backgroundColor="#3e3e3e"
            //   onValueChange={toggleSwitch}
            value={"false"}
          />
        </View>
      </View>
      <Text style={styles.eventTime}>KTTT</Text>
      <View style={styles.topBarSubView}>
        <Text style={styles.eventMembers}>Kdo přijde:</Text>
        <Text style={styles.eventAttend}>uar 3</Text>
      </View>
    </View>
  </View>
);

const BottomBar = () => {
  const [modalStatus, setModalStatus] = useContext(GlobalContext);

  return (
    <View style={styles.bottomBarContainer}>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnNo}
          onPress={() => Alert.alert("No")}
          underlayColor="#fff"
        >
          <Text style={styles.btnText}>NE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <Text style={styles.willYouComeText}>Přijdeš?</Text>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btnStatus}
            onPress={() => setModalStatus(true)}
            underlayColor="#fff"
          >
            <Text style={styles.statusText}>STATUS</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnYes}
          onPress={() => Alert.alert("Yes")}
          underlayColor="#fff"
        >
          <Text style={styles.btnText}>ANO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ borderBottomColor: "#6B6B6B", borderBottomWidth: 1 }}
  >
    <View key={item.key} style={styles.item}>
      <View style={styles.subContainer}>
        <Image
          style={styles.memberAvartar}
          source={require("../../../assets/badminton.png")}
        />
        <Text style={styles.memberName}>{item.textUserName}</Text>
        <Text style={styles.memberMsg}>{item.textMsg}</Text>
      </View>
      <View>
        <Text style={styles.memberNote}>{item.textNote}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function Event({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [modalMemberStatus, setModalMemberStatus] = useContext(MemberContext);
  const [members, setMembers] = useState([
    {
      avatarId: "test 01",
      key: "1",
      textUserName: "test 01",
      textMsg: "AAA",
      textNote: "100%"
    },
    {
      avatarId: "test 02",
      key: "2",
      textUserName: "test 02",
      textMsg: "AAA",
      textNote: "30%"
    },
    {
      avatarId: "test 03",
      key: "3",
      textUserName: "test 03",
      textMsg: "AAA",
      textNote: "100%"
    },
    {
      avatarId: "test 04",
      key: "4",
      textUserName: "test 04",
      textMsg: "AAAFADFASF",
      textNote: "70%"
    },
    {
      avatarId: "test 05",
      key: "5",
      textUserName: "test 05",
      textMsg: "AAA",
      textNote: "50%"
    }
  ]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setModalMemberStatus(true)}
        style={styles.item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        extraData={selectedId}
        style={styles.flContainer}
      />
      <BottomBar />
      <Status />
      <Member />
    </SafeAreaView>
  );
}

export default Event;
