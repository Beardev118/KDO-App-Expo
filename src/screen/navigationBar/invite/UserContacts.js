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
          fields: [Contacts.PHONE_NUMBERS]
        });

        let filteredData = data.filter(item => item.phoneNumbers !== undefined);

        setContacts(filteredData);
        setInMemoryContacts(filteredData);
        setIsLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: "#bada55", fontWeight: "bold", fontSize: 26 }}>
        {item.firstName + " "}
        {item.lastName}
      </Text>
      <Text style={{ color: "#6B6B6B", fontWeight: "bold" }}>
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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#2f363c" }} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#dddddd"
        style={{
          backgroundColor: "#2f363c",
          height: 50,
          fontSize: 36,
          padding: 10,
          color: "white",
          borderBottomWidth: 0.5,
          borderBottomColor: "#7d90a0"
        }}
        onChangeText={value => searchContacts(value)}
      />
      <View style={{ flex: 1, backgroundColor: "#2f363c" }}>
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
              <Text style={{ color: "#bad555" }}>No Contacts Found</Text>
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

// import React, { Component } from "react";
// import { View, Alert, Button } from "react-native";
// // import { Button } from "react-native-elements"; // Version can be specified in package.json
// import * as Contacts from "expo-contacts";
// import * as Permissions from "expo-permissions";

// export default class UserContacts extends Component {
//   async showFirstContactAsync() {
//     // Ask for permission to query contacts.
//     const permission = await Permissions.askAsync(Permissions.CONTACTS);

//     if (permission.status !== "granted") {
//       // Permission was denied...
//       return;
//     }
//     const contacts = await Contacts.getContactsAsync({
//       fields: [Contacts.PHONETIC_FIRST_NAME, Contacts.EMAILS]
//       // pageSize: 10,
//       // pageOffset: 0
//     });
//     if (contacts.total > 0) {
//       console.log(contacts.data[60].num);
//       // Alert.alert(
//       //   contacts.data[0]
//       //   // "Your first contact is...",
//       //   // `Name: ${contacts.data[0].name}\n` +
//       //   //   `Phone numbers: ${contacts.data[0].phoneNumbers}\n` +
//       //   //   `Emails: ${contacts.data[0].emails[0].email}`
//       // );
//     }
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, paddingTop: 40 }}>
//         <Button title="Get contacts" onPress={this.showFirstContactAsync} />
//       </View>
//     );
//   }
// }

// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import * as Contacts from "expo-contacts";

// export default function App() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Contacts.requestPermissionsAsync();
//       if (status === "granted") {
//         const { data } = await Contacts.getContactsAsync({
//           fields: [Contacts.PHONE_NUMBERS]
//         });

//         let filteredData = data.filter(item => item.phoneNumbers !== undefined);

//         console.log("Filtered data", filteredData);

//         if (data.length > 0) {
//           const contact = data[1];
//           console.log("aaa", contact);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       <Text>Contacts Module Example</Text>
//     </View>
//   );
// }
