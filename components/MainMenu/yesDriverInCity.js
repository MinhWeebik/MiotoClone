import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LocationContext } from "./LocationProvider";
import { DriverTypeContext } from "./DriverTypeProvider";
import { Snackbar } from "react-native-paper";

const YesDriverCityInCity = ({ navigation, start, end }) => {
  let { hasDriver, setHasDriver } = useContext(DriverTypeContext);
  const [visible, setVisible] = useState(false);
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
      return "Nhập điểm đón";
    } else {
      return locationString();
    }
  };
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text style={styles.journyTypeInfo}>Di chuyển trong thành phố.</Text>
        <AntDesign name="questioncircleo" size={17} color="grey" />
      </View>
      <Text style={styles.Header}>Điểm đón</Text>
      <Pressable
        style={styles.locationInput}
        onPress={() => navigation.navigate("SelectLocationNoDriver")}
      >
        <MaterialCommunityIcons
          name="map-marker-account-outline"
          size={20}
          color="grey"
        />
        <Text style={styles.locationInputText} numberOfLines={1}>
          {string()}
        </Text>
      </Pressable>
      <Text style={[styles.Header, styles.timerHeader]}>Thời gian</Text>
      <Pressable
        style={styles.timeInput}
        onPress={() => navigation.navigate("SelectDateOne")}
      >
        <EvilIcons name="calendar" size={20} color="grey" />
        <Text style={styles.timeInputText}>{`${start} - ${end}`}</Text>
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
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 9,
    flexDirection: "row",
  },

  timeInput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 14,
    paddingBottom: 9,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    marginBottom: 5,
    flexDirection: "row",
  },

  timeInputText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
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
    fontWeight: "500",
  },

  Header: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "500",
  },

  journyTypeInfo: {
    fontSize: 12,
    color: "grey",
    marginLeft: 15,
    marginRight: 7,
    marginBottom: 12,
  },

  timerHeader: {
    marginTop: 15,
  },
});

export default YesDriverCityInCity;
