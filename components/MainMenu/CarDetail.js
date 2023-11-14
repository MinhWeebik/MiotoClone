import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import { StartConext } from "./StartProvider";
import { EndContext } from "./EndProvider";
import { useRoute } from "@react-navigation/native";
import { DriverTypeContext } from "./DriverTypeProvider";
import { EvilIcons } from "@expo/vector-icons";
import { LocationContext } from "./LocationProvider";
import { ArriveLocationContext } from "./ArriveLocationProvider";
import Images from "../JSON/Images";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import MapView from "react-native-maps";
import { Circle } from "react-native-maps";
const windowWidth = Dimensions.get("window").width;

const CarDetail = ({ navigation }) => {
  const [carData2, setCarData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const AnimatedView = Animated.createAnimatedComponent(View);
  useEffect(() => {
    fetch("https://6545fba5fe036a2fa9550bdf.mockapi.io/api/CarData/" + idValue)
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
  const route = useRoute();
  const mapRef = useRef(null);
  const idValue = route.params?.id;
  const [specificCarData, setSpecificCarData] = useState();
  const [index, setIndex] = useState(0);
  let { startDay, setStartDay } = useContext(StartConext);
  let { endDay, setEndDay } = useContext(EndContext);
  let { hasDriver, setDriver } = useContext(DriverTypeContext);
  const [journyType, setJournyType] = useState(1);
  const [isOverPicture, setIsOverPicture] = useState(false);
  let { specificLocation, setSpecificLocation } = useContext(LocationContext);
  let { specificArriveLocation, setSpecificArriveLocation } = useContext(
    ArriveLocationContext
  );
  const locationString = (location2) => {
    if (location2 === null || location2 === undefined) {
      return;
    } else {
      let location =
        (location2.address.road !== undefined
          ? location2.address.road + ", "
          : "") +
        (location2.address.hamlet !== undefined
          ? location2.address.hamlet + ", "
          : "") +
        (location2.address.village !== undefined
          ? location2.address.village + ", "
          : "") +
        (location2.address.city_district !== undefined
          ? location2.address.city_district + ", "
          : "") +
        (location2.address.city !== undefined ? location2.address.city : "");
      return location;
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / windowWidth);
    setIndex(currentIndex);
  };

  const handleScrollY = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition >= 245) {
      if (isOverPicture === false) {
        setIsOverPicture(true);
      }
    } else {
      if (isOverPicture === true) {
        setIsOverPicture(false);
      }
    }
  };

  const cutDayAndTime = (day) => {
    let dayTimeArray = day.split(", ");
    return dayTimeArray;
  };

  const getAmountOfDate = () => {
    let count = 0;
    const start = new Date(cutDayAndTime(startDay)[1]);
    const end = new Date(cutDayAndTime(endDay)[1]);
    while (start <= end) {
      count++;
      start.setDate(start.getDate() + 1);
    }
    return count;
  };

  useEffect(() => {
    setSpecificCarData(
      // hasDriver === false ? carData[idValue] : carWithDriverData[idValue]
      carData2 !== undefined && carData2
    );
  }, [carData2]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <AnimatedView style={styles.loadingContainer} exiting={FadeOut}>
          <ActivityIndicator size={"large"} color="rgba(95,207,133,255)" />
        </AnimatedView>
      ) : (
        <View style={styles.container}>
          <View
            style={
              isOverPicture
                ? {
                    position: "absolute",
                    zIndex: 20,
                    height: StatusBar.currentHeight + 50,
                    width: windowWidth,
                    backgroundColor: "white",
                    borderBottomWidth: 0.7,
                    borderBottomColor: "lightgrey",
                  }
                : { position: "absolute", zIndex: 20 }
            }
          >
            {isOverPicture && (
              <Text style={styles.carNameHeader} numberOfLines={1}>
                {specificCarData.carName}
              </Text>
            )}
            <Pressable
              style={[
                styles.backButtonContainer,
                {
                  left: 15,
                  backgroundColor: isOverPicture ? "white" : "rgba(0,0,0,0.5)",
                  borderWidth: isOverPicture ? 0.7 : 0,
                  borderColor: "lightgrey",
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5
                name="angle-left"
                size={18}
                color={isOverPicture === true ? "black" : "white"}
              />
            </Pressable>
            <Pressable
              style={[
                styles.backButtonContainer,
                {
                  left: windowWidth - 55,
                  backgroundColor: isOverPicture ? "white" : "rgba(0,0,0,0.5)",
                  borderWidth: isOverPicture ? 0.7 : 0,
                  borderColor: "lightgrey",
                },
              ]}
            >
              <Ionicons
                name="heart-outline"
                size={18}
                color={isOverPicture === true ? "black" : "white"}
              />
            </Pressable>
            <Pressable
              style={[
                styles.backButtonContainer,
                {
                  left: windowWidth - 100,
                  backgroundColor: isOverPicture ? "white" : "rgba(0,0,0,0.5)",
                  borderWidth: isOverPicture ? 0.7 : 0,
                  borderColor: "lightgrey",
                },
              ]}
            >
              <AntDesign
                name="sharealt"
                size={18}
                color={isOverPicture === true ? "black" : "white"}
              />
            </Pressable>
          </View>
          <ScrollView onScroll={handleScrollY}>
            {carData2 !== undefined && (
              <View>
                <FlatList
                  data={carData2.image}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={Images[item.imageLink]}
                        style={styles.carImage}
                      />
                    </View>
                  )}
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                />
                <View style={styles.imageCounterContainer}>
                  <Text style={styles.imageCounterText}>{`${index + 1}/${
                    carData2.image.length
                  }`}</Text>
                </View>
              </View>
            )}
            <View style={styles.carNameContainer}>
              <Text style={styles.carName}>{specificCarData.carName}</Text>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={18}
                color="rgba(95,207,133,255)"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
                marginTop: 10,
              }}
            >
              <AntDesign name="star" size={15} color="rgba(254,198,51,255)" />
              <Text style={styles.star}>{specificCarData.star}</Text>
              <MaterialIcons
                name="luggage"
                size={15}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.rentCount}>{specificCarData.rentCount}</Text>
            </View>
            {hasDriver === false ? (
              <View style={styles.rentInfoContainer}>
                <Text style={styles.rentInfoHeader}>Thời gian thuê xe</Text>
                <View style={styles.rentInfoItemContainer}>
                  <View>
                    <Text style={styles.rentInfoTimeHeader}>Nhận xe</Text>
                    <Text style={styles.rentInfoTime}>{startDay}</Text>
                  </View>
                  <View>
                    <Text style={styles.rentInfoTimeHeader}>Trả xe</Text>
                    <Text style={styles.rentInfoTime}>{endDay}</Text>
                  </View>
                </View>
                <Text style={[styles.rentInfoHeader, { marginTop: 13 }]}>
                  Địa điểm giao nhận xe
                </Text>
                <View
                  style={[
                    styles.rentInfoItemContainer,
                    {
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingTop: 6,
                      paddingLeft: 2,
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioButton
                        status="checked"
                        color="rgba(95,207,133,255)"
                      />
                      <Text style={styles.noDeliverHeader}>
                        Tôi tự đến lấy xe
                      </Text>
                    </View>
                    <Text style={styles.free}>Miễn phí</Text>
                  </View>
                  <View>
                    <Text style={styles.noDeliverLocation}>
                      Địa chỉ xe - {specificCarData.location}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rentInfoItemContainer,
                    {
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingTop: 6,
                      paddingLeft: 2,
                      marginTop: 7,
                      backgroundColor: "rgba(232,232,232,255)",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioButton
                        disabled={true}
                        color="rgba(95,207,133,255)"
                      />
                      <Text
                        style={[
                          styles.noDeliverHeader,
                          { color: "rgba(120,120,120,255)" },
                        ]}
                      >
                        Tôi muốn được giao xe tận nơi
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.yesDeliver}>
                      Chủ xe không hỗ trợ giao xe tận nơi
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.rentInfoContainer}>
                <RadioButton.Group
                  onValueChange={(newValue) => {
                    setJournyType(newValue);
                  }}
                  value={journyType}
                >
                  <View style={styles.journyTypeButtonContainer}>
                    <RadioButton
                      value={1}
                      color="rgba(95,207,133,255)"
                      uncheckedColor="grey"
                    />
                    <Text style={styles.journyTypeText}>Liên tỉnh</Text>
                    <RadioButton
                      value={2}
                      color="rgba(95,207,133,255)"
                      uncheckedColor="grey"
                    />
                    <Text style={styles.journyTypeText}>
                      Liên tỉnh (1 chiều)
                    </Text>
                    <RadioButton
                      value={3}
                      color="rgba(95,207,133,255)"
                      uncheckedColor="grey"
                    />
                    <Text style={styles.journyTypeText}>Nội thành</Text>
                  </View>
                </RadioButton.Group>
                <Text style={styles.rentInfoHeader}>Lộ trình</Text>
                <View
                  style={[
                    styles.rentInfoItemContainer,
                    { flexDirection: "column", marginBottom: 10 },
                  ]}
                >
                  {journyType === 3 ? (
                    <Pressable
                      style={styles.locationInput2}
                      onPress={() =>
                        navigation.navigate("SelectLocationNoDriver")
                      }
                    >
                      <MaterialCommunityIcons
                        name="map-marker-account-outline"
                        size={20}
                        color="grey"
                      />
                      <Text style={styles.locationInputText2} numberOfLines={1}>
                        {specificLocation === null
                          ? "Nhập điểm đón"
                          : locationString(specificLocation)}
                      </Text>
                    </Pressable>
                  ) : (
                    <View>
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
                          navigation.navigate("SelectLocationNoDriver")
                        }
                      >
                        <Text
                          style={styles.locationInputText}
                          numberOfLines={1}
                        >
                          {specificLocation === null
                            ? "Nhập điểm đón"
                            : locationString(specificLocation)}
                        </Text>
                      </Pressable>
                      <View
                        style={[
                          styles.locationTextContainer,
                          { marginTop: 10 },
                        ]}
                      >
                        <EvilIcons name="location" size={20} color="grey" />
                        <Text style={styles.locationText}>Điểm đến</Text>
                      </View>
                      <Pressable
                        style={styles.locationInput}
                        onPress={() =>
                          navigation.navigate("SelectLocationNoDriver", {
                            location: "arrive",
                          })
                        }
                      >
                        <Text
                          style={styles.locationInputText}
                          numberOfLines={1}
                        >
                          {specificArriveLocation === null
                            ? "Nhập điểm đến"
                            : locationString(specificArriveLocation)}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
                <Text style={styles.rentInfoHeader}>Thời gian thuê xe</Text>
                <View style={styles.rentInfoItemContainer}>
                  <View>
                    <Text style={styles.rentInfoTimeHeader}>Nhận xe</Text>
                    <Text style={styles.rentInfoTime}>{startDay}</Text>
                  </View>
                  <View>
                    <Text style={styles.rentInfoTimeHeader}>Trả xe</Text>
                    <Text style={styles.rentInfoTime}>{endDay}</Text>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.insuranceContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="shield-alt"
                  size={24}
                  color="rgba(95,207,133,255)"
                />
                <Text style={styles.insuranceHeader}>Bảo hiểm thuê xe MIC</Text>
              </View>
              <Text style={styles.insuranceInfo}>
                Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa
                2.000.000 VNĐ trong trường hợp có sự cố ngoài ý muốn
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.insuranceMore}>Xem thêm</Text>
                <AntDesign name="right" size={12} color="black" />
              </View>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>Đặc điểm</Text>
              <View style={styles.charcateristicItemContainer}>
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="car-shift-pattern"
                    size={24}
                    color="rgba(95,207,133,255)"
                  />
                  <Text style={styles.characteristicHeader}>Truyền động</Text>
                  <Text style={styles.characteristicInfo}>Số tự động</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="car-seat"
                    size={24}
                    color="rgba(95,207,133,255)"
                  />
                  <Text style={styles.characteristicHeader}>Số ghế</Text>
                  <Text style={styles.characteristicInfo}>5 ghế</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="gas-station"
                    size={24}
                    color="rgba(95,207,133,255)"
                  />
                  <Text style={styles.characteristicHeader}>Tiêu hao</Text>
                  <Text style={styles.characteristicInfo}>81/100 km</Text>
                </View>
              </View>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>Mô tả</Text>
              <Text style={styles.insuranceInfo}>
                {specificCarData.description}
              </Text>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>Các tiện nghi trên xe</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                }}
              >
                <View style={styles.featuresContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="bluetooth"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Bluetooth</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Camera lùi</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="tire"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Lốp dự phòng</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="electric-switch"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>ETC</Text>
                  </View>
                </View>
                <View style={styles.featuresContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camcorder"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Camera hành trình</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="usb"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Khe cắm USB</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="monitor"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Màn hình DVD</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="airbag"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.featureText}>Túi khí an toàn</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>Vị trí xe</Text>
              <MapView
                provider="google"
                ref={mapRef}
                style={{ height: 200, width: "100%" }}
                initialRegion={{
                  latitude: specificCarData.lan,
                  longitude: specificCarData.lon,
                  latitudeDelta: 0.0012451,
                  longitudeDelta: 0.03,
                }}
                scrollEnabled={false}
              >
                <Circle
                  center={{
                    latitude: specificCarData.lan,
                    longitude: specificCarData.lon,
                  }}
                  radius={420}
                  fillColor="rgba(0,0,0,0.2)"
                  strokeColor="rgba(136,136,136,255)"
                  strokeWidth={2}
                />
              </MapView>
            </View>
            <View style={styles.ownerContainer}>
              <Text style={styles.rentInfoHeader}>Chủ xe</Text>
              <View style={styles.ownerDetailContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 0.7,
                    borderBottomColor: "lightgrey",
                    paddingBottom: 15,
                  }}
                >
                  {carData2 !== undefined && (
                    <Image
                      source={Images[carData2.image[0].imageLink]}
                      style={styles.pfp}
                    />
                  )}
                  <View
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.ownerName}>Nguyễn Tiến Thành</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        name="star"
                        size={15}
                        color="rgba(254,198,51,255)"
                      />
                      <Text style={styles.star}>{specificCarData.star}</Text>
                      <MaterialIcons
                        name="luggage"
                        size={15}
                        color="rgba(95,207,133,255)"
                      />
                      <Text style={styles.rentCount}>
                        {specificCarData.rentCount}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12,
                    paddingHorizontal: 13,
                  }}
                >
                  <View>
                    <Text style={styles.ownerDetailInfoHeader}>
                      Tỉ lệ phản hồi
                    </Text>
                    <Text style={styles.ownerDetailInfoPercent}>100%</Text>
                  </View>
                  <View>
                    <Text style={styles.ownerDetailInfoHeader}>
                      Tỉ lệ đồng ý
                    </Text>
                    <Text style={styles.ownerDetailInfoPercent}>85%</Text>
                  </View>
                  <View>
                    <Text style={styles.ownerDetailInfoHeader}>
                      Phản hồi trong
                    </Text>
                    <Text style={styles.ownerDetailInfoPercent}>5 phút</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>Đánh giá từ khách thuê</Text>
              <View style={styles.reviewContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.reviewerPfpContainer}>
                    <Ionicons name="person" size={18} color="black" />
                  </View>
                  <View style={styles.reviewerInfoContainer}>
                    <Text style={styles.reviewerName}>Hoàng Tiến Mạnh</Text>
                    <Text style={styles.reviewDate}>24/10/2023</Text>
                  </View>
                </View>
                <View style={styles.reviewStarContainer}>
                  <AntDesign
                    name="star"
                    size={15}
                    color="rgba(254,198,51,255)"
                  />
                  <Text style={styles.reviewStarText}>5.0</Text>
                  <Ionicons name="ellipsis-vertical" size={15} color="black" />
                </View>
              </View>
              <View style={[styles.reviewContainer, { marginTop: 8 }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.reviewerPfpContainer}>
                    <Ionicons name="person" size={18} color="black" />
                  </View>
                  <View style={styles.reviewerInfoContainer}>
                    <Text style={styles.reviewerName}>Lan</Text>
                    <Text style={styles.reviewDate}>02/10/2023</Text>
                  </View>
                </View>
                <View style={styles.reviewStarContainer}>
                  <AntDesign
                    name="star"
                    size={15}
                    color="rgba(254,198,51,255)"
                  />
                  <Text style={styles.reviewStarText}>5.0</Text>
                  <Ionicons name="ellipsis-vertical" size={15} color="black" />
                </View>
              </View>
              <Pressable style={styles.moreReviewButton}>
                <Text style={styles.moreReviewButtonText}>Xem thêm</Text>
              </Pressable>
            </View>
            <View style={styles.characteristicContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.rentInfoHeader,
                    { marginBottom: 0, marginRight: 8 },
                  ]}
                >
                  Giấy tờ thuê xe
                </Text>
                <AntDesign name="questioncircleo" size={15} color="grey" />
              </View>
              <Text style={styles.paperWorkHeader}>
                Chọn 1 trong 2 hình thức
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <AntDesign name="idcard" size={20} color="black" />
                <Text style={styles.paperWorkItem}>
                  GPLX & CCCD gắn chíp (đối chiếu)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Fontisto name="passport-alt" size={20} color="black" />
                <Text style={styles.paperWorkItem}>
                  GPLX (đối chiếu) & Passport (giữ lại)
                </Text>
              </View>
            </View>
            <View style={styles.characteristicContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.rentInfoHeader,
                    { marginBottom: 0, marginRight: 8 },
                  ]}
                >
                  Tài sản thế chấp
                </Text>
                <AntDesign name="questioncircleo" size={15} color="grey" />
              </View>
              <Text style={styles.insuranceInfo}>
                15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe
                máy (kèm cả vẹt gốc) giá trị 15 triệu
              </Text>
              <Text style={[styles.rentInfoHeader, { marginTop: 20 }]}>
                Điều khoản
              </Text>
              <Text style={styles.insuranceInfo}>
                {
                  "Quy định khác:\n - Sử dụng xe đúng mục đích.\n - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.\n - Không sử dụng xe thuê để cắm cổ, thế chấp.\n - Không hút thuốc, nhả kẹo cao su, xả rác trong xe."
                }
              </Text>
            </View>
            <View style={styles.characteristicContainer}>
              <Text style={styles.rentInfoHeader}>
                Phụ phí có thể phát sinh
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.extraChargeHeader}>Phí vượt giới hạn</Text>
                <Text style={styles.extraChargeHeader}>2 000 đ/km</Text>
              </View>
              <Text style={styles.extraChargeInfo}>
                Phụ phí phát sinh nếu di chuyển vượt quá 300km khi thuê xe 1
                ngày
              </Text>
              <Text style={[styles.extraChargeHeader, { marginTop: 15 }]}>
                Phụ phí khác
              </Text>
              <Text style={styles.extraChargeInfo}>
                Phụ phí phát sinh nếu trả xe trễ, xe không đảm bảo vệ sinh hoặc
                bị ám mùi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text style={styles.insuranceMore}>Xem thêm</Text>
                <AntDesign name="right" size={12} color="black" />
              </View>
              <Text style={[styles.rentInfoHeader, { marginTop: 20 }]}>
                Chính sách hủy chuyến
              </Text>
              <Text style={styles.insuranceInfo}>
                Miễn phí hủy chuyến trong vòng 1 giờ sau khi đặt cọc
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={styles.insuranceMore}>Xem thêm</Text>
                <AntDesign name="right" size={12} color="black" />
              </View>
            </View>
            <View style={styles.reportContainer}>
              <AntDesign name="flag" size={23} color="black" />
              <Text style={styles.reportText}>Báo cáo xe</Text>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View>
              <Text style={styles.footerRentDay}>
                Số ngày thuê: {getAmountOfDate()} ngày
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.footerPrice}>{specificCarData.price}K</Text>
                <AntDesign name="questioncircleo" size={15} color="grey" />
              </View>
            </View>
            <View>
              <Pressable style={styles.rentButton}>
                <Text style={styles.rentButtonText}>Chọn thuê</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },

  carImage: {
    width: windowWidth,
    height: 245,
  },

  imageCounterContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },

  imageCounterText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
  },

  backButtonContainer: {
    width: 40,
    padding: 9,
    position: "absolute",
    borderRadius: 500,
    top: StatusBar.currentHeight + 2,
    justifyContent: "center",
    alignItems: "center",
  },

  carName: {
    fontWeight: "500",
    fontSize: 20,
    marginRight: 5,
  },

  carNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 15,
  },

  star: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 6,
  },

  rentCount: {
    fontSize: 12,
  },

  rentInfoContainer: {
    backgroundColor: "rgba(246,246,246,255)",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 13,
  },

  rentInfoHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  rentInfoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 0.7,
    borderColor: "lightgrey",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },

  rentInfoTimeHeader: {
    color: "rgba(123,123,123,255)",
  },

  rentInfoTime: {
    fontWeight: "500",
    fontSize: 15,
    marginTop: 6,
  },

  noDeliverHeader: {
    fontSize: 14.5,
  },

  free: {
    color: "rgba(95,207,133,255)",
    fontWeight: "bold",
    fontSize: 15,
  },

  noDeliverLocation: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },

  yesDeliver: {
    fontSize: 12,
    marginLeft: 35,
    color: "rgba(120,120,120,255)",
  },

  insuranceContainer: {
    marginHorizontal: 15,
    marginTop: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.7,
    paddingBottom: 22,
  },

  insuranceHeader: {
    color: "rgba(95,207,133,255)",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },

  insuranceInfo: {
    marginTop: 7,
    marginBottom: 5,
  },

  insuranceMore: {
    fontSize: 13,
    fontWeight: "500",
    textDecorationLine: "underline",
    marginRight: 7,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "lightgrey",
    borderTopWidth: 0.7,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 13,
  },

  footerRentDay: {
    fontSize: 13,
  },

  footerPrice: {
    color: "rgba(95,207,133,255)",
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 20,
    marginRight: 6,
  },

  rentButton: {
    backgroundColor: "rgba(95,207,133,255)",
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 6,
  },

  rentButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },

  characteristicContainer: {
    marginHorizontal: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.7,
    marginTop: 20,
    paddingBottom: 22,
  },

  characteristicHeader: {
    fontSize: 12,
    color: "grey",
    marginTop: 7,
    marginBottom: 4,
  },

  characteristicInfo: {
    fontWeight: "bold",
    fontSize: 15,
  },

  charcateristicItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 20,
  },

  featureText: {
    marginLeft: 8,
  },

  pfp: {
    height: 52,
    width: 52,
    borderRadius: 100,
  },

  ownerContainer: {
    backgroundColor: "rgba(246,246,246,255)",
    marginTop: 30,
    paddingHorizontal: 15,
    paddingTop: 22,
    paddingBottom: 15,
  },
  ownerDetailContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },

  ownerName: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 6,
  },

  ownerDetailInfoHeader: {
    fontSize: 12,
    textAlign: "center",
  },

  ownerDetailInfoPercent: {
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },

  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.7,
    borderColor: "lightgrey",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 25,
  },

  reviewStarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviewerPfpContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },

  reviewerInfoContainer: {
    marginLeft: 10,
  },

  reviewerName: {
    fontWeight: "500",
  },

  reviewDate: {
    fontSize: 12,
    marginTop: 2,
  },

  reviewStarText: {
    fontWeight: "bold",
    marginLeft: 5,
  },

  moreReviewButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  moreReviewButtonText: {
    fontSize: 17,
    fontWeight: "500",
  },

  paperWorkHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },

  paperWorkItem: {
    fontSize: 13,
    marginLeft: 15,
  },

  extraChargeHeader: {
    fontWeight: "500",
  },

  extraChargeInfo: {
    fontSize: 13,
  },

  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 25,
  },

  reportText: {
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
    marginLeft: 10,
  },

  journyTypeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  journyTypeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "grey",
  },

  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingLeft: 10,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    marginTop: 5,
    paddingBottom: 9,
  },

  locationInputText2: {
    fontSize: 14,
    color: "rgba(103,103,103,255)",
    fontWeight: "500",
    marginLeft: 7,
    marginRight: 20,
  },

  locationInput2: {
    flexDirection: "row",
  },

  carNameHeader: {
    fontSize: 20,
    fontWeight: "500",
    position: "absolute",
    top: StatusBar.currentHeight + 6,
    left: 65,
    width: windowWidth - 180,
  },

  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CarDetail;
