import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LocationContext } from "./LocationProvider";
import { DriverTypeContext } from "./DriverTypeProvider";
import { Snackbar } from "react-native-paper";
import { ArriveLocationContext } from "./ArriveLocationProvider";

const yesDriverOutCity = (prop) => {
  const [visible, setVisible] = useState(false);
  let { hasDriver, setHasDriver } = useContext(DriverTypeContext);
  let { specificLocation, setSpecificLocation } = useContext(LocationContext);
  let { specificArriveLocation, setSpecificArriveLocation } = useContext(
    ArriveLocationContext
  );
  const locationString = (location) => {
    if (location === null || location === undefined) {
      return;
    } else {
      let location1 =
        (location.address.road !== undefined
          ? location.address.road + ", "
          : "") +
        (location.address.hamlet !== undefined
          ? location.address.hamlet + ", "
          : "") +
        (location.address.village !== undefined
          ? location.address.village + ", "
          : "") +
        (location.address.city_district !== undefined
          ? location.address.city_district + ", "
          : "") +
        (location.address.city !== undefined ? location.address.city : "");
      return location1;
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const string = () => {
    if (specificLocation === null) {
      return "Nhập điểm đón";
    } else {
      return locationString(specificLocation);
    }
  };
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text style={styles.journyTypeInfo}>
          {`Di chuyển ngoài thành phố, hành trình ${prop.way} chiều.`}
        </Text>
        <AntDesign name="questioncircleo" size={17} color="grey" />
      </View>
      <Text style={styles.Header}>Lộ trình</Text>
      <View style={styles.locationTextContainer}>
        <MaterialCommunityIcons
          name="map-marker-account-outline"
          size={20}
          color="grey"
        />
        <Text style={styles.locationText}>Điểm đón</Text>
      </View>
      <Pressable
        style={styles.locationInput}
        onPress={() =>
          prop.navigation.navigate("SelectLocationNoDriver", {
            location: "start",
          })
        }
      >
        <Text style={styles.locationInputText} numberOfLines={1}>
          {string()}
        </Text>
      </Pressable>
      <View style={styles.locationTextContainer}>
        <EvilIcons name="location" size={20} color="grey" />
        <Text style={styles.locationText}>Điểm đến</Text>
      </View>
      <Pressable
        style={styles.locationInput}
        onPress={() => {
          if (specificLocation !== null) {
            prop.navigation.navigate("SelectLocationNoDriver", {
              location: "arrive",
            });
          } else {
            onToggleSnackBar();
          }
        }}
      >
        <Text style={styles.locationInputText} numberOfLines={1}>
          {specificArriveLocation === null
            ? "Nhập Điểm đến"
            : locationString(specificArriveLocation)}
        </Text>
      </Pressable>
      <Text style={[styles.Header, styles.timerHeader]}>Thời gian</Text>
      <Pressable
        style={styles.timeInput}
        onPress={() => {
          prop.navigation.navigate("SelectDateOne");
        }}
      >
        <EvilIcons name="calendar" size={20} color="grey" />
        <Text style={styles.timeInputText}>
          {`${prop.start} - ${prop.end}`}
        </Text>
      </Pressable>
      <Pressable
        style={styles.searchCarButton}
        onPress={() => {
          if (specificLocation !== null && specificArriveLocation !== null) {
            prop.navigation.navigate("SearchForCar");
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
        {specificLocation === null
          ? "Vui lòng chọn điểm đón"
          : "Vui lòng chọn điểm đến"}
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
    paddingLeft: 10,
    marginRight: 20,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    marginTop: 5,
    paddingBottom: 9,
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
    fontWeight: "bold",
  },

  Header: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "bold",
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

export default yesDriverOutCity;
