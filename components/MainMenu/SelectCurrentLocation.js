import React, {
  cloneElement,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { LocationContext } from "./LocationProvider";
import { useRoute } from "@react-navigation/native";
import { ArriveLocationContext } from "./ArriveLocationProvider";
import { SpecificLocationContext } from "./SpecificLocationProvider";

const DATA = [
  {
    id: 1,
    name: "Tân Sơn Nhất",
    width: 140,
    lan: 10.926704962666799,
    lon: 106.65618042238013,
  },
  {
    id: 2,
    name: "Nội bài",
    width: 100,
    lan: 21.21781479263617,
    lon: 105.7929593165358,
  },
  {
    id: 3,
    name: "Đà nẵng",
    width: 105,
    lan: 16.05563656657166,
    lon: 108.20231628673633,
  },
  {
    id: 4,
    name: "Cam Ranh",
    width: 120,
    lan: 11.998591376396524,
    lon: 109.21901165061068,
  },
  {
    id: 5,
    name: "Phú Quốc",
    width: 115,
    lan: 10.165271807441103,
    lon: 103.99816037043121,
  },
  {
    id: 6,
    name: "Liên Khương",
    width: 135,
    lan: 11.751891895890063,
    lon: 108.36812244639194,
  },
];

const MySelectCurrentLocation = ({ navigation }) => {
  const route = useRoute();
  const locationType = route.params?.location;
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const numColumns = Math.ceil(DATA.length / 3);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fullURL, setFullURL] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  let { specificLocation, setSpecificLocation } = useContext(LocationContext);
  let { specificArriveLocation, setSpecificArriveLocation } = useContext(
    ArriveLocationContext
  );
  let { latAndLon, setLatAndLon } = useContext(SpecificLocationContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (
      fullURL !== null &&
      errorMsg !== "Permission to access location was denied"
    ) {
      fetch(fullURL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (locationType === "arrive") {
            setSpecificArriveLocation(data);
          } else {
            setSpecificLocation(data);
            setLatAndLon(location);
          }
          setIsLoading(false);
        });
    }
  }, [fullURL]);

  useEffect(() => {
    if (isLoading === false) {
      navigation.goBack();
    }
  }, [isLoading]);

  const Item = ({ name, width, lan, lon }) => {
    return (
      <Pressable
        style={[styles.airPortItemContainer, { width: width }]}
        onPress={() => {
          setFullURL(`https://geocode.maps.co/reverse?lat=${lan}&lon=${lon}`);
          setIsLoading(true);
        }}
      >
        <MaterialCommunityIcons name="airplane" size={22} color="black" />
        <Text style={styles.airPortName}>{name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="angle-left" size={18} color="black" />
        </Pressable>
        <Text style={styles.header}>Địa điểm</Text>
      </View>
      <View>
        <Searchbar
          placeholder="Nhập địa chỉ"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={"map-marker"}
          style={styles.searchBar}
          inputStyle={styles.searchBarText}
        />
        <Pressable
          style={styles.selectCurrentLocationButton}
          onPress={() => {
            setFullURL(
              `https://geocode.maps.co/reverse?lat=${
                location !== null && location.coords.latitude
              }&lon=${location !== null && location.coords.longitude}`
            );
            setIsLoading(true);
          }}
        >
          <MaterialCommunityIcons name="map-marker" size={28} color="black" />
          <Text style={styles.currentLocationText}>Vị trí hiện tại</Text>
        </Pressable>
        <View style={styles.myLocationContainer}>
          <Text style={styles.myLocationLabel}>Địa chỉ của tôi</Text>
          <Pressable style={styles.selectMyLocationButton}>
            <Text style={styles.selectMyLocationText}>Chọn địa chỉ đã lưu</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="grey"
            />
          </Pressable>
        </View>
        <View style={styles.airPortContainer}>
          <Text style={styles.airPortLabel}>Giao xe sân bay</Text>
          <View style={{ marginTop: 15 }}>
            <GestureHandlerRootView>
              <FlatList
                numColumns={numColumns}
                data={DATA}
                renderItem={({ item, index }) => (
                  <Item
                    name={item.name}
                    width={item.width}
                    lan={item.lan}
                    lon={item.lon}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </GestureHandlerRootView>
          </View>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="rgba(95,207,133,255)" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },

  headerContainer: {
    marginTop: 10,
    marginBottom: 15,
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

  backButtonContainer: {
    borderWidth: 1,
    width: 40,
    padding: 9,
    borderRadius: 200,
    paddingLeft: 14,
    borderColor: "lightgrey",
    position: "absolute",
    left: 20,
    bottom: 6,
  },

  searchBar: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },

  searchBarText: {
    fontSize: 17,
  },

  selectCurrentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
    marginRight: 15,
    marginLeft: 15,
    marginTop: 35,
    paddingBottom: 10,
  },

  currentLocationText: {
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 20,
  },

  myLocationContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
  },

  myLocationLabel: {
    fontSize: 15,
    color: "grey",
  },

  selectMyLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 11,
  },

  selectMyLocationText: {
    fontSize: 13,
    color: "grey",
  },

  airPortContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
    paddingBottom: 15,
  },

  airPortLabel: {
    fontSize: 15,
    color: "grey",
  },

  airPortItemContainer: {
    borderWidth: 0.8,
    borderColor: "lightgrey",
    borderRadius: 100,
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 10,
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 6,
    marginRight: 7,
  },

  airPortName: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
    flex: 1,
  },

  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MySelectCurrentLocation;
