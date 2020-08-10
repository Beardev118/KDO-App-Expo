import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

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
    backgroundColor: "white",
    fontSize: 12
  },
  eNote: {
    flex: 0.2,
    fontSize: 12,
    textAlign: "right",
    textAlignVertical: "center",
    padding: 9,
    paddingEnd: 0
  },
  eDate: {
    flex: 0.7,
    fontSize: 16,
    textAlign: "left",
    textAlignVertical: "center",
    padding: 4
  },
  eCnt: {
    flex: 0.3,
    fontSize: 16,
    backgroundColor: "white",
    textAlign: "right",
    textAlignVertical: "center",
    padding: 4
  }
});

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
  >
    <View key={item.key} style={styles.item}>
      <View style={styles.subContainer}>
        <Text style={styles.eName}>{item.eventName}</Text>
        <Text style={styles.eBadge}>{item.eventBadge}</Text>
        <Text style={styles.eNote}>{item.eventNote}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.eDate}>{item.eventDate}</Text>
        <Text style={styles.eCnt}>{item.eventCnt}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function Calendar() {
  const [selectedId, setSelectedId] = useState(null);
  const [classes, setClasses] = useState([
    {
      eventName: "test 01",
      key: "1",
      eventDate: "08.08 16:00",
      eventNote: "AAA",
      eventCnt: "3",
      eventBadge: "ANS"
    },
    {
      eventName: "test 02",
      key: "2",
      eventDate: "08.08 16:00",
      eventNote: "BAA",
      eventCnt: "3",
      eventBadge: "BNS"
    },
    {
      eventName: "test 03",
      key: "3",
      eventDate: "08.08 16:00",
      eventNote: "CAA",
      eventCnt: "3",
      eventBadge: "CNS"
    },
    {
      eventName: "test 04",
      key: "4",
      eventDate: "08.08 16:00",
      eventNote: "DAA",
      eventCnt: "3",
      eventBadge: "DNS"
    },
    {
      eventName: "test 05",
      key: "5",
      eventDate: "08.08 16:00",
      eventNote: "EAA",
      eventCnt: "3",
      eventBadge: "ENS"
    },
    {
      eventName: "test 06",
      key: "6",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    },
    {
      eventName: "test 07",
      key: "7",
      eventDate: "08.08 16:00",
      eventNote: "GAA",
      eventCnt: "3",
      eventBadge: "GNS"
    },
    {
      eventName: "test 08",
      key: "8",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    },
    {
      eventName: "test 09",
      key: "9",
      eventDate: "08.08 16:00",
      eventNote: "GAA",
      eventCnt: "3",
      eventBadge: "GNS"
    },
    {
      eventName: "test 10",
      key: "10",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    },
    {
      eventName: "test 03",
      key: "11",
      eventDate: "08.08 16:00",
      eventNote: "CAA",
      eventCnt: "3",
      eventBadge: "CNS"
    },
    {
      eventName: "test 04",
      key: "12",
      eventDate: "08.08 16:00",
      eventNote: "DAA",
      eventCnt: "3",
      eventBadge: "DNS"
    },
    {
      eventName: "test 05",
      key: "13",
      eventDate: "08.08 16:00",
      eventNote: "EAA",
      eventCnt: "3",
      eventBadge: "ENS"
    },
    {
      eventName: "test 06",
      key: "14",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    },
    {
      eventName: "test 07",
      key: "15",
      eventDate: "08.08 16:00",
      eventNote: "GAA",
      eventCnt: "3",
      eventBadge: "GNS"
    },
    {
      eventName: "test 08",
      key: "16",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    },
    {
      eventName: "test 09",
      key: "17",
      eventDate: "08.08 16:00",
      eventNote: "GAA",
      eventCnt: "3",
      eventBadge: "GNS"
    },
    {
      eventName: "test 10",
      key: "18",
      eventDate: "08.08 16:00",
      eventNote: "FAA",
      eventCnt: "3",
      eventBadge: "FNS"
    }
  ]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => console.log(item.key)}
        style={styles.item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        extraData={selectedId}
        style={styles.flContainer}
      />
    </SafeAreaView>
  );
}

export default Calendar;
