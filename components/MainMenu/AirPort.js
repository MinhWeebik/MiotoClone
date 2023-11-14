import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const DATA = [
  {
    id: "1",
    image: require("../Images/airports/tansonnhat.png"),
    name: "Tân Sơn Nhất",
    carAmount: "1000+ xe",
  },
  {
    id: "2",
    image: require("../Images/airports/noibai.png"),
    name: "Nội Bài",
    carAmount: "200+ xe",
  },
  {
    id: "3",
    image: require("../Images/airports/danang.png"),
    name: "Đà Nẵng",
    carAmount: "100+ xe",
  },
  {
    id: "4",
    image: require("../Images/airports/camranh.png"),
    name: "Cam Ranh",
    carAmount: "20+ xe",
  },
  {
    id: "5",
    image: require("../Images/airports/phuquoc.png"),
    name: "Phú Quốc",
    carAmount: "70+ xe",
  },
  {
    id: "6",
    image: require("../Images/airports/lienkhuong.png"),
    name: "Liên Khương",
    carAmount: "30+ xe",
  },
];

const isFirstItem = (index) => {
  if (index === 0) {
    return screenWidth / 14;
  }
  return 0;
};

const isLastItem = (index) => {
  if (index === DATA.length - 1) {
    return screenWidth / 14;
  }
  return screenWidth / 9;
};

const Item = ({ image, name, carAmount, index }) => {
  return (
    <View
      style={[
        styles.airPortContainer,
        { marginLeft: isFirstItem(index), marginRight: isLastItem(index) },
      ]}
    >
      <Image source={image} style={styles.airPortImage} />
      <Text style={styles.airPortName}>{name}</Text>
      <Text style={styles.carAmount}>{carAmount}</Text>
    </View>
  );
};

const AirPort = () => {
  return (
    <View style={styles.airPortLocationContainer}>
      <Text style={styles.title}>Giao xe tại sân bay</Text>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            image={item.image}
            name={item.name}
            carAmount={item.carAmount}
            index={index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  airPortLocationContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  airPortImage: {
    width: screenWidth / 5.3,
    height: screenWidth / 5.3,
    borderRadius: 120,
  },

  airPortContainer: {
    alignItems: "center",
  },

  airPortName: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 7,
  },

  carAmount: {
    fontSize: 14,
    color: "grey",
    marginTop: 3,
  },
});

export default AirPort;
