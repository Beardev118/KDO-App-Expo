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
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInputContainer: {
    flex: 0.65,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  typeContainer: {
    flex: 0.35,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  periodContainer: {
    flex: 0.26,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  dayContainer: {
    flex: 0.26,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  timeContainer: {
    flex: 0.22,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  reminderContainer: {
    flex: 0.26,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  btnView: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnUserGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 56,
    backgroundColor: '#27842A',
    borderRadius: 8,
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
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  subjectType: {
    paddingVertical: 2,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  subjectInfo: {
    width: '100%',
    height: 80,
    padding: 2,
    fontSize: 16,
    backgroundColor: 'white',
  },
  subLabel: {
    fontSize: 16,
    padding: 2,
    color: '#6B6B6B',
  },
  valueText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
});

function Subject() {
  const [valueSubjectName, onChangeSubjectName] = useState('');
  const [valueSubjectInfo, onChangeSubjectInfo] = useState('');
  const [country, setCountry] = useState('uk');

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.subLabel}>Název skupiny</Text>
          <TextInput
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'white',
            }}
            onChangeText={text => onChangeSubjectName(text)}
            value={valueSubjectName}
          />
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.subLabel}>Typ</Text>
          <DropDownPicker
            items={[
              {
                label: 'Akce',
                value: 'Akce',
                // icon: () => <Icon name="flag" size={18} color="#900" />,
              },
              {
                label: 'Sportovní',
                value: 'Sportovní',
                // icon: () => <Icon name="flag" size={18} color="#900" />,
              },
              {
                label: 'Kulturní',
                value: 'Kulturní',
              },
              {
                label: 'Umělecká',
                value: 'Umělecká',
              },
              {
                label: 'Vzdělávací',
                value: 'Vzdělávací',
              },
              {
                label: 'Sociální',
                value: 'Sociální',
              },
              {
                label: 'Technická',
                value: 'Technická',
              },
              {
                label: 'Osobní',
                value: 'Osobní',
              },
            ]}
            defaultValue={country}
            containerStyle={{width: '100%', height: 40}}
            style={{width: '100%', backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setCountry(item.value)}
          />
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.subLabel}>Informace</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.subjectInfo}
            onChangeText={text => onChangeSubjectInfo(text)}
            value={valueSubjectInfo}
          />
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.periodContainer}>
          <Text style={styles.subLabel}>Perioda</Text>
          <TouchableOpacity style={styles.subjectType} underlayColor="#fff">
            <Text style={styles.valueText}>Týden</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.subLabel}>Den</Text>
          <TouchableOpacity
            style={styles.subjectType}
            onPress={() => Alert.alert('Simple Button pressed')}
            underlayColor="#fff">
            <Text style={styles.valueText}>Akce</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.subLabel}>Čas</Text>
          <TouchableOpacity
            style={styles.subjectType}
            onPress={() => Alert.alert('Simple Button pressed')}
            underlayColor="#fff">
            <Text style={styles.valueText}>Akce</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reminderContainer}>
          <Text style={styles.subLabel}>Připom.</Text>
          <TouchableOpacity
            style={styles.subjectType}
            onPress={() => Alert.alert('Simple Button pressed')}
            underlayColor="#fff">
            <Text style={styles.valueText}>Akce</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnUserGroup}
          onPress={() => Alert.alert('AAAA')}
          underlayColor="#fff">
          <Text style={styles.btnText}>ZALOžIT NOVOU SKUPINU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Subject;
