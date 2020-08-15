import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { IconButton, Colors } from "react-native-paper";

import Splash from "./Splash";
import Calendar from "./Calendar";
import CalendarMenu from "../menu/CalendarMenu";
import Event from "./Event";
import EventMenu from "../menu/EventMenu";
import EventManager from "./EventManager";
import Subject from "./Subject";
import Invite from "./Invite";
import Profile from "./Profile";
import ProfileMenu from "../menu/ProfileMenu";
import Setting from "./Setting";
import Login from "./Login";
import EditUserGroup from "./EditUserGroup";
import NewTerm from "./NewTerm";
import EditTerm from "./EditTerm";
import EditTermMenu from "../menu/EditTermMenu";
import Day from "../modalPages/Day";
import { SplashContext } from "../../globalState/SplashState";
import EditUserGroupMenu from "../menu/EditUserGroupMenu";

import UserContacts from "./invite/UserContacts";

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
  const [splashStatus, setSplashStatus] = useContext(SplashContext);
  return (
    <NavigationContainer style={{ flex: 1, flexDirection: "column" }}>
      <Stack.Navigator
        initialRouteName="UserContacts"
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
          name="UserContacts"
          component={UserContacts}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "KDO PŘIJDE",
            headerLeft: null
          }}
        />

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

        <Stack.Screen
          name="EditUserGroup"
          component={EditUserGroup}
          options={navEditUserGroupOptions}
        />
        <Stack.Screen
          name="NewTerm"
          component={NewTerm}
          options={{ title: "Nový Termín" }}
        />
        <Stack.Screen
          name="EditTerm"
          component={EditTerm}
          options={navEditTermOptions}
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
    headerLeft: null,
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <IconButton
          icon="plus-circle-outline"
          color={Colors.white}
          size={28}
          onPress={() => navigation.navigate("EventManager")}
        />
        <CalendarMenu navigation={navigation} />
      </View>
    )
  };
};

const navEventOptions = ({ navigation }) => {
  return {
    title: "Událost",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <EventMenu navigation={navigation} />
      </View>
    )
  };
};

const navEditUserGroupOptions = ({ navigation }) => {
  return {
    title: "Editace Skupiny",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => alert("Save")}
          underlayColor="#fff"
        >
          <Text style={{ fontSize: 14, color: "white" }}>Uložit</Text>
        </TouchableOpacity>
        <EditUserGroupMenu navigation={navigation} />
      </View>
    )
  };
};

const navEditTermOptions = ({ navigation }) => {
  return {
    title: "Editace Termínu",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => alert("Save")}
          underlayColor="#fff"
        >
          <Text style={{ fontSize: 14, color: "white" }}>Uložit</Text>
        </TouchableOpacity>
        <EditTermMenu navigation={navigation} />
      </View>
    )
  };
};

const navProfileOptions = ({ navigation }) => {
  return {
    title: "Profil",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <ProfileMenu navigation={navigation} />
      </View>
    )
  };
};

export default NavBar;
