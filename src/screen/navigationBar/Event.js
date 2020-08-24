import "react-native-gesture-handler";
import React, { useState, useContext, useEffect, useRef } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../firebase/config";
import Status from "../modalPages/Status";
import Member from "../modalPages/Member";
import { GlobalContext } from "../../globalState/GlobalState";
import { MemberContext } from "../../globalState/MemberState";
import { EventActiveContext } from "../../globalState/EventActiveState";
import { AskBeforeTimeContext } from "../../globalState/AskBeforeTimeState";
import { EventAllMembersContext } from "../../globalState/EventAllMembersState";
import { async } from "@firebase/util";

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
    alignItems: "center",
    marginVertical: 4
  },
  memberAvartar: {
    width: 40,
    height: 40,
    borderRadius: 20
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
    color: "#FFF",
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
    marginEnd: 4
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
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  btnText: {
    color: "#fff",
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

const BottomBar = props => {
  const [modalStatus, setModalStatus] = useContext(GlobalContext);

  const onClickYesNo = value => {
    if (
      props.item[0].eveKey !== "" &&
      props.item[0].eveDateKey !== "" &&
      props.item[0].userKey !== ""
    ) {
      firebase
        .database()
        .ref(
          "/responses/" +
            props.item[0].eveKey +
            "/" +
            props.item[0].eveDateKey +
            "/" +
            props.item[0].userKey
        )
        .set({
          m: props.item[0].m,
          p: value,
          t: Math.trunc(firebase.firestore.Timestamp.now().toMillis() / 1000)
        })
        .then(() => console.log("Xxx: X"));
    }
  };

  return (
    <View style={styles.bottomBarContainer}>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnNo}
          onPress={() => onClickYesNo(0)}
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
          onPress={() => onClickYesNo(100)}
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
        {item.imgUrl !== "" ? (
          <Image source={{ uri: item.imgUrl }} style={styles.memberAvartar} />
        ) : (
          <Image
            style={styles.memberAvartar}
            source={require("../../../assets/useravatar.png")}
          />
        )}
        <Text style={styles.memberName}>{item.textUserName}</Text>
        <Text style={styles.memberMsg}>{item.textMsg}</Text>
      </View>
      <View>
        {item.textNote >= 0 ? (
          <Text
            style={{
              ...styles.memberNote,
              backgroundColor: item.colorNote !== "" ? item.colorNote : "#fff"
            }}
          >
            {item.textNote}%
          </Text>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

const onChangeKeyDate = value => {
  const curYear = new Date().getFullYear() - 2000;
  const eveDate = value.split(".");
  const eveTime = eveDate[2].split(":");
  const eveHour = eveTime[0].split(" ");
  return String(curYear) + eveDate[1] + eveDate[0] + eveHour[1] + eveTime[1];
};

function Event({ route, navigation }) {
  const {
    eventName,
    key,
    eventDate,
    eventNote,
    eventCnt,
    eventBadge,
    eventStatus,
    eventDay,
    eventMembers,
    eventAskBefore,
    userGroupId
  } = route.params;

  const [modalMemberStatus, setModalMemberStatus] = useContext(MemberContext);
  const [eventActiveStatus, setEventActiveStatus] = useContext(
    EventActiveContext
  );
  const [eventAllMembersStatus, setEventAllMembersStatus] = useContext(
    EventAllMembersContext
  );
  const [timeAskBefore, setTimeAskBefore] = useContext(AskBeforeTimeContext);
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false);
  const SRtimeAskBefore = useRef(timeAskBefore);
  const SReventActiveStatus = useRef(SReventActiveStatus);

  const [selectedId, setSelectedId] = useState(null);
  const [members, setMembers] = useState([]);
  const [authMember, setAuthMember] = useState([
    {
      key: "",
      textUserName: "",
      textMsg: "",
      textNote: -1,
      colorNote: "",
      imgUrl: "",
      textUserPhoneNumber: ""
    }
  ]);
  const [firebaseFlag, setFirebaseFlag] = useState(false);
  const [oldFirebaseFlag, setOldFirebaseFlag] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [userImgUrl, setUserImgUrl] = useState("");
  const [onValueChange, setOnValueChange] = useState(null);
  const [userItem, setUserItem] = useState([
    {
      eveKey: "",
      eveDateKey: "",
      userKey: "",
      m: "",
      p: -1
    }
  ]);
  const [fullCnt, setFullCnt] = useState(0);
  const [miniCnt, setMiniCnt] = useState(0);
  const [authUser, setAuthUser] = useState(null);

  const onCalcColor = value => {
    if (value >= 80) return "#27842A";
    else if (value < 80 && value >= 50) return "#4CAF50";
    else if (value < 50 && value >= 20) return "#FFA726";
    else if (value < 20 && value >= 0) return "#E65100";
  };

  useEffect(() => {
    (async () => {
      const ac = new AbortController();
      let didUnsubscribe = false;
      if (didUnsubscribe) return;

      // profiles Data
      const fProfilesUri = FileSystem.documentDirectory + "KDODataProfiles.txt";
      const rawProfilesData = await FileSystem.readAsStringAsync(fProfilesUri);
      const profilesData = JSON.parse(rawProfilesData);
      setUserProfileData(profilesData);

      setEventActiveStatus(eventStatus);
      setTimeAskBefore(eventAskBefore);

      firebase.auth().onAuthStateChanged(user => {
        setAuthUser(user);

        if (eventMembers !== undefined) {
          let eventMembersCount = 0;
          eventMembers.forEach(emItem => {
            eventMembersCount += 1;
          });

          const memberTempData = [];
          const authMemberTempData = [];

          eventMembers.forEach(async emItem => {
            const authUserData = [];
            if (user !== null) {
              if (emItem.memKey === user.uid) {
                authUserData.push({
                  eveKey: key,
                  eveDateKey: onChangeKeyDate(eventDate),
                  userKey: emItem.memKey,
                  m: "",
                  p: -1
                });
                setUserItem(authUserData);
              }
            }

            let emProfileData;
            let emUserName = "";
            let emUserPhoneNumber = "";
            if (profilesData !== null) {
              emProfileData = profilesData.find(
                upItem => upItem.key === emItem.memKey
              );
            }

            if (emProfileData !== undefined) {
              emUserName = emProfileData.value.username;
              emUserPhoneNumber = emProfileData.value.phone;
              if (emProfileData.value.hasPhoto) {
                await firebase
                  .storage()
                  .ref()
                  .child("profile_images")
                  .child(emItem.memKey)
                  .getDownloadURL()
                  .then(url => {
                    const memberTempDataItem = {
                      key: emItem.memKey,
                      textUserName: emUserName,
                      textMsg: "",
                      textNote: -1,
                      colorNote: "",
                      imgUrl: url,
                      textUserPhoneNumber: emUserPhoneNumber
                    };
                    memberTempData.push(memberTempDataItem);
                    if (emItem.memKey === user.uid)
                      authMemberTempData.push(memberTempDataItem);

                    eventMembersCount -= 1;
                  })
                  .catch(error => {
                    eventMembersCount -= 1;
                  });
              } else {
                const memberTempDataItem = {
                  key: emItem.memKey,
                  textUserName: emUserName,
                  textMsg: "",
                  textNote: -1,
                  colorNote: "",
                  imgUrl: "",
                  textUserPhoneNumber: emUserPhoneNumber
                };
                memberTempData.push(memberTempDataItem);
                if (emItem.memKey === user.uid)
                  authMemberTempData.push(memberTempDataItem);

                eventMembersCount -= 1;
              }
            }
            if (eventMembersCount === 0) {
              setSelectedId(prev => !prev);
              setMembers(memberTempData);
              setAuthMember(authMemberTempData);
              setFirebaseFlag(prev => !prev);
            }
          });
        }
      });

      return () => {
        ac.abort();
        didUnsubscribe = true;
      };
    })();
  }, [navigation, key]);

  useEffect(() => {
    SRtimeAskBefore.current = timeAskBefore;
    SReventActiveStatus.current = eventActiveStatus;
  }, [timeAskBefore, eventActiveStatus]);

  useEffect(() => {
    (async () => {
      const ac = new AbortController();
      let didUnsubscribe = false;
      if (didUnsubscribe) return;

      if (firebaseFlag !== oldFirebaseFlag) {
        setOldFirebaseFlag(prev => !prev);
        //Firebase Realtime DB snapshot
        const onValueChange = firebase
          .database()
          .ref("/responses")
          .on("value", async snapshot => {
            if (snapshot === null || snapshot.val === undefined) return;

            const resData = snapshot.val();
            const memberTempData = [];
            const authMemberTempData = [];
            const eveTempData = resData[key];
            const eveDateKey = onChangeKeyDate(eventDate);

            if (eveTempData !== undefined && eveDateKey !== undefined) {
              const eveMemData = eveTempData[eveDateKey];
              if (eveMemData !== undefined) {
                if (eventMembers !== undefined) {
                  let flCnt = 0;
                  let miCnt = 0;

                  let eventMembersCount = 0;
                  eventMembers.forEach(emItem => {
                    eventMembersCount += 1;
                  });

                  await eventMembers.forEach(async emItem => {
                    const eveMData = eveMemData[emItem.memKey];

                    const authUserData = [];
                    if (authUser !== null) {
                      if (emItem.memKey === authUser.uid) {
                        if (eveMData !== undefined) {
                          authUserData.push({
                            eveKey: key,
                            eveDateKey: eveDateKey,
                            userKey: emItem.memKey,
                            m: eveMData.m,
                            p: eveMData.p
                          });
                        } else {
                          authUserData.push({
                            eveKey: key,
                            eveDateKey: eveDateKey,
                            userKey: emItem.memKey,
                            m: "",
                            p: -1
                          });
                        }

                        setUserItem(authUserData);
                      }
                    }

                    let memImgUrl = "";
                    let emProfileData;
                    let emUserName = "";
                    let emUserPhoneNumber = "";
                    if (userProfileData !== null) {
                      emProfileData = userProfileData.find(
                        upItem => upItem.key === emItem.memKey
                      );
                    }

                    if (emProfileData !== undefined) {
                      emUserName = emProfileData.value.username;
                      emUserPhoneNumber = emProfileData.value.phone;
                      if (emProfileData.value.hasPhoto) {
                        await firebase
                          .storage()
                          .ref()
                          .child("profile_images")
                          .child(emItem.memKey)
                          .getDownloadURL()
                          .then(url => {
                            memImgUrl = url;
                            if (eveMData !== undefined) {
                              const memberTempDataItem = {
                                key: emItem.memKey,
                                textUserName: emUserName,
                                textMsg: eveMData.m,
                                textNote: eveMData.p,
                                colorNote: onCalcColor(eveMData.p),
                                imgUrl: memImgUrl,
                                textUserPhoneNumber: emUserPhoneNumber
                              };
                              memberTempData.push(memberTempDataItem);
                              if (emItem.memKey === authUser.uid)
                                authMemberTempData.push(memberTempDataItem);
                              if (eveMData.p === 100) flCnt += 1;
                              if (eveMData.p < 100 && eveMData.p >= 80)
                                miCnt += 1;
                            } else {
                              const memberTempDataItem = {
                                key: emItem.memKey,
                                textUserName: emUserName,
                                textMsg: "",
                                textNote: -1,
                                colorNote: "",
                                imgUrl: memImgUrl,
                                textUserPhoneNumber: emUserPhoneNumber
                              };
                              memberTempData.push(memberTempDataItem);
                              if (emItem.memKey === authUser.uid)
                                authMemberTempData.push(memberTempDataItem);
                            }
                            eventMembersCount -= 1;
                          })
                          .catch(error => {
                            memImgUrl = "";
                          });
                      } else {
                        if (eveMData !== undefined) {
                          const memberTempDataItem = {
                            key: emItem.memKey,
                            textUserName: emUserName,
                            textMsg: eveMData.m,
                            textNote: eveMData.p,
                            colorNote: onCalcColor(eveMData.p),
                            imgUrl: memImgUrl,
                            textUserPhoneNumber: emUserPhoneNumber
                          };
                          memberTempData.push(memberTempDataItem);
                          if (emItem.memKey === authUser.uid)
                            authMemberTempData.push(memberTempDataItem);
                          if (eveMData.p === 100) flCnt += 1;
                          if (eveMData.p < 100 && eveMData.p >= 80) miCnt += 1;
                        } else {
                          const memberTempDataItem = {
                            key: emItem.memKey,
                            textUserName: emUserName,
                            textMsg: "",
                            textNote: -1,
                            colorNote: "",
                            imgUrl: memImgUrl,
                            textUserPhoneNumber: emUserPhoneNumber
                          };
                          memberTempData.push(memberTempDataItem);
                          if (emItem.memKey === authUser.uid)
                            authMemberTempData.push(memberTempDataItem);
                        }
                        eventMembersCount -= 1;
                      }
                    }
                    if (eventMembersCount === 0) {
                      setSelectedId(prev => !prev);
                      setMembers(memberTempData);
                      setAuthMember(authMemberTempData);
                      setFullCnt(flCnt);
                      setMiniCnt(miCnt);
                    }
                  });
                }
              }
            }
          });

        setOnValueChange(onValueChange);
      }

      return () => {
        ac.abort();
        // firebase
        //   .database()
        //   .ref("/responses")
        //   .off("value", onValueChange);
        didUnsubscribe = true;
      };
    })();
  }, [firebaseFlag]);

  useEffect(() => {
    let askFlag = 1;
    navigation.addListener("beforeRemove", e => {
      if (askFlag > 2) return;
      if (
        SRtimeAskBefore.current !== eventAskBefore ||
        SReventActiveStatus.current !== eventStatus
      ) {
        if (askFlag === 1) {
          // If we don't have unsaved changes, then we don't need to do anything
          e.preventDefault();

          firebase.auth().onAuthStateChanged(async user => {
            if (user != null) {
              await firebase
                .firestore()
                .collection("userGroups")
                .doc(userGroupId)
                .collection("events")
                .doc(key)
                .collection("notify")
                .doc(user.uid)
                .update({
                  active: SReventActiveStatus.current,
                  askBefore: 60 * SRtimeAskBefore.current
                })
                .then(() => {
                  setHasUnsavedChange(true);
                  askFlag += 1;
                  navigation.goBack();
                  // navigation.navigate("Home");
                });
            }
          });
        }
      }
    });

    return () => {
      navigation.removeListener("beforeRemove");
    };
  }, [hasUnsavedChange]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused

  //     console.log("ATTTT:::");

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       console.log("BTTTT::::");
  //     };
  //   }, [])
  // );

  const TopBar = () => (
    <View style={{ backgroundColor: "#E9E6DD" }}>
      <View style={{ height: 8 }} />
      <View style={styles.topBarContainer}>
        <View style={styles.topBarSubView}>
          <Text style={styles.eventName}>{eventName}</Text>
        </View>
        <Text style={styles.eventTime}>
          Kdy: {eventNote} {eventDate}
        </Text>
        <View style={styles.topBarSubView}>
          <Text style={styles.eventMembers}>Kdo přijde:</Text>
          {miniCnt > 0 ? (
            <Text style={styles.eventAttend}>
              Účast {fullCnt}-{miniCnt}lidí
            </Text>
          ) : (
            <Text style={styles.eventAttend}>Účast {fullCnt}lidí</Text>
          )}
        </View>
      </View>
    </View>
  );

  const onChangeModalStatus = value => {
    setUserName(value.textUserName);
    setUserPhoneNumber(value.textUserPhoneNumber);
    setUserImgUrl(value.imgUrl);
    setUserMsg(value.textMsg);
    setModalMemberStatus(true);
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => onChangeModalStatus(item)}
        style={styles.item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <FlatList
        data={eventAllMembersStatus ? members : authMember}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        extraData={selectedId}
        style={styles.flContainer}
      />
      <BottomBar item={userItem} />
      <Status item={userItem} />
      <Member
        imageUrl={userImgUrl}
        name={userName}
        phoneNumber={userPhoneNumber}
        msg={userMsg}
      />
    </SafeAreaView>
  );
}

export default Event;
