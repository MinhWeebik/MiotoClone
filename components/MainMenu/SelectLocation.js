import "react-native-gesture-handler";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import NoDriver from "./NoDriver";
import YesDriverInCity from "./yesDriverInCity";
import YesDriverOutCity from "./YesDriverOutCity";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
const windowWidth = Dimensions.get("window").width;
import { StartConext } from "./StartProvider";
import { EndContext } from "./EndProvider";
import { DriverTypeContext } from "./DriverTypeProvider";

const SelectLocation = ({ navigation }) => {
  let { hasDriver, setHasDriver } = useContext(DriverTypeContext);
  let { startDay, setStartDay } = useContext(StartConext);
  let { endDay, setEndDay } = useContext(EndContext);
  const Item = ({ item }) => {
    if (item === 1) {
      return <NoDriver navigation={navigation} start={startDay} end={endDay} />;
    } else {
      return YesDriver(navigation);
    }
  };
  const YesDriver = useCallback(
    (navigation) => {
      const [journyType, setJournyType] = useState(1);

      return (
        <View style={{ width: windowWidth - 30 }}>
          <View>
            <RadioButton.Group
              onValueChange={(newValue) => {
                setJournyType(newValue);

                if (newValue === 3) {
                  locationHeight.value = 303;
                } else if (newValue === 1 || newValue === 2) {
                  locationHeight.value = 410;
                }
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
                <Text style={styles.journyTypeText}>Liên tỉnh (1 chiều)</Text>
                <RadioButton
                  value={3}
                  color="rgba(95,207,133,255)"
                  uncheckedColor="grey"
                />
                <Text style={styles.journyTypeText}>Nội thành</Text>
              </View>
            </RadioButton.Group>
          </View>
          <View>
            {journyType === 1 ? (
              <YesDriverOutCity
                way="2"
                navigation={navigation}
                start={startDay}
                end={endDay}
              />
            ) : journyType === 2 ? (
              <YesDriverOutCity
                way="1"
                navigation={navigation}
                start={startDay}
                end={endDay}
              />
            ) : (
              <YesDriverInCity
                navigation={navigation}
                start={startDay}
                end={endDay}
              />
            )}
          </View>
        </View>
      );
    },
    [startDay, endDay]
  );

  const flatListref = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    flatListref.current?.scrollToIndex({ index, animted: true });
  }, [index]);
  const locationHeight = useSharedValue(220);
  const config = {
    duration: 100,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(locationHeight.value, config),
    };
  });

  const noDriverButtonStyle = () => {
    const styleContainer = [styles.selectDriverTypeButtonLeft];
    if (index === 0) {
      styleContainer.push(styles.focusButton);
    }
    return styleContainer;
  };

  const yesDriverButtonStyle = () => {
    const styleContainer = [styles.selectDriverTypeButtonRight];
    if (index === 1) {
      styleContainer.push(styles.focusButton);
    }
    return styleContainer;
  };

  const noDriverTextStyle = () => {
    const styleContainer = [styles.selectDriverText];
    if (index === 0) {
      styleContainer.push(styles.focusText);
    }
    return styleContainer;
  };

  const yesDriverTextStyle = () => {
    const styleContainer = [styles.selectDriverText];
    if (index === 1) {
      styleContainer.push(styles.focusText);
    }
    return styleContainer;
  };

  const DATA = [
    {
      id: 1,
      item: 1,
    },
    {
      id: 2,
      item: 2,
    },
  ];

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={noDriverButtonStyle()}
          onPress={() => {
            if (index === 0) {
              return;
            } else {
              setIndex(0);
              setHasDriver(false);
              locationHeight.value = 220;
            }
          }}
        >
          <Ionicons
            name="car-sport"
            size={19}
            color={index === 0 ? "white" : "black"}
          />
          <Text style={noDriverTextStyle()}>Xe tự lái</Text>
        </Pressable>
        <Pressable
          style={[yesDriverButtonStyle()]}
          onPress={() => {
            if (index === 1) {
              return;
            } else {
              setIndex(1);
              setHasDriver(true);
              locationHeight.value = 410;
            }
          }}
        >
          <MaterialCommunityIcons
            name="account-tie-hat"
            size={19}
            color={index === 1 ? "white" : "black"}
          />
          <Text style={yesDriverTextStyle()}>Xe có tài xế</Text>
        </Pressable>
      </View>
      <Animated.View style={style}>
        <FlatList
          ref={flatListref}
          initialScrollIndex={index}
          data={DATA}
          renderItem={({ item }) => <Item item={item.item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectDriverTypeButtonLeft: {
    flex: 1,
    paddingTop: 17,
    paddingBottom: 17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 14,
    flexDirection: "row",
    backgroundColor: "rgba(239,250,242,255)",
  },
  selectDriverTypeButtonRight: {
    flex: 1,
    paddingTop: 17,
    paddingBottom: 17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 14,
    flexDirection: "row",
    backgroundColor: "rgba(239,250,242,255)",
  },

  focusButton: {
    backgroundColor: "rgba(95,207,133,255)",
  },

  selectDriverText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },

  focusText: {
    color: "white",
  },
  journyTypeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 5,
  },

  journyTypeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "grey",
  },
});

export default SelectLocation;
