import React, { useContext, memo, useMemo } from "react";
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
import { carData } from "../JSON/car";
import { DriverTypeContext } from "./DriverTypeProvider";
const screenWidth = Dimensions.get("window").width;
import Images, { CAC, KIACARNIVAL } from "../JSON/Images";

const MyCarRender = ({
  image,
  carName,
  location,
  star,
  rentCount,
  price,
  fastBooking,
  mortgage,
  transmissionType,
  deliver,
  index,
  navigation,
  id,
}) => {
  const FastBookingItem = useMemo(() => {
    return (
      <View style={styles.fastBookingContainer}>
        <Text style={styles.fastBookingText}>Đặt xe nhanh</Text>
        <MaterialCommunityIcons
          name="lightning-bolt"
          size={16}
          color="rgba(254,198,51,255)"
        />
      </View>
    );
  });

  const Both = useMemo(() => {
    return (
      <View style={{ position: "absolute" }}>
        <View style={styles.fastBookingContainer}>
          <Text style={styles.fastBookingText}>Đặt xe nhanh</Text>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={16}
            color="rgba(254,198,51,255)"
          />
        </View>
        <View style={[styles.fastBookingContainer, { top: 25 }]}>
          <Text style={styles.fastBookingText}>Miễn thế chấp</Text>
          <MaterialCommunityIcons
            name="cash-lock"
            size={16}
            color="rgba(95,207,133,255)"
          />
        </View>
      </View>
    );
  });

  const MortgageItem = useMemo(() => {
    return (
      <View style={[styles.fastBookingContainer]}>
        <Text style={styles.fastBookingText}>Miễn thế chấp</Text>
        <MaterialCommunityIcons
          name="cash-lock"
          size={16}
          color="rgba(95,207,133,255)"
        />
      </View>
    );
  });

  const DeliverItem = useMemo(() => {
    return (
      <View
        style={[
          styles.transmissionTypeContainer,
          {
            marginLeft: 10,
            backgroundColor: "rgba(252,224,211,255)",
            width: 100,
          },
        ]}
      >
        <Text style={styles.transmissionType}>Giao xe tận nơi</Text>
      </View>
    );
  });

  const renderMark = (fastBooking, mortgage) => {
    if (fastBooking === true && mortgage === true) {
      return Both;
    } else if (fastBooking === true) {
      return FastBookingItem;
    } else if (mortgage === true) {
      return MortgageItem;
    }
  };

  const isFirstItem = (index) => {
    if (index === 0) {
      return 20;
    }
    return 0;
  };

  const isLastItem = (index) => {
    if (index === carData.length - 1) {
      return 20;
    }
    return 10;
  };

  const ManualItem = useMemo(() => {
    return (
      <View style={styles.transmissionTypeContainer}>
        <Text style={styles.transmissionType}>Số sàn</Text>
      </View>
    );
  });

  const AutoItem = useMemo(() => {
    return (
      <View style={[styles.transmissionTypeContainer, { width: 76 }]}>
        <Text style={[styles.transmissionType]}>Số tự động</Text>
      </View>
    );
  });
  return (
    <View>
      <View
        style={[
          styles.carImageContainer,
          {
            marginLeft: isFirstItem(index),
            marginRight: isLastItem(index),
          },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("CarDetail", { id: id });
          }}
        >
          <View style={{ position: "relative" }}>
            <Image source={Images[image]} style={styles.carImage} />
            {renderMark(fastBooking, mortgage)}
            <View style={styles.loveContainer}>
              <Ionicons name="heart-outline" size={21} color="white" />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            {transmissionType === "auto" ? AutoItem : ManualItem}
            {deliver === true && DeliverItem}
          </View>
          <View style={styles.carNameContainer}>
            <Text style={styles.carName}>{carName}</Text>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={18}
              color="rgba(95,207,133,255)"
            />
          </View>
          <View style={styles.carLocationContainer}>
            <Ionicons
              name="location-sharp"
              size={16}
              color="rgba(102,102,102,255)"
            />
            <Text style={styles.carLocation}>{location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="star" size={15} color="rgba(254,198,51,255)" />
              <Text style={styles.star}>{star}</Text>
              <MaterialIcons
                name="luggage"
                size={15}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.rentCount}>{rentCount}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginRight: 10,
              }}
            >
              <Text style={styles.price}>{price}K</Text>
              <Text style={styles.perDay}> / ngày</Text>
            </View>
          </View>
        </Pressable>
      </View>
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
    marginBottom: 10,
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

export default memo(MyCarRender);
