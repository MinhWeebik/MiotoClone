import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { FontAwesome5 } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SelectTimeBottomSheet from "./SelectTimeBottomSheet";
import { StartConext } from "./StartProvider";
import { EndContext } from "./EndProvider";
import { Snackbar } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MyDateOne = ({ navigation }) => {
  let { startDay, setStartDay } = useContext(StartConext);
  let { endDay, setEndDay } = useContext(EndContext);
  const cutDayAndTime = (day) => {
    let dayTimeArray = day.split(", ");
    return dayTimeArray;
  };
  const checkDayType = (day) => {
    const start = cutDayAndTime(startDay)[1];
    const end = cutDayAndTime(endDay)[1];
    if (start === end) {
      if (day === "third") {
        return cutDayAndTime(startDay)[1];
      } else return "";
    } else if (day === "start") {
      return start;
    } else if (day === "end") {
      return end;
    } else return "";
  };
  const [firstMark, setFirstMark] = useState(checkDayType("start"));
  const [secondMark, setSecondMark] = useState(checkDayType("end"));
  const [dateAmount, setDateAmount] = useState(0);
  const [markType, setMarkType] = useState(1);
  const [thirdMark, setThirdMark] = useState(checkDayType("third"));
  const [visible, setVisible] = useState(false);
  const [startTime, setStartTime] = useState(
    cutDayAndTime(startDay)[0].replace("h", ":")
  );
  const [endTime, setEndTime] = useState(
    cutDayAndTime(endDay)[0].replace("h", ":")
  );
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoint = ["35%"];
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  const setStart = (time) => {
    setStartTime(time);
  };
  const setEnd = (time) => {
    setEndTime(time);
  };

  const getDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
  };

  const convertToArray = (item) => {
    let detailDate;
    if (item !== undefined) {
      detailDate = item.split("-");
    }
    return detailDate;
  };

  const compareDate = () => {
    const firstDate = convertToArray(firstMark);
    const secondDate = convertToArray(secondMark);
    if (firstDate !== "" && secondDate != "") {
      if (firstDate[0] < secondDate[0]) {
        return true;
      } else if (
        firstDate[0] === secondDate[0] &&
        firstDate[1] < secondDate[1]
      ) {
        return true;
      } else if (
        firstDate[0] === secondDate[0] &&
        firstDate[1] === secondDate[1] &&
        firstDate[2] < secondDate[2]
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getAmountOfDate = () => {
    let count = 0;
    const start = new Date(firstMark);
    const end = new Date(secondMark);
    while (start <= end) {
      count++;
      start.setDate(start.getDate() + 1);
    }
    if (thirdMark !== "") {
      count = 1;
    }
    return count;
  };

  const renderDayAndMonth = (item) => {
    let month;
    let day;
    if (item !== undefined) {
      month = convertToArray(item)[1];
      day = convertToArray(item)[2];
      return `${day}/${month}`;
    } else {
      return undefined;
    }
  };

  const checkForStartAndEndDate = () => {
    const start = renderDayAndMonth(firstMark);
    const end = renderDayAndMonth(secondMark);
    const third = renderDayAndMonth(thirdMark);
    if (
      start === "undefined/undefined" &&
      end === "undefined/undefined" &&
      third === "undefined/undefined"
    ) {
      return true;
    } else return false;
  };

  const createReturnString = (type) => {
    let day;
    if (type === "start") {
      if (firstMark !== "") day = firstMark;
      else if (thirdMark !== "") day = thirdMark;
      return startTime.replace(":", "h") + ", " + day;
    } else {
      if (secondMark !== "") day = secondMark;
      else if (thirdMark !== "") day = thirdMark;
      return endTime.replace(":", "h") + ", " + day;
    }
  };

  const checkTimeBetween = () => {
    let start = startTime.split(":");
    let end = endTime.split(":");
    let time;
    if (start[0] > end[0]) {
      return null;
    } else {
      if (end[0] - start[0] === 0) {
        time = end[1] - start[1];
      } else {
        time = (end[0] - start[0]) * 60 + (end[1] - start[1]);
      }
      return time;
    }
  };

  useEffect(() => {
    if (compareDate() === false) {
      setSecondMark("");
      setFirstMark("");
    } else {
      setDateAmount(getAmountOfDate());
    }
  }, [secondMark]);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const CustomCalendar = useMemo(() => {
    return (
      <Calendar
        onDayPress={(day) => {
          if (markType === 1) {
            setFirstMark(day.dateString);
            setSecondMark("");
            setMarkType(2);
            setThirdMark("");
          } else if (markType === 2) {
            setSecondMark(day.dateString);
            setMarkType(1);
          }
        }}
        markingType={"custom"}
        markedDates={{
          [firstMark]: {
            customStyles: {
              container: {
                backgroundColor: "rgba(95,207,133,255)",
                borderRadius: 5,
                padding: 1,
              },
              text: {
                color: "white",
              },
            },
          },
          [secondMark]: {
            customStyles: {
              container: {
                backgroundColor: "rgba(52,118,80,255)",
                borderRadius: 5,
                padding: 1,
              },
              text: {
                color: "white",
              },
            },
          },
          [thirdMark]: {
            customStyles: {
              container: {
                backgroundColor: "rgba(95,207,133,255)",
                borderRadius: 100,
                padding: 1,
              },
              text: {
                color: "white",
              },
            },
          },
        }}
        minDate={getDate()}
        enableSwipeMonths={true}
        firstDay={1}
        onDayLongPress={(day) => {
          setThirdMark(day.dateString);
          setFirstMark("");
          setSecondMark("");
          setMarkType(1);
        }}
        theme={{
          arrowColor: "rgba(95,207,133,255)",
          monthTextColor: "rgba(95,207,133,255)",
          textMonthFontWeight: "bold",
          todayTextColor: "rgba(95,207,133,255)",
          textDayFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
          textMonthFontSize: 18,
        }}
      />
    );
  }, [firstMark, secondMark, thirdMark, markType]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="angle-left" size={18} color="black" />
        </Pressable>
        <Text style={styles.header}>Thời gian</Text>
      </View>

      {CustomCalendar}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Pressable
          style={styles.timeContainer}
          onPress={() => {
            handleSnapPress(0);
          }}
        >
          <Text style={styles.timeTitle}>Nhận xe</Text>
          <View style={styles.timeAndArrowContainer}>
            <Text style={styles.time}>{startTime}</Text>
            <FontAwesome5 name="angle-down" size={17} color="black" />
          </View>
        </Pressable>
        <Pressable
          style={[styles.timeContainer, { marginLeft: 20 }]}
          onPress={() => {
            handleSnapPress(0);
          }}
        >
          <Text style={styles.timeTitle}>Trả xe</Text>
          <View style={styles.timeAndArrowContainer}>
            <Text style={styles.time}>{endTime}</Text>
            <FontAwesome5 name="angle-down" size={17} color="black" />
          </View>
        </Pressable>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.specificDateText}>
            {checkForStartAndEndDate()
              ? "Chọn ngày bắt đầu và kết thúc"
              : thirdMark !== ""
              ? `${startTime}, ${renderDayAndMonth(
                  thirdMark
                )} - ${endTime}, ${renderDayAndMonth(thirdMark)}`
              : `${startTime}, ${renderDayAndMonth(firstMark)} - ${
                  renderDayAndMonth(secondMark) === "undefined/undefined"
                    ? "Chọn ngày kết thúc"
                    : `${endTime}, ${renderDayAndMonth(secondMark)}`
                }`}
          </Text>
          <View style={styles.dateInfoContainer}>
            <Text style={styles.dateInfoText}>
              Số ngày thuê: {dateAmount} ngày
            </Text>
            <AntDesign name="questioncircleo" size={17} color="grey" />
          </View>
        </View>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            if (
              checkTimeBetween() >= 60 ||
              (thirdMark === "" && firstMark !== "" && secondMark !== "")
            ) {
              setStartDay(createReturnString("start"));
              setEndDay(createReturnString("end"));
              navigation.goBack();
            } else onToggleSnackBar();
          }}
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </Pressable>
      </View>
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
        snapPoints={snapPoint}
        ref={sheetRef}
        onClose={() => {
          setIsOpen(false);
        }}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <SelectTimeBottomSheet
            close={() => handleCloseSheet()}
            setEndTime={(end) => setEnd(end)}
            setStartTime={(start) => setStart(start)}
            startTime={cutDayAndTime(startDay)[0].replace("h", ":")}
            endTime={cutDayAndTime(endDay)[0].replace("h", ":")}
          />
        </BottomSheetView>
      </BottomSheet>
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
        {firstMark === "" && thirdMark === ""
          ? "Chưa chọn ngày bắt đầu và kết thúc"
          : secondMark === "" && thirdMark === ""
          ? "Chưa chọn ngày kết thúc"
          : checkTimeBetween() === null
          ? "Thời gian trả xe phải lớn hơn thời gian nhận xe"
          : "Giờ nhận xe phải trước giờ trả xe ít nhất 1 tiếng khi thuê trong ngày"}
      </Snackbar>
    </GestureHandlerRootView>
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

  timeContainer: {
    borderWidth: 0.8,
    borderColor: "lightgrey",
    marginLeft: 15,
    width: windowWidth / 2 - 25,
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },

  timeTitle: {
    color: "grey",
    fontSize: 15,
  },

  time: {
    fontWeight: "500",
    fontSize: 16.5,
  },

  timeAndArrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    borderTopWidth: 0.8,
    borderTopColor: "lightgrey",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  infoContainer: {},

  nextButton: {
    backgroundColor: "rgba(95,207,133,255)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 13,
    paddingRight: 13,
    borderRadius: 6,
  },

  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },

  dateInfoContainer: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },

  specificDateText: {
    fontWeight: "500",
    fontSize: 14,
  },

  dateInfoText: {
    fontWeight: "500",
    fontSize: 13,
    marginRight: 7,
  },

  greyBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MyDateOne;
