import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../firebase/config";
import { InactiveContext } from "../../globalState/InactiveState";

const styles = StyleSheet.create({
  headerRightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center"
  },
  container: {
    backgroundColor: "#E9E6DD"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  flContainer: {
    marginLeft: 5,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: "#FFF"
  },
  item: {
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5
  },
  eName: {
    flex: 0.6,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    paddingLeft: 4,
    paddingRight: 4
  },
  eBadge: {
    flex: 0.2,
    textAlign: "center",
    textAlignVertical: "center",
    color: "green",
    fontSize: 12
  },
  eNote: {
    flex: 0.2,
    fontSize: 12,
    textAlign: "right",
    textAlignVertical: "center",
    padding: 9,
    paddingEnd: 0,
    color: "#6B6B6B"
  },
  eDate: {
    flex: 0.7,
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    padding: 4,
    color: "#6B6B6B"
  },
  eCnt: {
    flex: 0.3,
    fontSize: 14,
    textAlign: "right",
    textAlignVertical: "center",
    color: "#6B6B6B",
    padding: 4
  }
});

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderBottomColor: "#969696",
      borderBottomWidth: 1,
      backgroundColor: item.eventStatus ? "#fff" : "#DEDEDE"
    }}
  >
    <View key={item.key} style={styles.item}>
      <View style={styles.subContainer}>
        <Text
          style={{
            ...styles.eName,
            color: item.eventStatus ? "#000" : "#969696"
          }}
        >
          {item.eventName}
        </Text>
        <Text style={styles.eBadge}>{item.eventBadge}</Text>
        <Text style={styles.eNote}>{item.eventNote}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.eDate}>{item.eventDate}</Text>
        <Text style={styles.eCnt}>Účast: {item.eventCnt}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const onChangeEveStr = value => {
  let strTemp = value;
  if (Number(strTemp) < 10) {
    strTemp = "0" + strTemp;
  }
  return strTemp;
};

const onChangeEveBadge = value => {
  switch (value) {
    case 0:
      return "dnes";
    case 1:
      return "zítra";
    default:
      return;
  }
  return;
};

const onChangeEveDate = (dateVal, monthVal, dayVal) => {
  const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let dateTemp = dateVal + dayVal;
  let monthTemp = monthVal;
  if (dateTemp > monthDay[monthTemp - 1]) {
    dateTemp -= monthDay[monthTemp - 1];
    monthTemp += 1;
    if (monthTemp > 12) monthTemp = 1;
  }
  return onChangeEveStr(dateTemp) + "." + onChangeEveStr(monthTemp) + ".";
};

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

const onChangeKeyDate = value => {
  const curYear = new Date().getFullYear() - 2000;
  const eveDate = value.split(".");
  const eveTime = eveDate[2].split(":");
  const eveHour = eveTime[0].split(" ");
  return String(curYear) + eveDate[1] + eveDate[0] + eveHour[1] + eveTime[1];
};

function Calendar({ route, navigation }) {
  const [loginFlag, setLoginFlag] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [activeClasses, setActiveClasses] = useState(() => {
    return [];
  });
  const [inactiveClasses, setInactiveClasses] = useState(() => {
    return [];
  });
  const [isInactiveFlag, setIsInactiveFlag] = useContext(InactiveContext);
  const [isLoading, setIsLoading] = useState(true);
  const [eveCnt, setEveCnt] = useState(false);
  const [userGData, setUserGData] = useState(null);

  const [isSelectedItem, setIsSelectedItem] = useState(null);

  // File Data reading...
  function initFileData() {
    if (route.params.loginFlag && loginFlag === false) {
      setLoginFlag(true);
      setActiveClasses([]);
      setInactiveClasses([]);
    }

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

        setUserGData(userGroupsData);

        const myProfileData = profilesData.find(item => item.key === user.uid);

        const eventsActiveCalendar = [];
        const eventsInactiveCalendar = [];

        const myUserGroups = myProfileData.memberOf;
        myUserGroups.forEach(item => {
          const iUserGroup = userGroupsData.find(
            ugItem => ugItem.key === item.key
          );
          const ugTitle = iUserGroup.value.name;

          const eventMembers = [];
          const ugMembers = iUserGroup.members;

          ugMembers.forEach(ugmItem => {
            eventMembers.push({
              memKey: ugmItem.key,
              memActive: ugmItem.active.active
            });
          });

          const ugEvents = iUserGroup.events;
          ugEvents.forEach(ugeItem => {
            const eveTitle = ugeItem.eveValue.name;
            const eveStartDate = ugeItem.eveValue.started.split(",");
            const eveTime =
              onChangeEveStr(eveStartDate[1]) +
              ":" +
              onChangeEveStr(eveStartDate[0]);

            const curDay = new Date().getDay();
            let eveDay = Number(eveStartDate[4]) - curDay;
            if (eveDay < 0) eveDay += 7;
            if (eveDay == 0) {
              const curHour = new Date().getHours();
              const curMinute = new Date().getMinutes();
              if (
                curHour > Number(eveStartDate[1]) ||
                (curHour == Number(eveStartDate[1]) &&
                  curMinute >= Number(eveStartDate[0]))
              )
                eveDay = 7;
            }

            const eveBadge = onChangeEveBadge(eveDay);
            const eveNote = onChangeEveNote(Number(eveStartDate[4]));

            const eDate = new Date().getDate();
            const eMonth = new Date().getMonth() + 1;

            const eveDate = onChangeEveDate(eDate, eMonth, eveDay);

            const myNotify = ugeItem.notify.find(
              eveNotiItem => eveNotiItem.key === user.uid
            );

            if (myNotify !== undefined) {
              const isActive = myNotify.notifyValue.active;
              let eveAskBefore = 1;
              if (myNotify.notifyValue.askBefore !== undefined)
                eveAskBefore = myNotify.notifyValue.askBefore / 60;

              if (isActive == true) {
                eventsActiveCalendar.push({
                  eventName: ugTitle + " " + eveTitle,
                  key: ugeItem.key,
                  userGroupId: item.key,
                  eventDate: eveDate + " " + eveTime,
                  eventNote: eveNote,
                  eventCnt: 0,
                  eventBadge: eveBadge,
                  eventStatus: isActive,
                  eventDay: eveDay,
                  eventMembers: eventMembers,
                  eventAskBefore: eveAskBefore
                });
              }
              eventsInactiveCalendar.push({
                eventName: ugTitle + " " + eveTitle,
                key: ugeItem.key,
                userGroupId: item.key,
                eventDate: eveDate + " " + eveTime,
                eventNote: eveNote,
                eventCnt: 0,
                eventBadge: eveBadge,
                eventStatus: isActive,
                eventDay: eveDay,
                eventMembers: eventMembers,
                eventAskBefore: eveAskBefore
              });
            }
          });
        });

        eventsActiveCalendar.sort((a, b) => (a.eventDay < b.eventDay ? -1 : 1));
        eventsInactiveCalendar.sort((a, b) =>
          a.eventDay < b.eventDay ? -1 : 1
        );

        setActiveClasses(eventsActiveCalendar);
        setInactiveClasses(eventsInactiveCalendar);
        setEveCnt(prev => !prev);
        setIsLoading(false);
      }
    });
  }
  // useEffect(() => {
  //   (async () => {
  //     const ac = new AbortController();
  //     let didUnsubscribe = false;
  //     if (didUnsubscribe) return;

  //     return () => {
  //       ac.abort();
  //       didUnsubscribe = true;
  //     };
  //   })();
  // }, []);

  //snapshot firestore profiles DBListener

  useEffect(() => {
    firebase
      .firestore()
      .collection("profiles")
      .onSnapshot(querySnapshot => {
        // console.log("Total users(profiles): ", querySnapshot.size);
        // querySnapshot.forEach(documentSnapshot => {
        //   console.log(
        //     "User ID: ",
        //     documentSnapshot.id,
        //     documentSnapshot.data()
        //   );
        // });
      });
  }, []);

  //snapshot firestore userGroups DBListener

  useEffect(() => {
    if (isSelectedItem !== null) {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          firebase
            .firestore()
            .collection("userGroups")
            .doc(isSelectedItem.userGroupId)
            .collection("events")
            .doc(isSelectedItem.key)
            .collection("notify")
            .doc(user.uid)
            .onSnapshot(async querySnapshot => {
              if (querySnapshot.data() !== undefined) {
                const queryData = querySnapshot.data();
                if (isSelectedItem !== null) {
                  console.log(isSelectedItem);
                  console.log(queryData);
                  if (
                    queryData.active !== isSelectedItem.eventStatus ||
                    queryData.askBefore !== isSelectedItem.eventAskBefore * 60
                  ) {
                    console.log(queryData.active);
                    console.log(queryData.askBefore);

                    //Calendar Table data

                    const inactiveData = [];
                    const activeData = [];

                    inactiveClasses.forEach(item => {
                      if (
                        item.userGroupId === isSelectedItem.userGroupId &&
                        item.key === isSelectedItem.key
                      ) {
                        const itemTemp = {
                          eventName: item.eventName,
                          key: item.key,
                          userGroupId: item.userGroupId,
                          eventDate: item.eventDate,
                          eventNote: item.eventNote,
                          eventCnt: item.eventCnt,
                          eventBadge: item.eventBadge,
                          eventStatus: queryData.active,
                          eventDay: item.eventDay,
                          eventMembers: item.eventMembers,
                          eventAskBefore: queryData.askBefore / 60
                        };
                        inactiveData.push(itemTemp);

                        if (queryData.active) activeData.push(itemTemp);
                      } else {
                        inactiveData.push(item);
                        if (item.eventStatus) activeData.push(item);
                      }
                    });

                    // "KDODataUserGroups.txt" rewriting...
                    const fUserGroupsUri =
                      FileSystem.documentDirectory + "KDODataUserGroups.txt";
                    const options = FileSystem.EncodingType.UTF8;

                    const rawUGDatas = await FileSystem.readAsStringAsync(
                      fUserGroupsUri
                    );
                    const userGDatas = JSON.parse(rawUGDatas);

                    const userGDatasTemp = [];

                    userGDatas.forEach(item => {
                      if (item.key === isSelectedItem.userGroupId) {
                        const eventsTemp = [];
                        item.events.forEach(eItem => {
                          if (eItem.key === isSelectedItem.key) {
                            const notifyTemp = [];
                            eItem.notify.forEach(nItem => {
                              if (nItem.key === user.uid) {
                                notifyTemp.push({
                                  key: nItem.key,
                                  notifyValue: {
                                    active: queryData.active,
                                    askBefore: queryData.askBefore,
                                    last: nItem.notifyValue.last,
                                    pushToken: nItem.notifyValue.pushToken,
                                    sent: nItem.notifyValue.sent
                                  }
                                });
                              } else {
                                notifyTemp.push(nItem);
                              }
                            });

                            eventsTemp.push({
                              key: eItem.key,
                              eveValue: eItem.eveValue,
                              notify: notifyTemp
                            });
                          } else {
                            eventsTemp.push(eItem);
                          }
                        });
                        userGDatasTemp.push({
                          key: item.key,
                          value: item.value,
                          members: item.members,
                          events: eventsTemp
                        });
                      } else {
                        userGDatasTemp.push(item);
                      }
                    });

                    FileSystem.writeAsStringAsync(
                      fUserGroupsUri,
                      JSON.stringify(userGDatasTemp)
                    )
                      .then(setUserGroupsResult => {
                        // setIsLoading(false);
                        console.log("SXXXX::::", userGDatasTemp);
                        setInactiveClasses(inactiveData);
                        setActiveClasses(activeData);
                        setSelectedId(prev => !prev);
                        // console.log("userGroupsContents: ", userGroupsContents);
                      })
                      .catch(setUserGroupsError => {
                        console.log("setUserGroupsError: ", setUserGroupsError);
                      });
                  }
                }
              }
            });
        }
      });
    }
  }, [isSelectedItem]);

  //snapshot realtime DB listener
  useEffect(() => {
    (async () => {
      const ac = new AbortController();
      let didUnsubscribe = false;
      if (didUnsubscribe) return;
      //Firebase Realtime DB snapshot
      firebase
        .database()
        .ref("/responses")
        .on("value", snapshot => {
          // console.log('User data: ', snapshot.val());
          const resData = snapshot.val();
          const inactiveTempData = [];
          const activeTempData = [];

          inactiveClasses.forEach(item => {
            const eveTempData = resData[item.key];
            const eveDateKey = onChangeKeyDate(item.eventDate);

            let itemFlag = false;

            if (eveTempData !== undefined && eveDateKey !== undefined) {
              const eveMemData = eveTempData[eveDateKey];
              if (eveMemData !== undefined) {
                let cnt = 0;
                const eveMembers = item.eventMembers;

                if (eveMembers !== undefined) {
                  eveMembers.forEach(emItem => {
                    const eveMData = eveMemData[emItem.memKey];
                    if (eveMData !== undefined) {
                      if (eveMData.p >= 80) cnt += 1;
                    }
                  });
                }

                const itemTemp = {
                  eventName: item.eventName,
                  key: item.key,
                  userGroupId: item.userGroupId,
                  eventDate: item.eventDate,
                  eventNote: item.eventNote,
                  eventCnt: cnt,
                  eventBadge: item.eventBadge,
                  eventStatus: item.eventStatus,
                  eventDay: item.eventDay,
                  eventMembers: item.eventMembers,
                  eventAskBefore: item.eventAskBefore
                };

                inactiveTempData.push(itemTemp);

                if (item.eventStatus) {
                  activeTempData.push(itemTemp);
                }

                itemFlag = true;
              }
            }

            if (!itemFlag) {
              inactiveTempData.push(item);
              if (item.eventStatus) {
                activeTempData.push(item);
              }
            }
          });

          setActiveClasses(activeTempData);
          setInactiveClasses(inactiveTempData);
          setIsLoading(false);
          setSelectedId(prev => !prev);
        });
      return () => {
        ac.abort();
        didUnsubscribe = true;
      };
    })();
  }, [eveCnt]);

  //Firestore Data reading

  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          setIsLoading(true);
          console.log("Start reading from DB:");
          readProfiles();
        } else {
          setIsLoading(false);
        }
      });
    })();
  }, []);

  function readProfiles() {
    const fProfilesUri = FileSystem.documentDirectory + "KDODataProfiles.txt";
    const options = FileSystem.EncodingType.UTF8;

    let profilesContents = [];

    firebase
      .firestore()
      .collection("profiles")
      .get()
      .then(getProfilesResult => {
        let cnt = getProfilesResult.size;
        getProfilesResult.forEach(async doc => {
          let memberOf = [];

          await firebase
            .firestore()
            .collection("profiles")
            .doc(doc.id)
            .collection("memberOf")
            .get()
            .then(getMemberDoc => {
              let nCnt = getMemberDoc.size;
              getMemberDoc.forEach(mDoc => {
                memberOf.push({
                  key: mDoc.id,
                  owner: mDoc.data()
                });
                nCnt -= 1;
              });
              if (nCnt == 0) {
                profilesContents.push({
                  key: doc.id,
                  value: doc.data(),
                  memberOf: memberOf
                });
                cnt -= 1;
              }
            })
            .catch(memError => {
              console.log("memError: ", memError);
            });

          if (cnt == 0) {
            FileSystem.writeAsStringAsync(
              fProfilesUri,
              JSON.stringify(profilesContents)
            )
              .then(setProfilesResult => {
                readScheduled();
              })
              .catch(setProfilesError => {
                console.log("setProfilesError: ", setProfilesError);
              });
          }
        });
      })
      .catch(getProfilesError => {
        console.log("getProfilesError: ", getProfilesError);
      });
  }

  function readScheduled() {
    const fScheduledUri = FileSystem.documentDirectory + "KDODataScheduled.txt";
    const options = FileSystem.EncodingType.UTF8;

    firebase
      .firestore()
      .collection("scheduled")
      .get()
      .then(getScheduledResult => {
        const scheduledContents = [];
        getScheduledResult.forEach(doc => {
          scheduledContents.push({
            key: doc.id,
            value: doc.data()
          });
        });

        FileSystem.writeAsStringAsync(
          fScheduledUri,
          JSON.stringify(scheduledContents)
        )
          .then(setScheduledResult => {
            readUGEvents();
          })
          .catch(setScheduledError => {
            console.log("setScheduledError: ", setScheduledError);
          });
      })
      .catch(getScheduledError => {
        console.log("getScheduledError: ", getScheduledError);
      });
  }

  function readUGEvents() {
    firebase
      .firestore()
      .collection("userGroups")
      .get()
      .then(getUserGroupsResult => {
        let userGroupsEventsContents = [];
        let cnt = getUserGroupsResult.size;

        getUserGroupsResult.forEach(async doc => {
          let eventsContents = [];

          //get Events
          await firebase
            .firestore()
            .collection("userGroups")
            .doc(doc.id)
            .collection("events")
            .get()
            .then(getEventsResult => {
              let eCnt = getEventsResult.size;

              getEventsResult.forEach(async getEventDoc => {
                await firebase
                  .firestore()
                  .collection("userGroups")
                  .doc(doc.id)
                  .collection("events")
                  .doc(getEventDoc.id)
                  .collection("notify")
                  .get()
                  .then(notifyResult => {
                    let notiCnt = notifyResult.size;

                    let notifyContents = [];
                    notifyResult.forEach(notifyDoc => {
                      notifyContents.push({
                        key: notifyDoc.id,
                        notifyValue: notifyDoc.data()
                      });
                      notiCnt -= 1;
                    });
                    if (notiCnt == 0) {
                      eventsContents.push({
                        key: getEventDoc.id,
                        eveValue: getEventDoc.data(),
                        notify: notifyContents
                      });
                      eCnt -= 1;
                    }
                  })
                  .catch(notifyErr => {
                    console.log("notifyError", notifyErr);
                  });
                if (eCnt == 0) {
                  userGroupsEventsContents.push({
                    key: doc.id,
                    events: eventsContents
                  });
                  cnt -= 1;
                }
                if (cnt == 0) {
                  readUserGroups(userGroupsEventsContents);
                }
              });
            })
            .catch(eventsError => {
              console.log("eventsError: ", eventsError);
            });
        });
      })
      .catch(getUserGroupsError => {
        console.log("getUserGroupsError: ", getUserGroupsError);
      });
  }

  function readUserGroups(eData) {
    const fUserGroupsUri =
      FileSystem.documentDirectory + "KDODataUserGroups.txt";
    const options = FileSystem.EncodingType.UTF8;

    firebase
      .firestore()
      .collection("userGroups")
      .get()
      .then(getUserGroupsResult => {
        const userGroupsContents = [];
        let cnt = getUserGroupsResult.size;

        getUserGroupsResult.forEach(async doc => {
          let membersContents = [];

          // get members
          await firebase
            .firestore()
            .collection("userGroups")
            .doc(doc.id)
            .collection("members")
            .get()
            .then(async getMemResult => {
              nCnt = getMemResult.size;
              getMemResult.forEach(getMemDoc => {
                membersContents.push({
                  key: getMemDoc.id,
                  active: getMemDoc.data()
                });
                nCnt -= 1;
              });
              if (nCnt == 0) {
                let eveData = eData.find(item => item.key === doc.id);
                userGroupsContents.push({
                  key: doc.id,
                  value: doc.data(),
                  members: membersContents,
                  events: eveData.events
                });
                cnt -= 1;
              }

              if (cnt == 0) {
                FileSystem.writeAsStringAsync(
                  fUserGroupsUri,
                  JSON.stringify(userGroupsContents)
                )
                  .then(setUserGroupsResult => {
                    // setIsLoading(false);
                    initFileData();
                    // console.log("userGroupsContents: ", userGroupsContents);
                  })
                  .catch(setUserGroupsError => {
                    console.log("setUserGroupsError: ", setUserGroupsError);
                  });
              }
            })
            .catch(memErr => {
              console.log("memErr: ", memErr);
            });
        });
      })
      .catch(getUserGroupsError => {
        console.log("getUserGroupsError: ", getUserGroupsError);
      });
  }

  const handleItemClick = item => {
    setIsSelectedItem(item);
    navigation.navigate("Event", {
      eventName: item.eventName,
      key: item.key,
      userGroupId: item.userGroupId,
      eventDate: item.eventDate,
      eventNote: item.eventNote,
      eventCnt: item.eventCnt,
      eventBadge: item.eventBadge,
      eventStatus: item.eventStatus,
      eventDay: item.eventDay,
      eventMembers: item.eventMembers,
      eventAskBefore: item.eventAskBefore
    });
  };
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => handleItemClick(item)}
        style={styles.item}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={isInactiveFlag ? inactiveClasses : activeClasses}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            extraData={selectedId}
            style={styles.flContainer}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

export default Calendar;
