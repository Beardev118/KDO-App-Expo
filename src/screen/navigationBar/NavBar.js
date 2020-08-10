import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton, Colors } from "react-native-paper";

import Calendar from "./Calendar";
import CalendarMenu from "../menu/CalendarMenu";
import Event from "./Event";
import EventMenu from "../menu/EventMenu";
import EventManager from "./EventManager";
import Subject from "./Subject";
import Invite from "./Invite";
import Profile from "./Profile";
import ProfileMenu from "../menu/ProfileMenu";
import Setting from "../navigationBar/Setting";

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
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={{
            title: "Pozvánka"
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={navProfileOptions}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            title: "Nastavení"
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
          onPress={() => navigation.navigate("Setting")}
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
        <EventMenu />
      </View>
    )
  };
};

const navProfileOptions = ({ navigation }) => {
  return {
    title: "Profil",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <ProfileMenu />
      </View>
    )
  };
};

export default NavBar;
