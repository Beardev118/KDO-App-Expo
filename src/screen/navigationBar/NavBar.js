import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton, Colors } from "react-native-paper";

import Calendar from "./Calendar";
import CalendarMenu from "../menu/CalendarMenu";
// import { CalendarMenuState } from "../../globalState/CalendarMenuState";
// import { CalendarMenuContext } from "../../globalState/CalendarMenuState";
import Event from "./Event";
import EventManager from "./EventManager";
import Subject from "./Subject";

const styles = StyleSheet.create({
  headerRightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center"
  }
});

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function NavBar() {
  return (
    // <CalendarMenuState>
    <NavigationContainer style={{ flex: 1, flexDirection: "column" }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e"
          },
          headerTintColor: "#fff"
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Calendar}
          options={navCalendarOptions}
        />

        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="Event"
          component={Event}
          options={navEventOptions}
        />
        <Stack.Screen
          name="EventManager"
          component={EventManager}
          options={{
            title: "Editor Akcí"
          }}
        />
        <Stack.Screen
          name="Subject"
          component={Subject}
          options={{
            title: "Nová Skupina"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </CalendarMenuState>
  );
}

const navCalendarOptions = ({ navigation }) => {
  // const [calendarMenuStatus, setCalendarMenuStatus] = useContext(
  //   CalendarMenuContext
  // );
  return {
    title: "Kalendář",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <IconButton
          icon="plus-circle-outline"
          color={Colors.white}
          size={28}
          onPress={() => navigation.navigate("Event")}
        />

        <CalendarMenu />
      </View>
    )
  };
};

const navEventOptions = ({ navigation }) => {
  return {
    title: "Událost",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <IconButton
          icon="dots-vertical"
          color={Colors.white}
          size={24}
          onPress={() => navigation.navigate("Details")}
        />
      </View>
    )
  };
};

export default NavBar;
