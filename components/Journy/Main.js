import React, { useMemo } from "react";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";

const Journy = () => {
  const snapPoint = useMemo(() => ["40%"]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chuyến của tôi </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Image
          source={require("../Images/NoCurrentTrip.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.title}>Bạn chưa có chuyến hiện tại</Text>
        <Text style={styles.previousTitle}>Xem các chuyến trước đây</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    paddingBottom: 120,
  },
  headerContainer: {
    marginTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  header: {
    fontSize: 21,
    textAlign: "center",
  },

  imageStyle: {
    width: 220,
    height: 220,
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "rgba(111,111,111,255)",
    fontSize: 21,
    fontWeight: "500",
    marginTop: 7,
  },

  previousTitle: {
    color: "rgba(95,207,133,255)",
    fontWeight: "500",
    marginTop: 14,
    fontSize: 14.5,
  },
});

export default Journy;
