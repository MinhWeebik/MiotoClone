import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MyCarRender from "../MainMenu/CarRender";
import { LocationContext } from "./LocationProvider";
import { StartConext } from "./StartProvider";
import { EndContext } from "./EndProvider";
import { DriverTypeContext } from "./DriverTypeProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  WINDOW_WIDTH,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import MapView from "react-native-maps";
import { SpecificLocationContext } from "./SpecificLocationProvider";
import { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

const DATA = [
  {
    id: 1,
    icon: <Feather name="repeat" size={15} color="black" />,
  },
  {
    id: 2,
    icon: <Ionicons name="car-sport-outline" size={19} color="black" />,
    name: "Loại xe",
  },
  {
    id: 3,
    icon: <Ionicons name="car-sport-outline" size={19} color="black" />,
    name: "Hãng xe",
  },
  {
    id: 4,
    icon: <Ionicons name="ios-medal-outline" size={19} color="black" />,
    name: "Chủ xe 5 sao",
  },
  {
    id: 5,
    icon: (
      <MaterialCommunityIcons name="lightning-bolt" size={19} color="black" />
    ),
    name: "Đặt xe nhanh",
  },
  {
    id: 6,
    icon: <MaterialCommunityIcons name="cash-lock" size={19} color="black" />,
    name: "Miễn thế chấp",
  },
  {
    id: 7,
    icon: <MaterialCommunityIcons name="map-marker" size={19} color="black" />,
    name: "Giao xe tận nơi",
  },
];

const windowWidth = Dimensions.get("window").width;

const SearchForCar = ({ navigation }) => {
  const [carData2, setCarData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://6545fba5fe036a2fa9550bdf.mockapi.io/api/CarData")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsLoading(false);
        setCarData2(data);
      });
  }, []);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const [checked, setChecked] = React.useState("Tối ưu");
  let { specificLocation, setSpecificLocation } = useContext(LocationContext);
  let { startDay, setStartDay } = useContext(StartConext);
  let { endDay, setEndDay } = useContext(EndContext);
  const [toggleMap, setToggleMap] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [fuelType, setFuelType] = useState("Tất cả");
  let { latAndLon, setLatAndLon } = useContext(SpecificLocationContext);
  const sheetRef = useRef(null);
  const [all, setAll] = useState("first");
  const [isOpen, setIsOpen] = useState(false);
  const snapPoint = ["55%"];
  const mapRef = useRef(null);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  const filterSheetRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterSnapPoint = ["80%"];
  const handleFilterSnapPress = useCallback((index) => {
    filterSheetRef.current?.snapToIndex(index);
    setIsFilterOpen(true);
  }, []);

  const handleFilterCloseSheet = useCallback(() => {
    filterSheetRef.current?.close();
    setIsFilterOpen(false);
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
    return 5;
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

  const Item = ({ icon, name, index }) => {
    return (
      <Pressable
        style={[
          styles.quickFilterItemContainer,
          {
            marginLeft: isFirstItem(index),
            marginRight: isLastItem(index),
            width: name === undefined && 35,
            height: name === undefined && 35,
          },
        ]}
      >
        {icon}
        <Text
          style={[
            styles.quickFilterItemLabel,
            { marginLeft: name === undefined ? 0 : 10 },
          ]}
        >
          {name}
        </Text>
      </Pressable>
    );
  };

  const MapMarkerWithoutDriver = () => {
    return (
      carData2 !== undefined &&
      carData2.map((item, index) => {
        return (
          <Marker
            coordinate={{
              latitude: item.lan,
              longitude: item.lon,
            }}
            pinColor="rgba(95,207,133,255)"
            key={item.id}
          >
            <Callout>
              <Text>{item.carName}</Text>
              <Text style={{ textAlign: "center" }}>{item.price}K</Text>
            </Callout>
          </Marker>
        );
      })
    );
  };

  const greyBackGround = useMemo(() => {
    return (
      <AnimatedPressable
        style={[styles.greyBackground]}
        onPress={() => {
          handleFilterCloseSheet();
        }}
        entering={FadeIn}
        exiting={FadeOut}
      ></AnimatedPressable>
    );
  }, []);

  const MapSection = useMemo(() => {
    return (
      <MapView
        provider="google"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        initialRegion={{
          latitude: latAndLon.coords.latitude,
          longitude: latAndLon.coords.longitude,
          latitudeDelta: 0.0012451,
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          coordinate={{
            latitude: latAndLon.coords.latitude,
            longitude: latAndLon.coords.longitude,
          }}
        />
        <MapMarkerWithoutDriver />
      </MapView>
    );
  }, [carData2]);

  // const sortedData = () => {
  //   if (hasDriver) {
  //     if (checked === "Tối ưu") return carWithDriverData;
  //     else if (checked === "Giá thấp nhất")
  //       return carWithDriverData.sort((a, b) => a.price - b.price);
  //     else if (checked === "Giá cao nhất")
  //       return carWithDriverData.sort((a, b) => b.price - a.price);
  //     else if (checked === "Đánh giá tốt nhất")
  //       return carWithDriverData.sort((a, b) => b.star - a.star);
  //     else if (checked === "Khoảng cách gần nhất") return carWithDriverData;
  //   } else if (!hasDriver) {
  //     if (checked === "Tối ưu") return carData;
  //     else if (checked === "Giá thấp nhất")
  //       return carData.sort((a, b) => a.price - b.price);
  //     else if (checked === "Giá cao nhất")
  //       return carData.sort((a, b) => b.price - a.price);
  //     else if (checked === "Đánh giá tốt nhất")
  //       return carData.sort((a, b) => b.star - a.star);
  //     else if (checked === "Khoảng cách gần nhất") return carData;
  //   }
  //   // carData.sort((a, b) => a.price - b.price)
  // };

  const CarsSection = useMemo(() => {
    return (
      <AnimatedScrollView>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <Item icon={item.icon} name={item.name} index={index} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 15 }}
        />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color="rgba(95,207,133,255)" />
          </View>
        ) : (
          <View>
            <FlatList
              data={carData2}
              renderItem={({ item }) => (
                <MyCarRender
                  image={item.image[0].imageLink}
                  carName={item.carName}
                  location={item.location}
                  star={item.star}
                  rentCount={item.rentCount}
                  price={item.price}
                  transmissionType={item.transmissionType}
                  fastBooking={item.fastBooking}
                  mortgage={item.mortgage}
                  deliver={item.deliver}
                  navigation={navigation}
                  id={item.id}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              style={{ marginLeft: 15, marginTop: 20, marginBottom: 70 }}
            />
          </View>
        )}
      </AnimatedScrollView>
    );
  }, [checked, carData2, isLoading]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={[styles.backButtonContainer]}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="angle-left" size={18} color="black" />
        </Pressable>
        <Pressable
          style={styles.headerItemContainer}
          onPress={() => {
            handleSnapPress(0);
          }}
        >
          <View>
            <Text style={styles.location} numberOfLines={1}>
              {locationString()}
            </Text>
            <Text style={styles.rentTime}>{`${startDay} - ${endDay}`}</Text>
          </View>
          <View>
            <Entypo name="magnifying-glass" size={28} color="black" />
          </View>
        </Pressable>
      </View>
      {toggleMap ? MapSection : CarsSection}
      <View style={styles.footerItemsContainer}>
        <Pressable
          style={styles.footerItemContainer}
          onPress={() => {
            handleFilterSnapPress(0);
          }}
        >
          <Ionicons name="filter" size={20} color="black" />
          <Text style={styles.footerItemText}>Bộ lọc</Text>
        </Pressable>
        <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "300" }}>
          |
        </Text>
        <Pressable
          style={styles.footerItemContainer}
          onPress={() => {
            setToggleMap(!toggleMap);
          }}
        >
          {toggleMap ? (
            <MaterialIcons name="category" size={20} color="black" />
          ) : (
            <FontAwesome5 name="globe-asia" size={20} color="black" />
          )}
          <Text style={styles.footerItemText}>
            {toggleMap ? "Danh sách" : "Bản đồ"}
          </Text>
        </Pressable>
      </View>
      {isOpen ? (
        <AnimatedPressable
          style={[styles.greyBackground]}
          onPress={() => {
            handleCloseSheet();
          }}
          entering={FadeIn}
          exiting={FadeOut}
        ></AnimatedPressable>
      ) : (
        isFilterOpen && greyBackGround
      )}
      <BottomSheet
        snapPoints={snapPoint}
        ref={sheetRef}
        onClose={() => {
          setIsOpen(false);
        }}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetScrollView>
          <Pressable
            style={styles.changeContainer}
            onPress={() => {
              navigation.navigate("SelectLocationNoDriver");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <EvilIcons name="location" size={30} color="grey" />
              <Text style={styles.changeHeader}>Địa điểm</Text>
            </View>
            <Text style={styles.changeText}>{locationString()}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.changeContainer,
              { borderBottomWidth: 0, marginTop: 15 },
            ]}
            onPress={() => {
              navigation.navigate("SelectDateOne");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="calendar" size={30} color="grey" />
              <Text style={styles.changeHeader}>Thời gian thuê</Text>
            </View>
            <Text
              style={[styles.changeText, { fontSize: 14 }]}
            >{`${startDay} - ${endDay}`}</Text>
          </Pressable>
        </BottomSheetScrollView>
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerRentDay}>
              Số ngày thuê: {getAmountOfDate()} ngày
            </Text>
          </View>
          <View>
            <Pressable
              style={styles.rentButton}
              onPress={() => handleCloseSheet()}
            >
              <Text style={styles.rentButtonText}>Xác nhận</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        snapPoints={filterSnapPoint}
        ref={filterSheetRef}
        onClose={() => {
          setIsFilterOpen(false);
        }}
        index={-1}
      >
        <View style={styles.filterHeaderContainer}>
          <Text style={styles.filterHeader}>Bộ lọc</Text>
          <Pressable
            style={styles.filterResetButton}
            onPress={() => {
              setChecked("Tối ưu");
              setAll("first");
              setInsurance(false);
              setFuelType("Tất cả");
            }}
          >
            <Text style={styles.filterResetText}>Đặt lại</Text>
          </Pressable>
        </View>
        <BottomSheetScrollView>
          <View style={styles.filterItemContainer}>
            <View style={styles.filterItemHeaderContainer}>
              <Text style={styles.filterItemHeader}>Sắp xếp theo: </Text>
              <Text style={styles.filterItemHeaderOption}>{checked}</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={checked === "Tối ưu" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("Tối ưu");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Tối ưu</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={
                  checked === "Khoảng cách gần nhất" ? "checked" : "unchecked"
                }
                onPress={() => {
                  setChecked("Khoảng cách gần nhất");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Khoảng cách gần nhất</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={checked === "Giá thấp nhất" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("Giá thấp nhất");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Giá thấp nhất</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={checked === "Giá cao nhất" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("Giá cao nhất");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Giá cao nhất</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={
                  checked === "Đánh giá tốt nhất" ? "checked" : "unchecked"
                }
                onPress={() => {
                  setChecked("Đánh giá tốt nhất");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Đánh giá tốt nhất</Text>
            </View>
          </View>
          <View style={styles.filterItemContainer}>
            <Text style={[styles.filterItemHeaderOption, { marginBottom: 10 }]}>
              Truyền động
            </Text>
            <View style={styles.optionContainer}>
              <Checkbox
                status={all === "first" ? "checked" : "unchecked"}
                onPress={() => {
                  setAll("first");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Tất cả</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={all === "second" ? "checked" : "unchecked"}
                onPress={() => {
                  setAll("second");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Số tự động</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={all === "third" ? "checked" : "unchecked"}
                onPress={() => {
                  setAll("third");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Số sàn</Text>
            </View>
          </View>
          <View style={styles.filterItemContainer}>
            <Text style={[styles.filterItemHeaderOption, { marginBottom: 10 }]}>
              Tiêu chí
            </Text>
            <View style={styles.optionContainer}>
              <Checkbox
                status={insurance ? "checked" : "unchecked"}
                onPress={() => {
                  setInsurance(!insurance);
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Bảo hiểm thuê xe</Text>
            </View>
          </View>
          <View style={styles.filterItemContainer}>
            <Text style={[styles.filterItemHeaderOption, { marginBottom: 10 }]}>
              Loại nhiên liệu
            </Text>
            <View style={styles.optionContainer}>
              <Checkbox
                status={fuelType === "Tất cả" ? "checked" : "unchecked"}
                onPress={() => {
                  setFuelType("Tất cả");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Tất cả</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={fuelType === "Xăng" ? "checked" : "unchecked"}
                onPress={() => {
                  setFuelType("Xăng");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Xăng</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={fuelType === "Dầu Diesel" ? "checked" : "unchecked"}
                onPress={() => {
                  setFuelType("Dầu Diesel");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Dầu Diesel</Text>
            </View>
            <View style={styles.optionContainer}>
              <Checkbox
                status={fuelType === "Điện" ? "checked" : "unchecked"}
                onPress={() => {
                  setFuelType("Điện");
                }}
                color="rgba(95,207,133,255)"
              />
              <Text style={styles.optionText}>Điện</Text>
            </View>
          </View>
        </BottomSheetScrollView>
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerRentDay}>200+ xe</Text>
          </View>
          <View>
            <Pressable
              style={styles.rentButton}
              onPress={() => handleFilterCloseSheet()}
            >
              <Text style={styles.rentButtonText}>Xác nhận</Text>
            </Pressable>
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
  },

  headerContainer: {
    width: windowWidth,
    backgroundColor: "white",
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgrey",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
  },

  backButtonContainer: {
    width: 40,
    padding: 9,
    position: "absolute",
    borderRadius: 500,
    top: StatusBar.currentHeight + 5,
    justifyContent: "center",
    alignItems: "center",
    left: 15,
    backgroundColor: "white",
    borderWidth: 0.7,
    borderColor: "lightgrey",
  },

  headerItemContainer: {
    backgroundColor: "rgba(246,246,246,255)",
    marginLeft: 70,
    marginRight: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },

  location: {
    fontSize: 16,
    fontWeight: "500",
    width: windowWidth - 140,
    textAlign: "center",
  },

  rentTime: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 3,
  },

  quickFilterItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "lightgrey",
    borderRadius: 100,
    paddingVertical: 7,
    alignSelf: "baseline",
    paddingHorizontal: 10,
  },

  quickFilterItemLabel: {
    fontSize: 15,
    fontWeight: "500",
  },

  footerItemsContainer: {
    flexDirection: "row",
    paddingVertical: 3,
    position: "absolute",
    bottom: 20,
    justifyContent: "space-between",
    backgroundColor: "white",
    left: windowWidth / 2 - 120,
    right: windowWidth / 2 - 120,
    borderRadius: 100,
    paddingHorizontal: 25,
    elevation: 5,
  },

  footerItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerItemText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },

  changeContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgrey",
    paddingBottom: 20,
  },

  changeHeader: {
    fontSize: 14,
    color: "grey",
    marginLeft: 5,
  },

  changeText: {
    fontWeight: "500",
    fontSize: 15.5,
    marginHorizontal: 25,
    marginTop: 10,
  },

  greyBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "lightgrey",
    borderTopWidth: 0.7,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 13,
  },

  footerRentDay: {
    fontSize: 13,
    fontWeight: "500",
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

  filterHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgrey",
    paddingBottom: 10,
  },

  filterHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },

  filterResetButton: {
    position: "absolute",
    right: 15,
    bottom: 10,
  },

  filterResetText: {
    color: "red",
    fontSize: 16,
  },

  filterItemContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
    marginHorizontal: 15,
    paddingVertical: 15,
  },

  filterItemHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  filterItemHeader: {
    fontSize: 15,
    color: "grey",
  },

  filterItemHeaderOption: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 3,
  },

  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    fontSize: 17,
  },

  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: WINDOW_WIDTH - 100,
  },
});

export default SearchForCar;
