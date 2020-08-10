import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberAvartar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CECECE',
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginVertical: 8,
    padding: 3,
    color: '#6B6B6B',
  },
  memberMsg: {
    height: 24,
    fontSize: 12,
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 2,
    color: '#6B6B6B',
  },
  memberNote: {
    width: 70,
    height: 44,
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#6B6B6B',
    textAlign: 'right',
    textAlignVertical: 'center',
    padding: 10,
  },
  topBarContainer: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    marginHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textGroupName: {
    flex: 0.7,
    fontSize: 20,
    padding: 4,
    color: 'black',
  },
  textTermin: {
    flex: 0.3,
    fontSize: 18,
    padding: 4,
    color: 'black',
  },
  btnFab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#27842A',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 60,
    paddingBottom: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnView: {
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

const TopBar = () => (
  <View style={styles.topBarContainer}>
    <Text style={styles.textGroupName}>Název skupiny</Text>
    <Text style={styles.textTermin}>Termíny</Text>
  </View>
);

const BottomBar = () => (
  <View style={styles.btnView}>
    <TouchableOpacity
      style={styles.btnFab}
      onPress={() => Alert.alert('AAAA')}
      underlayColor="#fff">
      <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>
  </View>
);

const Item = ({item, onPress, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{borderBottomColor: '#6B6B6B', borderBottomWidth: 1}}>
    <View key={item.key} style={styles.item}>
      <View style={styles.subContainer}>
        <Image
          style={styles.memberAvartar}
          source={require('../../../assets/badminton.png')}
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

function EventManager({navigation}) {
  const [selectedId, setSelectedId] = useState(null);
  const [members, setMembers] = useState([
    {
      avatarId: 'test 01',
      key: '1',
      textUserName: 'test 01',
      textMsg: 'AAA',
      textNote: '100%',
    },
    {
      avatarId: 'test 02',
      key: '2',
      textUserName: 'test 02',
      textMsg: 'AAA',
      textNote: '30%',
    },
    {
      avatarId: 'test 03',
      key: '3',
      textUserName: 'test 03',
      textMsg: 'AAA',
      textNote: '100%',
    },
    {
      avatarId: 'test 04',
      key: '4',
      textUserName: 'test 04',
      textMsg: 'AAAFADFASF',
      textNote: '70%',
    },
    {
      avatarId: 'test 05',
      key: '5',
      textUserName: 'test 05',
      textMsg: 'AAA',
      textNote: '50%',
    },
  ]);

  const renderItem = ({item}) => {
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
      <TopBar />
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        extraData={selectedId}
        style={styles.flContainer}
      />
      <BottomBar />
    </SafeAreaView>
  );
}

export default EventManager;
