import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import * as Contacts from "expo-contacts";

export default function UserContacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS],
          sort: Contacts.Fields.FirstName
        });

        let filteredData = data.filter(item => item.phoneNumbers !== undefined);

        setContacts(filteredData);
        setInMemoryContacts(filteredData);
        setIsLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        minHeight: 50,
        padding: 5,
        marginHorizontal: 20,
        borderBottomColor: "#969696",
        borderBottomWidth: 0.5
      }}
    >
      <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
        {item.firstName + " "}
        {item.lastName}
      </Text>
      <Text style={{ color: "#969696", fontWeight: "bold" }}>
        {item.phoneNumbers[0].number}
      </Text>
    </View>
  );

  function searchContacts(value) {
    const filteredContacts = inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        " " +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContacts(filteredContacts);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ backgroundColor: "#fff" }} />
      <TextInput
        placeholder="Search for contact"
        placeholderTextColor="#6B6B6B"
        style={{
          backgroundColor: "#EDEDED",
          height: 50,
          fontSize: 18,
          paddingVertical: 10,
          paddingHorizontal: 16,
          color: "#000",
          borderBottomWidth: 0.5,
          borderBottomColor: "#7d90a0",
          borderRadius: 25,
          marginHorizontal: 10,
          marginVertical: 6
        }}
        onChangeText={value => searchContacts(value)}
      />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {isLoading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50
              }}
            >
              <Text style={{ color: "#6B6B6B" }}>No Contacts Found</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
