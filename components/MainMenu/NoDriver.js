import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import Sale from "./Sale";
import NoDriverCarRecommnedation from "./NoDriverCarRecommendation";
import PopularLocation from "./PopularLocation";
import AirPort from "./AirPort";
import { LocationContext } from "./LocationProvider";
import { DriverTypeContext } from "./DriverTypeProvider";
import { Snackbar } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

const NoDriver = ({ navigation, start, end }) => {
  const [visible, setVisible] = useState(false);
  let { hasDriver, setHasDriver } = useContext(DriverTypeContext);
  let startDay = start;
  let endDay = end;
  let { specificLocation, setSpecificLocation } = useContext(LocationContext);
  const locationString = () => {
    if (specificLocation === null || specificLocation === undefined) {
      return;
    } else {
      let location =
        (specificLocation.address.road !== undefined
          ? specificLocation.address.road + ", "
          : "") +
        (specificLocation.address.hamlet !== undefined
          ? specificLocation.address.hamlet + ", "
          : "") +
        (specificLocation.address.village !== undefined
          ? specificLocation.address.village + ", "
          : "") +
        (specificLocation.address.city_district !== undefined
          ? specificLocation.address.city_district + ", "
          : "") +
        (specificLocation.address.city !== undefined
          ? specificLocation.address.city
          : "");
      return location;
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const string = () => {
    if (specificLocation === null) {
      return "Nhập địa điểm bạn muốn thuê xe";
    } else {
      return locationString();
    }
  };
  return (
    <View style={styles.DriverTypeContainer}>
      <View style={styles.locationTextContainer}>
        <EvilIcons name="location" size={20} color="grey" />
        <Text style={styles.locationText}>Địa điểm</Text>
      </View>
      <Pressable
        style={styles.locationInput}
        onPress={() => navigation.navigate("SelectLocationNoDriver")}
      >
        <Text style={styles.locationInputText} numberOfLines={1}>
          {string()}
        </Text>
      </Pressable>
      <View style={styles.locationTextContainer}>
        <EvilIcons name="calendar" size={20} color="grey" />
        <Text style={styles.locationText}>Thời gian thuê</Text>
      </View>
      <Pressable
        style={styles.timeInput}
        onPress={() => navigation.navigate("SelectDateOne")}
      >
        <Text style={styles.timeInputText}>{`${startDay} - ${endDay}`}</Text>
      </Pressable>
      <Pressable
        style={styles.searchCarButton}
        onPress={() => {
          if (specificLocation !== null) {
            navigation.navigate("SearchForCar");
          } else {
            onToggleSnackBar();
          }
        }}
      >
        <Text style={styles.searchCarText}>Tìm xe</Text>
      </Pressable>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Sửa thông tin",
        }}
        duration={1500}
        style={{
          borderRadius: 15,
        }}
      >
        Vui lòng chọn địa điểm
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },

  locationText: {
    fontSize: 15,
    color: "grey",
    marginLeft: 5,
  },

  locationInputText: {
    fontSize: 14,
    color: "rgba(103,103,103,255)",
    fontWeight: "500",
  },

  locationInput: {
    marginLeft: 15,
    paddingLeft: 10,
    marginRight: 20,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    marginTop: 5,
    paddingBottom: 9,
  },

  timeInput: {
    marginLeft: 15,
    paddingLeft: 10,
    marginRight: 20,
    marginTop: 5,
    paddingBottom: 9,
  },

  timeInputText: {
    fontSize: 14,
    fontWeight: "500",
  },

  searchCarButton: {
    backgroundColor: "rgba(95,207,133,255)",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  searchCarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  DriverTypeContainer: {
    width: windowWidth - 30,
  },
});

export default NoDriver;
