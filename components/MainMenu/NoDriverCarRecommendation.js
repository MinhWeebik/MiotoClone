import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DriverTypeContext } from "./DriverTypeProvider";
import MyCarRender from "./CarRender";
import { ActivityIndicator } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const NoDriverCarRecommnedation = ({ navigation }) => {
  let { hasDriver, setHasDriver } = useContext(DriverTypeContext);
  const [carData2, setCarData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://6545fba5fe036a2fa9550bdf.mockapi.io/api/CarData")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setCarData2(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.carRecommendationContainer}>
      <Text style={styles.title}>
        {hasDriver === false
          ? "Xe tự lái dành cho bạn"
          : "Xe có tài xế dành cho bạn"}
      </Text>
      {isLoading ? (
        <View>
          <ActivityIndicator size={"large"} color="rgba(95,207,133,255)" />
        </View>
      ) : (
        <View>
          <FlatList
            data={carData2}
            renderItem={({ item, index }) => (
              <MyCarRender
                image={item.image[0].imageLink}
                carName={item.carName}
                location={item.location}
                star={item.star}
                rentCount={item.rentCount}
                price={item.price}
                transmissionType={item.transmissionType}
                fastBooking={item.fastBooking}
                mortgage={item.mortgage}
                deliver={item.deliver}
                index={index}
                navigation={navigation}
                id={item.id}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carRecommendationContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  carImage: {
    width: screenWidth - 62,
    height: 220,
    borderRadius: 17,
  },

  carImageContainer: {
    width: screenWidth - 32,
    borderWidth: 1,
    borderRadius: 17,
    borderColor: "lightgrey",
    paddingLeft: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },

  transmissionTypeContainer: {
    backgroundColor: "rgba(238,246,255,255)",
    paddingLeft: 6,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 6,
    borderRadius: 20,
    width: 52,
    marginTop: 20,
  },

  transmissionType: {
    fontSize: 13,
  },

  carName: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },

  carNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  carLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginRight: 10,
    paddingBottom: 10,
  },

  carLocation: {
    fontSize: 12,
    fontWeight: "400",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  star: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 6,
  },

  rentCount: {
    fontSize: 12,
  },

  price: {
    color: "rgba(95,207,133,255)",
    fontWeight: "bold",
    fontSize: 16,
  },

  perDay: {
    fontSize: 12,
    color: "grey",
  },

  fastBookingContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    marginLeft: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingBottom: 2,
    paddingRight: 7,
    paddingTop: 1,
    borderRadius: 12,
  },

  fastBookingText: {
    color: "white",
    fontSize: 11,
    marginRight: 6,
  },

  loveContainer: {
    position: "absolute",
    right: 20,
    top: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 50,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoDriverCarRecommnedation;
