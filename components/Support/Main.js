import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const DATA = [
  {
    id: 1,
    image: require("../Images/Supports/1.png"),
  },
  {
    id: 2,
    image: require("../Images/Supports/2.png"),
  },
  {
    id: 3,
    image: require("../Images/Supports/3.png"),
  },
  {
    id: 4,
    image: require("../Images/Supports/4.png"),
  },
  {
    id: 5,
    image: require("../Images/Supports/5.png"),
  },
  {
    id: 6,
    image: require("../Images/Supports/6.png"),
  },
];

const windowWidth = Dimensions.get("window").width;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Support = () => {
  const bottomSheetref = useRef(null);
  const snapPoint = ["38%"];
  const [isOpen, setIsOpen] = useState(false);
  const handleSnapPress = useCallback((index) => {
    bottomSheetref.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetref.current?.close();
    setIsOpen(false);
  }, []);

  const isFirstItem = (index) => {
    if (index === 0) {
      return 15;
    }
    return 0;
  };

  const isLastItem = (index) => {
    if (index === DATA.length - 1) {
      return 15;
    }
    return 7;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.background}></View>
        <Image
          source={require("../Images/Supports/Support.png")}
          style={styles.image}
        />
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>
            Cần hỗ trợ nhanh, vui lòng gọi 1900 9217 (7AM - 10PM) hoặc gửi tin
            nhắn vào Mioto Fanpage.
          </Text>
          <View style={styles.contactButtonContainer}>
            <Pressable style={styles.contactButton}>
              <Feather name="phone" size={17} color="rgba(95,207,133,255)" />
              <Text style={styles.contactButtonText}>Gọi</Text>
            </Pressable>
            <Pressable
              style={[
                styles.contactButton,
                { marginLeft: 10, backgroundColor: "rgba(95,207,133,255)" },
              ]}
            >
              <Ionicons name="chatbubbles-outline" size={17} color="white" />
              <Text style={[styles.contactButtonText, { color: "white" }]}>
                Gửi tin nhắn
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.hotlineContainer}>
          <Text style={styles.hotlineHeader}>Hotline bảo hiểm</Text>
          <View style={styles.hotlineButtonContainer}>
            <Pressable
              style={styles.hotlineButton}
              onPress={() => {
                handleSnapPress(0);
              }}
            >
              <Image
                source={require("../Images/Supports/micHotline.png")}
                style={styles.hotlineImage}
              />
            </Pressable>
            <Pressable
              style={[styles.hotlineButton, { marginLeft: 7 }]}
              onPress={() => {
                handleSnapPress(0);
              }}
            >
              <Image
                source={require("../Images/Supports/pviHotline.png")}
                style={styles.hotlineImage}
              />
            </Pressable>
            <Pressable
              style={[styles.hotlineButton, { marginLeft: 7 }]}
              onPress={() => {
                handleSnapPress(0);
              }}
            >
              <Image
                source={require("../Images/Supports/vniHotline.png")}
                style={styles.hotlineImage}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.guideContainer}>
          <Text style={styles.guideHeader}>Hướng dẫn</Text>
          <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <Image
                source={item.image}
                style={[
                  styles.guideImage,
                  {
                    marginRight: isLastItem(index),
                    marginLeft: isFirstItem(index),
                  },
                ]}
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
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Thông tin</Text>
          <View style={styles.infoItemsContainer}>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="building"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Thông tin công ty</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="clipboard-check"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Chính sách và quy định</Text>
            </View>
          </View>
          <View style={styles.infoItemsContainer}>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="google-play"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={[styles.infoItemText]}>
                Đánh giá Mioto trên Google Play
              </Text>
            </View>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="facebook-f"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Fanpage Facebook Mioto</Text>
            </View>
          </View>
          <View style={styles.infoItemsContainer}>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="question-circle"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Hỏi và trả lời</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="file-contract"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Quy chế hoạt động</Text>
            </View>
          </View>
          <View style={styles.infoItemsContainer}>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="lock"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Bảo mật thông tin</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <FontAwesome5
                name="check-circle"
                size={32}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.infoItemText}>Giải quyết tranh chấp</Text>
            </View>
          </View>
          <Text style={styles.version}>Phiên bản 4.0.9 (450)</Text>
        </View>
      </ScrollView>
      {isOpen && (
        <AnimatedPressable
          style={[styles.greyBackground]}
          onPress={() => {
            handleCloseSheet();
          }}
          entering={FadeIn}
          exiting={FadeOut}
        ></AnimatedPressable>
      )}
      <BottomSheet
        ref={bottomSheetref}
        snapPoints={snapPoint}
        onClose={() => {
          setIsOpen(false);
        }}
        enablePanDownToClose={true}
        index={-1}
      >
        <View>
          <View style={styles.hotlineInfoContainer}>
            <View style={styles.hotlineLeft}>
              <Image
                source={require("../Images/Supports/micHotline.png")}
                style={{ width: 55, height: 25 }}
              />
              <View style={styles.hotlineInfoTextContainer}>
                <Text style={styles.hotlineInfoHeader}>Hotline</Text>
                <Text style={styles.hotlineInfoNumber}>1900558891</Text>
              </View>
            </View>
            <Feather name="phone" size={15} color="black" />
          </View>
          <View style={styles.hotlineInfoContainer}>
            <View style={styles.hotlineLeft}>
              <Image
                source={require("../Images/Supports/pviHotline.png")}
                style={{ width: 55, height: 25 }}
              />
              <View style={styles.hotlineInfoTextContainer}>
                <Text style={styles.hotlineInfoHeader}>Hotline</Text>
                <Text style={styles.hotlineInfoNumber}>1900545458</Text>
              </View>
            </View>
            <Feather name="phone" size={15} color="black" />
          </View>
          <View style={styles.hotlineInfoContainer}>
            <View style={styles.hotlineLeft}>
              <Image
                source={require("../Images/Supports/vniHotline.png")}
                style={{ width: 55, height: 25 }}
              />
              <View style={styles.hotlineInfoTextContainer}>
                <Text style={styles.hotlineInfoHeader}>Hotline</Text>
                <Text style={styles.hotlineInfoNumber}>0937393955</Text>
              </View>
            </View>
            <Feather name="phone" size={15} color="black" />
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },

  background: {
    backgroundColor: "rgba(223,245,232,255)",
    height: 180 + StatusBar.currentHeight,
    width: windowWidth,
    position: "absolute",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  image: {
    height: 150,
    width: 310,
    objectFit: "contain",
    position: "absolute",
    top: 40,
    left: 30,
  },

  contactContainer: {
    marginTop: StatusBar.currentHeight + 150,
    backgroundColor: "white",
    marginHorizontal: 15,
    elevation: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 10,
  },

  contactText: {
    fontSize: 16.5,
  },

  contactButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(95,207,133,255)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    width: windowWidth / 2 - 35,
  },

  contactButtonText: {
    fontSize: 13,
    color: "rgba(95,207,133,255)",
    marginLeft: 6,
    fontWeight: "500",
  },

  contactButtonContainer: {
    flexDirection: "row",
  },

  hotlineHeader: {
    fontSize: 17,
    fontWeight: "500",
  },

  hotlineContainer: {
    marginTop: 30,
    marginLeft: 15,
  },

  hotlineImage: {
    height: 40,
    width: 90,
  },

  hotlineButton: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    paddingTop: 23,
    paddingBottom: 27,
    width: windowWidth / 3 - 15,
    justifyContent: "center",
    alignItems: "center",
  },

  hotlineButtonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  greyBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  hotlineInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgrey",
    marginHorizontal: 15,
    paddingBottom: 10,
    marginTop: 15,
  },

  hotlineLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  hotlineInfoHeader: {
    fontSize: 10,
    color: "rgba(111,111,111,255)",
    marginBottom: 4,
  },

  hotlineInfoNumber: {
    color: "rgba(111,111,111,255)",
    fontSize: 16,
    fontWeight: "500",
  },

  hotlineInfoTextContainer: {
    marginLeft: 7,
  },

  guideContainer: {
    marginTop: 25,
  },

  guideHeader: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 15,
  },

  guideImage: {
    height: 200,
    width: windowWidth - 70,
    objectFit: "contain",
    borderRadius: 10,
  },

  infoContainer: {
    marginTop: 30,
    backgroundColor: "rgba(246,246,246,255)",
    paddingTop: 20,
    paddingBottom: 90,
  },

  infoHeader: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 15,
  },

  infoItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    marginTop: 25,
  },

  infoItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  infoItemText: {
    fontSize: 16,
    fontWeight: "500",
    width: 90,
    textAlign: "center",
    marginTop: 6,
  },

  version: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 60,
  },
});

export default Support;
