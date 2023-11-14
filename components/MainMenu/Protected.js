import { Link } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Touchable,
  Pressable,
  Linking,
} from "react-native";
const Protected = () => {
  return (
    <View style={styles.protectedContainer}>
      <Text style={styles.title}>Hành trình luôn được bảo vệ</Text>
      <Image
        source={require("../Images/protected/1.png")}
        style={styles.protectedImage}
      />
      <Image
        source={require("../Images/protected/2.png")}
        style={[
          styles.protectedImage,
          { marginTop: 30, backgroundColor: "rgba(223,245,232,255)" },
        ]}
      />
      <View style={styles.rentContainer}>
        <Image
          source={require("../Images/CarImages/benten.png")}
          style={styles.rentImage}
        />
        <View style={styles.imageTint}></View>
        <View style={styles.rentInfoContainer}>
          <Text style={styles.rentInfoTitle}>Bạn muốn cho thuê xe?</Text>
          <Text style={styles.rentInfoDesc}>
            Hơn 5,000 chủ xe đang cho thuê hiệu quả trên Mioto Đăng kí trở thành
            đối tác của chúng tôi ngay hôm nay để gia tăng thu nhập hằng thắng.
            <Text
              onPress={() => {
                Linking.openURL("https://www.mioto.vn/howitwork#owner");
              }}
              style={{ color: "rgba(95,207,133,255)" }}
            >
              Tìm hiểu thêm
            </Text>
          </Text>
          <Pressable style={styles.signUpButton}>
            <Text style={styles.signUpText}>Đăng ký ngay</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  protectedContainer: {
    marginTop: 25,
    marginBottom: 100,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  protectedImage: {
    width: screenWidth - 40,
    height: 140,
    objectFit: "contain",
    borderRadius: 8,
    marginLeft: 20,
    backgroundColor: "rgba(206,232,255,255)",
  },

  rentContainer: {
    marginLeft: 20,
    marginTop: 25,
    position: "relative",
  },

  rentImage: {
    width: screenWidth - 40,
    height: 220,
    borderRadius: 8,
  },

  imageTint: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 20,
    borderRadius: 30,
  },

  rentInfoContainer: {
    position: "absolute",
    left: 20,
    top: 30,
  },

  rentInfoTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 23,
  },

  rentInfoDesc: {
    color: "white",
    width: screenWidth - 80,
    fontSize: 12,
    marginTop: 20,
  },

  signUpButton: {
    backgroundColor: "rgba(95,207,133,255)",
    width: 125,
    paddingLeft: 20,
    paddingTop: 11,
    paddingBottom: 13,
    borderRadius: 8,
    marginTop: 15,
  },

  signUpText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Protected;
