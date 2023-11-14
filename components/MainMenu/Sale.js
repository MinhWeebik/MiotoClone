import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";

const DATA = [
  {
    key: "1",
    imageSource: require("../Images/Sales/Sale1.png"),
  },
  {
    key: "2",
    imageSource: require("../Images/Sales/Sale2.png"),
  },
  {
    key: "3",
    imageSource: require("../Images/Sales/Sale3.png"),
  },
  {
    key: "4",
    imageSource: require("../Images/Sales/Sale4.png"),
  },
  {
    key: "5",
    imageSource: require("../Images/Sales/Sale5.png"),
  },
  {
    key: "6",
    imageSource: require("../Images/Sales/Sale6.png"),
  },
  {
    key: "7",
    imageSource: require("../Images/Sales/Sale7.png"),
  },
];

const screenWidth = Dimensions.get("window").width;

const Item = ({ title, index }) => (
  <View
    style={{ marginLeft: isFirstItem(index), marginRight: isLastItem(index) }}
  >
    <Image source={title} style={styles.saleImage} />
  </View>
);

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

const Sale = () => {
  return (
    <View style={styles.saleContainer}>
      <Text style={styles.title}>Chương trình khuyến mãi</Text>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item title={item.imageSource} index={index} />
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
  saleContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  saleImage: {
    width: screenWidth * 0.6,
    height: 160,
    borderRadius: 10,
  },
});

export default Sale;
