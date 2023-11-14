import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const firstOption = [
  {
    icon: "person-outline",
    text: "Tài khoản của tôi",
  },
  {
    icon: "car-sport-outline",
    text: "Xe của tôi",
  },
  {
    icon: "heart-outline",
    text: "Xe yêu thích",
  },
  {
    icon: "home-outline",
    text: "Địa chỉ của tôi",
  },
  {
    icon: "card-outline",
    text: "Thẻ của tôi",
  },
];

const secondOption = [
  {
    icon: "lock-closed-outline",
    text: "Đổi mật khẩu",
  },
  {
    icon: "trash-outline",
    text: "Yêu cầu xóa tài khoản",
  },
];

const thirdOption = [
  {
    icon: "ios-gift-outline",
    text: "Quà tặng",
  },
  {
    icon: "share-social-outline",
    text: "Giới thiệu bạn bè",
  },
];

const Profile = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.background}></View>
        <View style={styles.pfpContainer}>
          <View style={styles.pfpBackground}></View>
          <Image source={require("../Images/pfp.png")} style={styles.pfp} />
        </View>
        <Text style={styles.name}>Nguyễn Công Sơn</Text>
        <View style={styles.accountOptionsContainer}>
          {firstOption.map((item, index) => {
            return (
              <View
                style={[
                  styles.accountOptionContainer,
                  {
                    borderBottomWidth:
                      index === firstOption.length - 1 ? 0 : 0.7,
                  },
                ]}
                key={index}
              >
                <View style={styles.accountOptionLeftSide}>
                  <Ionicons name={item.icon} size={18} color="black" />
                  <Text style={styles.accountOptionText}>{item.text}</Text>
                </View>
                <AntDesign name="right" size={18} color="black" />
              </View>
            );
          })}
        </View>
        <View style={[styles.accountOptionsContainer, { marginTop: 20 }]}>
          {secondOption.map((item, index) => {
            return (
              <View
                style={[
                  styles.accountOptionContainer,
                  {
                    borderBottomWidth:
                      index === secondOption.length - 1 ? 0 : 0.7,
                  },
                ]}
                key={index}
              >
                <View style={styles.accountOptionLeftSide}>
                  <Ionicons name={item.icon} size={18} color="black" />
                  <Text style={styles.accountOptionText}>{item.text}</Text>
                </View>
                <AntDesign name="right" size={18} color="black" />
              </View>
            );
          })}
        </View>
        <View style={[styles.accountOptionsContainer, { marginTop: 20 }]}>
          {thirdOption.map((item, index) => {
            return (
              <View
                style={[
                  styles.accountOptionContainer,
                  {
                    borderBottomWidth:
                      index === thirdOption.length - 1 ? 0 : 0.7,
                  },
                ]}
                key={index}
              >
                <View style={styles.accountOptionLeftSide}>
                  <Ionicons name={item.icon} size={18} color="black" />
                  <Text style={styles.accountOptionText}>{item.text}</Text>
                </View>
                <AntDesign name="right" size={18} color="black" />
              </View>
            );
          })}
        </View>
        <View style={styles.logoutContainer}>
          <Ionicons
            name="log-out-outline"
            size={32}
            color="rgba(223,76,65,255)"
          />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(246,246,246,255)",
    position: "relative",
  },

  background: {
    backgroundColor: "rgba(223,245,232,255)",
    height: 95 + StatusBar.currentHeight,
    width: windowWidth,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  pfp: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  pfpContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 45,
    position: "relative",
    elevation: 20,
  },

  pfpBackground: {
    position: "absolute",
    width: 105,
    height: 105,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 110,
  },

  name: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 18,
    fontWeight: "500",
  },

  accountOptionsContainer: {
    backgroundColor: "white",
    marginHorizontal: 15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 40,
  },

  accountOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgrey",
    paddingBottom: 13,
  },

  accountOptionLeftSide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  accountOptionText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 18,
  },

  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 110,
  },

  logoutText: {
    color: "rgba(223,76,65,255)",
    fontSize: 19,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default Profile;
