import React, { useRef, useState, Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import SmoothPicker from "react-native-smooth-picker";
// import ScrollPicker from "react-native-wheel-scroll-picker";
import ScrollPicker from "react-native-picker-scrollview";

export default class Day extends Component {
  render() {
    return (
      <ScrollPicker
        ref={sp => {
          this.sp = sp;
        }}
        dataSource={["a", "b", "c", "d"]}
        selectedIndex={0}
        itemHeight={50}
        wrapperHeight={100}
        wrapperColor={"#ffff00"}
        highlightColor={"#d8d8d8"}
        renderItem={(data, index, isSelected) => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
      />
    );
  }

  //
  someOtherFunc() {
    this.sp.scrollToIndex(2); // select 'c'
    let selectedValue = this.sp.getSelected(); // returns 'c'
  }
}

// const dataCity = ["Mon", "Tue", " Wed", "Thu", " Fri", "Sat", "Sun"];

// const opacities = {
//   0: 1,
//   1: 1,
//   2: 0.6,
//   3: 0.3,
//   4: 0.1
// };
// const sizeText = {
//   0: 20,
//   1: 15,
//   2: 10
// };

// const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
//   return (
//     <View
//       style={[
//         styles.OptionWrapper,
//         {
//           opacity,
//           borderColor: selected ? "#ABC9AF" : "transparent",
//           width: vertical ? 190 : "auto"
//         }
//       ]}
//     >
//       <Text style={{ fontSize }}>{name}</Text>
//     </View>
//   );
// });

// const ItemToRender = ({ item, index }, indexSelected, vertical) => {
//   const selected = index === indexSelected;
//   const gap = Math.abs(index - indexSelected);

//   let opacity = opacities[gap];
//   if (gap > 3) {
//     opacity = opacities[4];
//   }
//   let fontSize = sizeText[gap];
//   if (gap > 1) {
//     fontSize = sizeText[2];
//   }

//   return (
//     <Item
//       opacity={opacity}
//       selected={selected}
//       vertical={vertical}
//       fontSize={fontSize}
//       name={item}
//     />
//   );
// };

// const Day = () => {
//   function handleChange(index) {
//     setSelected(index);
//     refPicker.current.scrollToIndex({
//       animated: false,
//       index: index,
//       viewOffset: -30
//     });
//   }

//   const [selected, setSelected] = useState(1);
//   const refPicker = useRef(null);
//   return (
//     <View style={styles.container}>
//       <View style={styles.wrapperHorizontal}>
//         <SmoothPicker
//           initialScrollToIndex={selected}
//           refFlatList={refPicker}
//           keyExtractor={(_, index) => index.toString()}
//           horizontal={true}
//           scrollAnimation
//           showsHorizontalScrollIndicator={false}
//           data={dataCity}
//           renderItem={option => ItemToRender(option, selected, false)}
//         />
//       </View>
//       <View style={styles.wrapperVertical}>
//         <SmoothPicker
//           initialScrollToIndex={selected}
//           onScrollToIndexFailed={() => {}}
//           keyExtractor={(_, index) => index.toString()}
//           showsVerticalScrollIndicator={false}
//           data={dataCity}
//           scrollAnimation
//           onSelected={({ item, index }) => handleChange(index)}
//           renderItem={option => ItemToRender(option, selected, true)}
//           magnet
//         />
//       </View>
//       <View>
//         <Text>{`Your selection is ${dataCity[selected]}`}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     paddingBottom: 30,
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   wrapperHorizontal: {
//     height: 100,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "auto",
//     color: "black"
//   },
//   wrapperVertical: {
//     width: 250,
//     height: 350,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "auto",
//     color: "black"
//   },
//   OptionWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 30,
//     paddingRight: 30,
//     height: 50,
//     borderWidth: 3,
//     borderRadius: 10
//   }
// });

// export default Day;
