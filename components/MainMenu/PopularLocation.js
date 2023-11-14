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
    image: require("../Images/cities/hcm.png"),
    city: "TP. Hồ Chí Minh",
    carAmount: "3200+ xe",
  },
  {
    id: "2",
    image: require("../Images/cities/hanoi.png"),
    city: "Hà Nội",
    carAmount: "1400+ xe",
  },
  {
    id: "3",
    image: require("../Images/cities/danang.png"),
    city: "Đà Nẵng",
    carAmount: "320+ xe",
  },
  {
    id: "4",
    image: require("../Images/cities/binhduong.png"),
    city: "Bình Dương",
    carAmount: "330+ xe",
  },
  {
    id: "5",
    image: require("../Images/cities/cantho.png"),
    city: "Cần thơ",
    carAmount: "110+ xe",
  },
  {
    id: "6",
    image: require("../Images/cities/dalat.png"),
    city: "Đà Lạt",
    carAmount: "160+ xe",
  },
  {
    id: "7",
    image: require("../Images/cities/nhatrang.png"),
    city: "Nha Trang",
    carAmount: "160+ xe",
  },
];

const screenWidth = Dimensions.get("window").width;

const Item = ({ image, city, carAmount, index }) => {
  return (
    <View
      style={[
        styles.cityContainer,
        { marginLeft: isFirstItem(index), marginRight: isLastItem(index) },
      ]}
    >
      <Image source={image} style={styles.cityImage} />
      <View style={styles.cityInfoContainer}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.carAmount}>{carAmount}</Text>
      </View>
    </View>
  );
};

const isFirstItem = (index) => {
  if (index === 0) {
    return 20;
  }
  return 0;
};

const isLastItem = (index) => {
  if (index === DATA.length - 1) {
    return 20;
  }
  return 10;
};

const PopularLocation = () => {
  return (
    <View style={styles.popularLocationContainer}>
      <Text style={styles.title}>Địa điểm nổi bật</Text>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            image={item.image}
            city={item.city}
            carAmount={item.carAmount}
            index={index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToAlignment="center"
        pagingEnabled
        decelerationRate={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  popularLocationContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  cityImage: {
    width: screenWidth / 2 - 30,
    height: screenWidth / 2 + 10,
    borderRadius: 10,
  },

  cityContainer: {
    position: "relative",
  },

  cityInfoContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },

  cityName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  carAmount: {
    color: "white",
    fontSize: 11,
    fontWeight: "500",
  },
});

export default PopularLocation;
