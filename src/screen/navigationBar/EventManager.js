import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
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
  TouchableOpacity
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import EditTerm from "./EditTerm";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../firebase/config";

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
    alignItems: "center",
    height: 50
  },
  flContainer: {
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
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginVertical: 8,
    padding: 3,
    color: "#27842A",
    height: 38,
    marginStart: 8,
    textDecorationLine: "underline"
  },
  subEventName: {
    // flex: 0.25,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginStart: 8,
    color: "#6B6B6B",
    width: 67
  },
  subEventPeriod: {
    // flex: 0.25,
    // width: 81,
    marginStart: 5,
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    color: "#6B6B6B"
  },
  subEventDay: {
    // flex: 0.25,
    // width: 71,
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "right",
    textAlignVertical: "center",
    marginStart: 5
  },
  subEventTime: {
    // flex: 0.25,
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "right",
    textAlignVertical: "center",
    marginStart: 5
  },
  topBarContainer: {
    height: 42,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 4,
    marginHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  textGroupName: {
    flex: 0.7,
    fontSize: 20,
    padding: 4,
    color: "black"
  },
  textTermin: {
    flex: 0.3,
    fontSize: 18,
    padding: 4,
    color: "black"
  },
  btnFab: {
    marginTop: -18,
    marginStart: -18
  },
  btnText: {
    color: "#fff",
    fontSize: 60,
    // paddingBottom: 5,
    textAlign: "center",
    textAlignVertical: "center"
  },
  btnView: {
    width: 54,
    height: 54,
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 16,
    end: 16,
    borderRadius: 27,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  btnCreateEventView: {
    margin: 8
  },
  btnCreateEvent: {
    width: 130,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
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
  createEventText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

const TopBar = () => (
  <View style={styles.topBarContainer}>
    <Text style={styles.textGroupName}>Název skupiny</Text>
    <Text style={styles.textTermin}>Termíny</Text>
  </View>
);

const BottomBar = props => (
  <View style={styles.btnView}>
    <IconButton
      icon="plus-circle"
      color="#27842A"
      size={60}
      onPress={() => props.navigation.navigate("Subject")}
      style={styles.btnFab}
    />
  </View>
);

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ borderBottomColor: "#6B6B6B", borderBottomWidth: 1 }}
  >
    <View key={item.key} style={styles.subContainer}>
      <Text style={styles.subEventName}>{item.textEventName}</Text>
      <Text style={styles.subEventPeriod}>tydne</Text>
      <Text style={styles.subEventDay}>{item.textEventDay}</Text>
      <Text style={styles.subEventTime}>{item.textEventTime}</Text>
    </View>
  </TouchableOpacity>
);

const onChangeEveNote = value => {
  const dayNote = [
    "",
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
    "Sobota",
    "Neděle"
  ];
  return dayNote[value];
};

const onChangeEveStr = value => {
  let strTemp = value;
  if (Number(strTemp) < 10) {
    strTemp = "0" + strTemp;
  }
  return strTemp;
};

function EventManager({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [members, setMembers] = useState([
    {
      avatarId: "test 01",
      key: "1",
      textEventName: "test 01",
      textEventDay: "Pondělí",
      textEventTime: "16:00"
    },
    {
      avatarId: "test 02",
      key: "2",
      textEventName: "test 02",
      textEventDay: "Pondělí",
      textEventTime: "16:00"
    },
    {
      avatarId: "test 03",
      key: "3",
      textEventName: "test 03",
      textEventDay: "Pondělí",
      textEventTime: "16:00"
    },
    {
      avatarId: "test 04",
      key: "4",
      textEventName: "test 04",
      textEventDay: "Pondělí",
      textEventTime: "16:00"
    },
    {
      avatarId: "test 05",
      key: "5",
      textEventName: "test 05",
      textEventDay: "Pondělí",
      textEventTime: "16:00"
    }
  ]);

  useEffect(() => {
    (async () => {
      const ac = new AbortController();
      let didUnsubscribe = false;
      if (didUnsubscribe) return;

      firebase.auth().onAuthStateChanged(async user => {
        if (user != null) {
          // profiles Data
          const fProfilesUri =
            FileSystem.documentDirectory + "KDODataProfiles.txt";
          const rawProfilesData = await FileSystem.readAsStringAsync(
            fProfilesUri
          );
          const profilesData = JSON.parse(rawProfilesData);

          // userGroups Data
          const fUserGroupsUri =
            FileSystem.documentDirectory + "KDODataUserGroups.txt";
          const rawUserGroupsData = await FileSystem.readAsStringAsync(
            fUserGroupsUri
          );
          const userGroupsData = JSON.parse(rawUserGroupsData);

          // setUserGData(userGroupsData);

          const ownerUserGroupData = [];

          const myProfileData = profilesData.find(
            item => item.key === user.uid
          );

          const myOwnerEventsData = myProfileData.value.ownerOf;

          if (myOwnerEventsData.length > 0) {
            myOwnerEventsData.forEach(item => {
              const userGroup = userGroupsData.find(
                ugItem => ugItem.key === item
              );
              console.log(userGroup);

              const userGroupEventsData = [];
              const userGroupEvents = userGroup.events;

              if (userGroupEvents !== undefined) {
                userGroupEvents.forEach(ugeItem => {
                  const eveDate = ugeItem.eveValue.started.split(",");

                  userGroupEventsData.push({
                    eventKey: ugeItem.key,
                    eventName: ugeItem.eveValue.name,
                    eventDay: onChangeEveNote(Number(eveDate[4])),
                    eventTime:
                      onChangeEveStr(eveDate[1]) +
                      ":" +
                      onChangeEveStr(eveDate[0]),
                    eventInfo: ugeItem.eveValue.info
                  });
                });
              }

              ownerUserGroupData.push({
                userGroupKey: item,
                userGroupName: userGroup.value.name,
                userGroupType: userGroup.value.type,
                userGroupEvents: userGroupEventsData
              });
            });
          }

          console.log(ownerUserGroupData);

          // const eventsActiveCalendar = [];
          // const eventsInactiveCalendar = [];

          // const myUserGroups = myProfileData.memberOf;
          // myUserGroups.forEach(item => {
          //   const iUserGroup = userGroupsData.find(
          //     ugItem => ugItem.key === item.key
          //   );
          //   const ugTitle = iUserGroup.value.name;

          //   const eventMembers = [];
          //   const ugMembers = iUserGroup.members;
          //   ugMembers.forEach(ugmItem => {
          //     eventMembers.push({
          //       memKey: ugmItem.key,
          //       memActive: ugmItem.active.active
          //     });
          //   });

          //   const ugEvents = iUserGroup.events;
          //   ugEvents.forEach(ugeItem => {
          //     const eveTitle = ugeItem.eveValue.name;

          //     const eveStartDate = ugeItem.eveValue.started.split(",");
          //     const eveTime =
          //       onChangeEveStr(eveStartDate[1]) +
          //       ":" +
          //       onChangeEveStr(eveStartDate[0]);

          //     const curDay = new Date().getDay();
          //     let eveDay = Number(eveStartDate[4]) - curDay;
          //     if (eveDay < 0) eveDay += 7;
          //     if (eveDay == 0) {
          //       const curHour = new Date().getHours();
          //       const curMinute = new Date().getMinutes();
          //       if (
          //         curHour > Number(eveStartDate[1]) ||
          //         (curHour == Number(eveStartDate[1]) &&
          //           curMinute >= Number(eveStartDate[0]))
          //       )
          //         eveDay = 7;
          //     }

          //     const eveBadge = onChangeEveBadge(eveDay);
          //     const eveNote = onChangeEveNote(Number(eveStartDate[4]));

          //     const eDate = new Date().getDate();
          //     const eMonth = new Date().getMonth() + 1;

          //     const eveDate = onChangeEveDate(eDate, eMonth, eveDay);

          //     const myNotify = ugeItem.notify.find(
          //       eveNotiItem => eveNotiItem.key === user.uid
          //     );

          //     if (myNotify !== undefined) {
          //       const isActive = myNotify.notifyValue.active;

          //       if (isActive == true) {
          //         eventsActiveCalendar.push({
          //           eventName: ugTitle + " " + eveTitle,
          //           key: ugeItem.key,
          //           eventDate: eveDate + " " + eveTime,
          //           eventNote: eveNote,
          //           eventCnt: 0,
          //           eventBadge: eveBadge,
          //           eventStatus: isActive,
          //           eventDay: eveDay,
          //           eventMembers: eventMembers
          //         });
          //       }
          //       eventsInactiveCalendar.push({
          //         eventName: ugTitle + " " + eveTitle,
          //         key: ugeItem.key,
          //         eventDate: eveDate + " " + eveTime,
          //         eventNote: eveNote,
          //         eventCnt: 0,
          //         eventBadge: eveBadge,
          //         eventStatus: isActive,
          //         eventDay: eveDay,
          //         eventMembers: eventMembers
          //       });
          //     }
          //   });
          // });

          // eventsActiveCalendar.sort((a, b) =>
          //   a.eventDay < b.eventDay ? -1 : 1
          // );
          // eventsInactiveCalendar.sort((a, b) =>
          //   a.eventDay < b.eventDay ? -1 : 1
          // );

          // setActiveClasses(eventsActiveCalendar);
          // setInactiveClasses(eventsInactiveCalendar);
          // setEveCnt(prev => !prev);
        }
      });
      return () => {
        ac.abort();
        didUnsubscribe = true;
      };
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderBottomColor: "#6B6B6B",
          borderBottomWidth: 1,
          backgroundColor: "#E9E6DD"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("EditUserGroup")}
          >
            <Text style={styles.eventName}>{item.textEventName}</Text>
          </TouchableOpacity>
          <View style={styles.btnCreateEventView}>
            <TouchableOpacity
              style={styles.btnCreateEvent}
              onPress={() => navigation.navigate("NewTerm")}
              underlayColor="#fff"
            >
              <Text style={styles.createEventText}>Přidat termín</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#FFF",
            paddingTop: 8,
            paddingBottom: 3,
            paddingStart: 70,
            paddingEnd: 8,
            marginHorizontal: 8,
            marginVertical: 4
          }}
        >
          <Item
            item={item}
            onPress={() => navigation.navigate("EditTerm")}
            style={styles.item}
          />
        </View>
      </View>
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
      <BottomBar navigation={navigation} />
    </SafeAreaView>
  );
}

export default EventManager;
