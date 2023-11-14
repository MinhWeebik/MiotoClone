import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const myProfile = ({ navigation }) => {
  return (
    <View style={styles.pfpContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("CÁ NHÂN");
        }}
      >
        <Image source={require("../Images/pfp.png")} style={styles.pfp} />
      </Pressable>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.name}>Nguyễn Công Sơn</Text>
        <View style={styles.pointContainer}>
          <AntDesign name="star" size={15} color="rgba(254,198,51,255)" />
          <Text style={styles.point}>0 điểm</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pfp: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },

  pfpContainer: {
    flexDirection: "row",
    marginTop: 20 + StatusBar.currentHeight,
    marginLeft: 20,
    alignItems: "center",
  },

  profileInfoContainer: {
    marginLeft: 13,
  },

  name: {
    fontWeight: "500",
    fontSize: 16,
  },

  pointContainer: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },

  point: {
    fontSize: 13,
    marginLeft: 5,
  },
});

export default myProfile;
